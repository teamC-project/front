import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { QnaBoardListItem } from 'src/types';
import { 
	COUNT_PER_PAGE,
	COUNT_PER_SECTION,
	MAIN_PATH,
	QNA_BOARD_DETAIL_ABSOLUTE_PATH, 
	QNA_BOARD_WRITE_ABSOLUTE_PATH } 
from 'src/constant';
import { useUserStore } from 'src/stores';
import { GetQnaBoardListResponseDto, GetSearchQnaBoardListResponseDto } from 'src/apis/QnaBoard/dto/response';

import ResponseDto from 'src/apis/response.dto';
import { getSearchQnaBoardListRequest } from 'src/apis/QnaBoard';
import { usePagination } from '../../../../hooks'

import './style.css';
import '../../../../App.css'

//							component							//
function ListItem({
	qnaBoardNumber,
	qnaBoardTitle,
	qnaBoardStatus,
	qnaBoardWriterId,
	qnaBoardWriteDatetime,
	qnaBoardViewCount
}: QnaBoardListItem) {
//							function							//
	const navigator = useNavigate();
	const onClickHandler = () => navigator(QNA_BOARD_DETAIL_ABSOLUTE_PATH(qnaBoardNumber));

//							render							//
	return (
    <div className='qna-board-list-table-tr' onClick={onClickHandler}>
		<div className='qna-board-list-table-number'>{qnaBoardNumber}</div>
			<div className='qna-board-list-table-status'>
			{qnaBoardStatus ? (
			<div className="disable-bedge">완료</div>
        ) : (
			<div className="primary-bedge">접수</div>
        )}
			</div>
			<div className='qna-board-list-table-title'>{qnaBoardTitle}</div>
		<div className='qna-board-list-table-writer-id'>{qnaBoardWriterId}</div>
		<div className='qna-board-list-table-write-date'>{qnaBoardWriteDatetime}</div>
		<div className='qna-board-list-table-viewcount'>{qnaBoardViewCount}</div>
    </div>
	);
}

//							component							//
export default function QnaBoardList() {
	const { loginUserRole } = useUserStore();
	const [cookies] = useCookies();

//							state							//
	const {
		viewList,
		pageList,
		currentPage,

		setBoardList,
		setCurrentPage,
		setCurrentSection,

		changeBoardList,
		changePage,
		
		onPageClickHandler,
		onPreSectionClickHandler,
		onNextSectionClickHandler
	}  = usePagination<QnaBoardListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION)

	const [searchWord, setSearchWord] = useState<string>('');
	const [isToggleOn, setToggleOn] = useState<boolean>(false);

//							function							//
	const navigator = useNavigate();
	const getQnaBoardListResponse = (result: GetQnaBoardListResponseDto | ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'AF' ? '인증에 실패했습니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
	
		if (!result || result.code !== 'SU') {
			alert(message);
			if (result?.code === 'AF') navigator(MAIN_PATH);
			return;
		}
	
		const { qnaBoardList } = result as GetQnaBoardListResponseDto;
		changeBoardList(qnaBoardList);
	
		setCurrentPage(!qnaBoardList.length ? 0 : 1);
		setCurrentSection(!qnaBoardList.length ? 0 : 1);
	};
	
	const getSearchQnaBoardListResponse = (result: GetSearchQnaBoardListResponseDto | ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'VF' ? '검색어를 입력하세요.' :
			result.code === 'AF' ? '인증에 실패했습니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
	
		if (!result || result.code !== 'SU') {
			alert(message);
			if (result?.code === 'AF') navigator(MAIN_PATH);
			return;
		}
	
		const { qnaBoardList } = result as GetSearchQnaBoardListResponseDto;
	
		let updatedQnaBoardList = qnaBoardList.map(item => ({
			...item,
			qnaBoardViewCount: item.qnaBoardViewCount || 0,
		}));

		if (isToggleOn) updatedQnaBoardList = updatedQnaBoardList.filter(item => !item.qnaBoardStatus);

		setBoardList(updatedQnaBoardList);
		changeBoardList(updatedQnaBoardList);
		changePage(updatedQnaBoardList, updatedQnaBoardList.length);
		setCurrentPage(!updatedQnaBoardList.length ? 0 : 1);
		setCurrentSection(!updatedQnaBoardList.length ? 0 : 1);
	};
	
	const fetchQnaBoardList = () => {
		getSearchQnaBoardListRequest('', cookies.accessToken)
			.then(result => getQnaBoardListResponse(result as GetQnaBoardListResponseDto | ResponseDto | null));
	};

