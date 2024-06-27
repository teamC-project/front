import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { AnnouncementBoardListItem } from 'src/types';
import ResponseDto from 'src/apis/response.dto';

import { useUserStore } from 'src/stores';

import{ 
	COUNT_PER_PAGE, 
	COUNT_PER_SECTION, 
	ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH, 
	ANNOUNCEMENT_BOARD_WRITE_ABSOLUTE_PATH,
	MAIN_PATH } 
from 'src/constant';
import { usePagination } from '../../../../hooks';

import { GetAnnouncementBoardListResponseDto,GetSearchAnnouncementBoardListResponseDto } from 'src/apis/announcement/dto/response'
import { getSearchAnnouncementBoardListRequest } from 'src/apis/announcement';

import './style.css';
import '../../../../App.css'

//							component							//
function ListItem ({
	announcementBoardNumber,
	announcementBoardTitle,
	announcementBoardWriterId,
	announcementBoardWriteDatetime,
	announcementBoardViewCount
}: AnnouncementBoardListItem) {

	//							function							//
	const navigator = useNavigate();

	//							event handler							//
	const onClickHandler = () => navigator(ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH(announcementBoardNumber));

  //              render              //
	return (
    <div className='announcement-board-list-table-tr' onClick={onClickHandler}>
		<div className='announcement-board-list-table-number'>{announcementBoardNumber}</div>
		<div className='announcement-board-list-table-title'>{announcementBoardTitle}</div>
		<div className='announcement-board-list-table-writer-id'>{announcementBoardWriterId}</div>
		<div className='announcement-board-list-table-write-date'>{announcementBoardWriteDatetime}</div>
		<div className='announcement-board-list-table-viewcount'>{announcementBoardViewCount}</div>
    </div>
	);
}

//							component							//
export default function AnnouncementBoardList() {

//							state							//
	const { loginUserRole } = useUserStore();
	const [cookies] = useCookies();
	const {
		viewList,
		pageList,
		currentPage,

		setCurrentPage,
		setCurrentSection,
		setBoardList,

		changeBoardList,
		changePage,

		onPageClickHandler,
		onPreSectionClickHandler,
		onNextSectionClickHandler
	}  = usePagination<AnnouncementBoardListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);
	const [searchWord, setSearchWord] = useState<string>('');

//							function							//
	const navigator = useNavigate();

	const getAnnouncementBoardResponse = (result: GetAnnouncementBoardListResponseDto | ResponseDto | null) => {
    const message =
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'AF' ? '인증에 실패했습니다.' :
		result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
		alert(message);
		if (result?.code === 'AF') navigator(MAIN_PATH);
		return;
    }

    const { announcementBoardList } = result as GetAnnouncementBoardListResponseDto;

    changeBoardList(announcementBoardList);
    setCurrentPage(!announcementBoardList.length ? 0 : 1);
    setCurrentSection(!announcementBoardList.length ? 0 : 1);
	};

	const getSearchAnnouncementBoardListResponse = (result: GetSearchAnnouncementBoardListResponseDto | ResponseDto | null) => {
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

    const { announcementBoardList } = result as GetSearchAnnouncementBoardListResponseDto;
    const updatedAnnouncementBoardList = announcementBoardList.map(item => ({...item, announcementBoardViewCount: item.announcementBoardViewCount || 0,}));

    setBoardList(updatedAnnouncementBoardList);
    changeBoardList(updatedAnnouncementBoardList);
    changePage(updatedAnnouncementBoardList, updatedAnnouncementBoardList.length);
    setCurrentPage(!updatedAnnouncementBoardList.length ? 0 : 1);
    setCurrentSection(!updatedAnnouncementBoardList.length ? 0 : 1);
	};

	const fetchAnnouncementBoardList = () => {
		getSearchAnnouncementBoardListRequest('', cookies.accessToken).then(getAnnouncementBoardResponse);
	};

	//							event handler							//
	const onWriteButtonClickHandler = () => {
		if (loginUserRole !== 'ROLE_ADMIN') return;
		navigator(ANNOUNCEMENT_BOARD_WRITE_ABSOLUTE_PATH);
	};

	const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
    if (!searchWord) fetchAnnouncementBoardList(); 
	};

	const onSearchButtonClickHandler = () => {
    if (!searchWord) {	
		fetchAnnouncementBoardList();
		return; 
    }
    if (!cookies.accessToken) return;
    getSearchAnnouncementBoardListRequest(searchWord, cookies.accessToken).then(getSearchAnnouncementBoardListResponse);
	};

	const onSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSearchButtonClickHandler();
	};

//							effect							//
	useEffect(() => {
		if (!cookies.accessToken) return;
		fetchAnnouncementBoardList();
	}, [cookies.accessToken]);

  //                    render                    //
	return (
    <div className='announcement-board-list-wrapper'>
			<div className='announcement-board-list-search-box'>
			<div className='announcement-board-list-search-keyword'>검색 키워드</div>
			<div className='announcement-board-list-search-input-box'>
			<input
				className='announcement-board-list-search-input'
				placeholder='검색어를 입력하세요.'
				value={searchWord}
				onChange={onSearchWordChangeHandler}
				onKeyDown={onSearchInputKeyDown}
			/>
			</div>
			<div className='announcement-board-list-search-input-button' onClick={onSearchButtonClickHandler}>
			검색
			</div>
		</div>
		<div className='announcement-board-list-table'>
			<div className='announcement-board-table-th'>
				<div className='announcement-board-list-table-number'>게시물 번호</div>
				<div className='announcement-board-list-table-title'>제목</div>
				<div className='announcement-board-list-table-writer-id'>작성자</div>
				<div className='announcement-board-list-table-write-date'>작성일</div>
				<div className='announcement-board-list-table-viewcount'>조회수</div>
			</div>
			{viewList.map(item => <ListItem key={item.announcementBoardNumber} {...item} />)}
		</div>
		<div className='announcement-board-list-bottom'>
			<div style={{ width: '299px' }}></div>
				<div className='announcement-board-list-pagenation'>
				<div className='page-left' onClick={onPreSectionClickHandler}></div>
					<div className='announcement-board-list-page-box'>
					{pageList.map(page => 
					page === currentPage ? 
					<div key={page} className='announcement-board-list-page-active'>{page}</div> :
					<div key={page} className='announcement-board-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
					)}
				</div>
				<div className='page-right' onClick={onNextSectionClickHandler}></div>
				</div>
			{loginUserRole === 'ROLE_ADMIN' && (
			<div className='announcement-board-list-write-button' onClick={onWriteButtonClickHandler}>
				글쓰기
			</div>
			)}
		</div>
		</div>
	);
}
