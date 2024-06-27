import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { TrendBoardListItem } from 'src/types';

import { 
	TREND_BOARD_COUNT_PER_PAGE, 
	TREND_BOARD_COUNT_PER_SECTION, 
	MAIN_PATH, 
	TREND_BOARD_DETAIL_ABSOLUTE_PATH, 
	TREND_BOARD_WRITE_ABSOLUTE_PATH } 
from 'src/constant';

import { useUserStore } from 'src/stores';

import { GetSearchTrendBoardListResponseDto, GetTrendBoardListResponseDto } from 'src/apis/TrendBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';

import { getSearchTrendBoardListRequest, getTrendBoardListRequest } from 'src/apis/TrendBoard';
import { usePagination } from '../../../../hooks'

import './style.css';
import '../../../../App.css';

//							component							//
function CardItem (
	{
	trendBoardNumber,
	trendBoardTitle,
	trendBoardWriterId,
	trendBoardWriteDatetime,
	trendBoardLikeCount,
	trendBoardViewCount,
	trendBoardThumbnailImage
} : TrendBoardListItem) {

//							function							//
const navigator =  useNavigate();

//							event handler							//
const onClickHandler =  () => navigator(TREND_BOARD_DETAIL_ABSOLUTE_PATH(trendBoardNumber));

//							render							//
return (
	<div className='trend-board-card' onClick={onClickHandler}>
					<div className='trend-board-image' style={{backgroundImage : `url(${trendBoardThumbnailImage})` }}>
					</div>
					<div className='trend-board-title-box'>
					<div className='trend-board-title'>{trendBoardTitle}</div>
					</div>
					<div className='trend-board-card-bottom-bar'>
					<div className='trend-board-card-writerid'>{trendBoardWriterId}</div>
						<div className ='trend-board-card-datetime'>{trendBoardWriteDatetime}</div>
						<div className='trend-board-card-like-count'>{trendBoardLikeCount}</div>
						<div className='trend-board-card-view-count'>{trendBoardViewCount}</div>
					</div>
				</div>
)}

//							component							//
export default function TrendList() {

//							state							//
	const { loginUserRole } = useUserStore();
	const [cookies] = useCookies();  
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
	}  = usePagination<TrendBoardListItem>(TREND_BOARD_COUNT_PER_PAGE , TREND_BOARD_COUNT_PER_SECTION)
	const [searchWord, setSearchWord] = useState<string>('');

//							function							//
	const navigator = useNavigate();

	const getTrendBoardResponse = (result: GetTrendBoardListResponseDto | ResponseDto | null) => {
    const message = 
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'AF' ? '인증에 실패했습니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
		alert(message);
		if (result?.code === 'AF') navigator(MAIN_PATH);
		return;
    }

    const { trendBoardList } = result as GetTrendBoardListResponseDto;
    changeBoardList(trendBoardList);
    setCurrentPage(!trendBoardList.length ? 0 : 1);
    setCurrentSection(!trendBoardList.length ? 0 : 1);
	}

	const getSearchTrendBoardListResponse = (result: GetSearchTrendBoardListResponseDto | ResponseDto | null) => {
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

    const { trendBoardList } = result as GetSearchTrendBoardListResponseDto;
    const updatedTrendBoardList = trendBoardList.map(item => ({
		...item,
		trendBoardLikeCount: item.trendBoardLikeCount || 0,
		isLiked: false  
    }));
    changeBoardList(updatedTrendBoardList);
    setBoardList(updatedTrendBoardList);
    changePage(updatedTrendBoardList, updatedTrendBoardList.length);
    setCurrentPage(!trendBoardList.length ? 0 : 1);
    setCurrentSection(!trendBoardList.length ? 0 : 1);
	}

	const fetchTrendBoardList = () => {
    getSearchTrendBoardListRequest('', cookies.accessToken)
		.then(result => getTrendBoardResponse(result as GetTrendBoardListResponseDto | ResponseDto | null));
	}

//							event handler							//
	const onWriteButtonClickHandler = () => {
		if (loginUserRole !== 'ROLE_ADMIN') return;
		navigator(TREND_BOARD_WRITE_ABSOLUTE_PATH);
	};

	const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const searchWord = event.target.value;
    setSearchWord(searchWord);
    if (!searchWord) {
		getTrendBoardListRequest(cookies.accessToken).then(getTrendBoardResponse);
		}
	}

	const onSearchButtonClickHandler = () => {
    if (!searchWord) {
		getTrendBoardListRequest(cookies.accessToken).then(getTrendBoardResponse);
		return;
    }
    if (!cookies.accessToken) return;
    getSearchTrendBoardListRequest(searchWord, cookies.accessToken)
		.then(getSearchTrendBoardListResponse);
	}

	const onSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSearchButtonClickHandler();
	}

	useEffect(() => {
    if (!cookies.accessToken) return;
    fetchTrendBoardList();
	}, [cookies.accessToken]);

	useEffect(() => {
    if (!cookies.accessToken) return;
    getTrendBoardListRequest(cookies.accessToken).then(getTrendBoardResponse);
	}, []);

//							render							//
	return (
    <div id='trend-board-wrapper'>
		<div className='trend-board-list-search-box'>
			<div className='trend-board-list-search-keyword'>검색 키워드</div>
			<div className='trend-board-list-search-input-box'>
				<input
				className='trend-board-list-search-input'
				placeholder='검색어를 입력하세요.'
				value={searchWord}
				onChange={onSearchWordChangeHandler}
				onKeyDown={onSearchInputKeyDown}
				/>
        </div>
			<div className='trend-board-list-search-input-button' onClick={onSearchButtonClickHandler}>
				검색
			</div>
		</div>
		<div className="trend-board-list-container">
			<div className='trend-board-list'>
				{viewList.map(item => <CardItem key={item.trendBoardNumber} {...item} />)}
			</div>
		</div>
		<div className='trend-board-list-bottom'>
			<div style={{ width: '299px' }}></div>
        <div className='trend-board-list-pagenation'>
			<div className='page-left' onClick={onPreSectionClickHandler}></div>
			<div className='trend-board-list-page-box'>
            {pageList.map(page => 
			page === currentPage ? 
			<div key={page} className='trend-board-list-page-active'>{page}</div> :
            <div key={page} className='trend-board-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
        </div>
        <div className='page-right' onClick={onNextSectionClickHandler}></div>
        </div>
        {loginUserRole === 'ROLE_ADMIN' && (
        <div className='trend-board-list-write-button' onClick={onWriteButtonClickHandler}>
            글쓰기
        </div>
        )}
    </div>
    </div>
	);
}
