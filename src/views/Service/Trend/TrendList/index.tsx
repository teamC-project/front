import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import '../../../../App.css';
import { TrendBoardListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { TREND_BOARD_COUNT_PER_PAGE, TREND_BOARD_COUNT_PER_SECTION, MAIN_PATH, TREND_BOARD_DETAIL_ABSOLUTE_PATH, TREND_BOARD_WRITE_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetSearchTrendBoardListResponseDto, GetTrendBoardListResponseDto } from 'src/apis/TrendBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getSearchTrendBoardListRequest, getTrendBoardListRequest } from 'src/apis/TrendBoard';


function CardItem ({
	trendBoardNumber,
	trendBoardTitle,
	trendBoardWriterId,
	trendBoardWriteDatetime,
	trendBoardLikeCount,
	trendBoardViewCount,
	trendBoardThumbnailImage
} : TrendBoardListItem) {
// 										function 										//
const navigator =  useNavigate();

// 										event handler										// 

const onClickHandler =  () => navigator(TREND_BOARD_DETAIL_ABSOLUTE_PATH(trendBoardNumber));

//										render										/./
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
)
}

export default function TrendList() {
  const { loginUserRole } = useUserStore();
  const [cookies] = useCookies();  
  const [trendBoardList, setTrendBoardList] = useState<TrendBoardListItem[]>([]);
  const [viewList, setViewList] = useState<TrendBoardListItem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isToggleOn, setToggleOn] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  const navigator = useNavigate();

  const changePage = (trendBoardList: TrendBoardListItem[], totalLength: number) => {
    const startIndex = (currentPage - 1) * TREND_BOARD_COUNT_PER_PAGE;
    let endIndex = currentPage * TREND_BOARD_COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = trendBoardList.slice(startIndex, endIndex);
    setViewList(viewList);
  }

  const changeSection = (totalPage: number) => {
    if (!currentSection) return;
    const startPage = (currentSection * TREND_BOARD_COUNT_PER_SECTION) - (TREND_BOARD_COUNT_PER_SECTION - 1);
    let endPage = currentSection * TREND_BOARD_COUNT_PER_SECTION;
    if (endPage > totalPage) endPage = totalPage;
    const pageList: number[] = [];
    for (let page = startPage; page <= endPage; page++) pageList.push(page);
    setPageList(pageList);
  }

  const changeTrendBoardList = (trendBoardList: TrendBoardListItem[]) => {
    setTrendBoardList(trendBoardList);
    const totalLength = trendBoardList.length;
    setTotalLength(totalLength);
    const totalPage = Math.floor((totalLength - 1) / TREND_BOARD_COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);
    const totalSection = Math.floor((totalPage - 1) / TREND_BOARD_COUNT_PER_SECTION + 1);
    setTotalSection(totalSection);
    changePage(trendBoardList, totalLength);
    changeSection(totalPage);
  };

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
    changeTrendBoardList(trendBoardList);
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
      isLiked: false  // 새로 추가된 필드
    }));
    changeTrendBoardList(updatedTrendBoardList);
    setTrendBoardList(updatedTrendBoardList);
    changePage(updatedTrendBoardList, updatedTrendBoardList.length);
    setCurrentPage(!trendBoardList.length ? 0 : 1);
    setCurrentSection(!trendBoardList.length ? 0 : 1);
    setIsSearched(false);
  }

  const fetchTrendBoardList = () => {
    getSearchTrendBoardListRequest('', cookies.accessToken)
      .then(result => getTrendBoardResponse(result as GetTrendBoardListResponseDto | ResponseDto | null));
  }

  const onWriteButtonClickHandler = () => {
    if (loginUserRole !== 'ROLE_ADMIN') return;
    navigator(TREND_BOARD_WRITE_ABSOLUTE_PATH);
  };

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
    changePage(trendBoardList, totalLength);
  }

  const onPreSectionClickHandler = () => {
    if (currentSection <= 1) return;
    setCurrentSection(currentSection - 1);
    setCurrentPage((currentSection - 1) * TREND_BOARD_COUNT_PER_SECTION);
  }

  const onNextSectionClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentSection(currentSection + 1);
    setCurrentPage(currentSection * TREND_BOARD_COUNT_PER_SECTION + 1);
  }

  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
    if (!searchWord) {
      setIsSearched(false);
      getTrendBoardListRequest(cookies.accessToken).then(getTrendBoardResponse);
    }
  }

  const onSearchButtonClickHandler = () => {
    if (!searchWord) {
      setIsSearched(false);
      getTrendBoardListRequest(cookies.accessToken).then(getTrendBoardResponse);
      return;
    }
    if (!cookies.accessToken) return;
    setIsSearched(true);
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
    if (!trendBoardList.length) return;
    changePage(trendBoardList, totalLength);
  }, [currentPage]);

  useEffect(() => {
    if (!trendBoardList.length) return;
    changeSection(totalPage);
  }, [currentSection]);

  useEffect(() => {
    if (!cookies.accessToken) return;
    getTrendBoardListRequest(cookies.accessToken).then(getTrendBoardResponse);
  }, []);

  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

  return (
    <div id='trend-board-wrapper'>
      <div className="trend-board-list-top-bar">
        <div className='trend-board-search-box'>
          <div className='trend-board-search-keyword'>검색 키워드</div>
          <input 
            className='trend-board-search-input' 
            placeholder='제목을 입력하세요.'
            value={searchWord} 
            onChange={onSearchWordChangeHandler}
            onKeyDown={onSearchInputKeyDown}
          />
          <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
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
          <div className='trend-board-list-page-left' onClick={onPreSectionClickHandler}></div>
          <div className='trend-board-list-page-box'>
            {pageList.map(page => 
              page === currentPage ? 
              <div key={page} className='trend-board-list-page-active'>{page}</div> :
              <div key={page} className='trend-board-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
          </div>
          <div className='trend-board-list-page-right' onClick={onNextSectionClickHandler}></div>
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