//							event handler							//
	const onWriteButtonClickHandler = () => {
		if (loginUserRole === 'ROLE_ADMIN') return;
		navigator(QNA_BOARD_WRITE_ABSOLUTE_PATH);
	}	

	const onToggleClickHandler = () => {
		if(loginUserRole !== 'ROLE_ADMIN') return;
		setToggleOn(!isToggleOn);
	}

	const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const searchWord = event.target.value;
		setSearchWord(searchWord);
		if (!searchWord) {
			fetchQnaBoardList();
		}
	};

	const onSearchButtonClickHandler = () => {
		if (!searchWord) {
			fetchQnaBoardList();
			return;  
		}
		if (!cookies.accessToken) return;
		getSearchQnaBoardListRequest(searchWord, cookies.accessToken)
			.then(result => getSearchQnaBoardListResponse(result as GetSearchQnaBoardListResponseDto | ResponseDto | null));
	};

	const onSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSearchButtonClickHandler();
	};

//							effect							//
	useEffect(() => {
		if (!cookies.accessToken) return;
		fetchQnaBoardList();
	}, [cookies.accessToken]);

	useEffect(() => {
		if (!cookies.accessToken) return;
		getSearchQnaBoardListRequest(searchWord, cookies.accessToken).then(getSearchQnaBoardListResponse);
	}, [isToggleOn]);

	//                    render                    //
	const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';

	return (
    <div className='qna-board-list-wrapper'>
		<div className='qna-board-list-search-box'>
        <div className='qna-board-list-search-keyword'>검색 키워드</div>
        <div className='qna-board-list-search-input-box'>
			<input
            className='qna-board-list-search-input'
            placeholder='검색어를 입력하세요.'
            value={searchWord}
            onChange={onSearchWordChangeHandler}
            onKeyDown={onSearchInputKeyDown}
			/>
        </div>
        <div className='qna-board-list-search-input-button' onClick={onSearchButtonClickHandler}>
			검색
        </div>
		</div>
		<div className='qna-board-list-table'>
        <div className='qna-board-table-th'>
			<div className='qna-board-list-table-number'>접수번호</div>
					<div className='qna-board-list-table-status'>접수 상태</div>
			<div className='qna-board-list-table-title'>제목</div>
			<div className='qna-board-list-table-writer-id'>작성자</div>
			<div className='qna-board-list-table-write-date'>작성일</div>
			<div className='qna-board-list-table-viewcount'>조회수</div>
        </div>
        {viewList.map(item => <ListItem key={item.qnaBoardNumber} {...item} />)}
		</div>
		<div className='qna-board-list-bottom'>
        <div style={{ width: '299px' }}></div>
        <div className='qna-board-list-pagenation'>
			<div className='page-left' onClick={onPreSectionClickHandler}></div>
			<div className='qna-board-list-page-box'>
            {pageList.map(page => 
				page === currentPage ? 
				<div key={page} className='qna-board-list-page-active'>{page}</div> :
				<div key={page} className='qna-board-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
			</div>
			<div className='page-right' onClick={onNextSectionClickHandler}></div>
        </div>
				<div>
				<div className='qna-board-list-bottom-right'>
                    {loginUserRole !== 'ROLE_ADMIN' ? 
                    <div className='qna-board-list-write-button' onClick={onWriteButtonClickHandler}>글쓰기</div> : ''
                    }
					{loginUserRole ==='ROLE_ADMIN' ?
					<>
					<div className={toggleClass} 
					onClick={onToggleClickHandler}>
					</div>
					<div className='qna-board-list-admin-text'>미완료 보기</div>
					</> : ''
				}
                </div>
                </div>
		</div>
    </div>
	);
}


