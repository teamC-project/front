import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { AnnouncementBoardListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH, ANNOUNCEMENT_BOARD_WRITE_ABSOLUTE_PATH, COUNT_PER_PAGE,COUNT_PER_SECTION, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { GetAnnouncementBoardListResponseDto, GetSearchAnnouncementBoardListResponseDto } from 'src/apis/announcement/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getSearchAnnouncementBoardListRequest } from 'src/apis/announcement';


function ListItem ({
  announcementBoardNumber,
	announcementBoardTitle ,
	announcementBoardWriterId, 
	announcementBoardWriteDatetime, 
	announcementBoardViewCount 
  }: AnnouncementBoardListItem) {

      //              function              //
  const navigator = useNavigate();

  //              event handler              //
  const onClickHandler = () => navigator(ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH(announcementBoardNumber));

  //              render              //
  return (
    <div className='announcementboard-list-table-tr' onClick={onClickHandler}>
      <div className='announcementboard-list-table-number'>{announcementBoardNumber}</div>
      <div className='announcementboard-list-table-title' style={{ textAlign:'left' }}>{announcementBoardTitle}</div>
      <div className='announcementboard-list-table-writer-id'>{announcementBoardWriterId}</div>
      <div className='announcementboard-list-table-write-date'>{announcementBoardWriteDatetime}</div>
      <div className='announcementboard-list-table-viewcount'>{announcementBoardViewCount}</div>
    </div>
  );
  
}

export default function AnnouncementBoardList() {

  //                    state                    //
  const {loginUserRole} = useUserStore();
  const [cookies] = useCookies();
  const [announcementBoardList, setAnnouncementBoardList] = useState<AnnouncementBoardListItem[]>([]);
  const [viewList, setViewList] = useState<AnnouncementBoardListItem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isToggleOn, setToggleOn] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();

  const changePage = (announcementBoardList: AnnouncementBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage -1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = announcementBoardList.slice(startIndex, endIndex);
    setViewList(viewList);
  };

  const changeSection = (totalPage: number) => {
    if (!currentSection) return;
    const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION -1);
    let endPage = currentSection * COUNT_PER_SECTION;
    if (endPage > totalPage) endPage = totalPage;
    const pageList: number[] = [];
    for (let page = startPage; page <= endPage; page++) pageList.push(page);
    setPageList(pageList);
  };

  const changeAnnouncementBoardList = (announcementBoardList: AnnouncementBoardListItem[]) => {
    const totalLength = announcementBoardList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(announcementBoardList, totalLength);

    changeSection(totalPage);
  };

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
      changeAnnouncementBoardList(announcementBoardList);

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
    changeAnnouncementBoardList(announcementBoardList);

    setCurrentPage(!announcementBoardList.length ? 0 : 1);
    setCurrentSection(!announcementBoardList.length ? 0 : 1);
  };

  //                    event handler                    //
  const onWriteButtonClickHandler = () => {
    if (loginUserRole !== 'ROLE_USER') return;
    navigator(ANNOUNCEMENT_BOARD_WRITE_ABSOLUTE_PATH);
  };

  const  onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  const onPreSectionClickHandler = () => {
    if (currentSection <= 1) return;
    setCurrentSection(currentSection -1);
    setCurrentPage((currentSection -1) * COUNT_PER_SECTION);
  };

  const onNextSectionClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentSection(currentSection + 1);
    setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
  };

  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
  };

  const onSearchButtonClickHandler = () => {
    if (!searchWord) return;
    if (!cookies.accessToken) return;

    getSearchAnnouncementBoardListRequest(searchWord, cookies.accessToken).then(getSearchAnnouncementBoardListResponse);
  };

  //                    effect                    //
  useEffect(() => {
    if (!announcementBoardList.length) return;
    changePage(announcementBoardList, totalLength);
  }, [currentPage]);

  useEffect(() => {
    if (!announcementBoardList.length) return;
    changeSection(totalPage);
  }, [currentSection]);

  // useEffect(() => {
  //   if (!cookies.accessToken) return;
  //   getSearchAnnouncementBoardListRequest(searchWord, cookies.accessToken).then(getSearchAnnouncementBoardListResponse);
  // },[])

  //                    render                    //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return (
    <div className='announcementboard-list-wrapper'>
      <div className='announcementboard-list-search-box'>
        <div className='announcementboard-list-search-input-box'>
          <input className='announcementboard-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
        </div>
        <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
      </div>
      <div className='announcementboard-list-table'>
        <div className='announcementboard-table-th'>
          <div className='announcementboard-list-table-reception-number'>접수번호</div>
          <div className='announcementboard-list-table-title'>제목</div>
          <div className='announcementboard-list-table-writer-id'>작성자</div>
          <div className='announcementboard-list-table-write-date'>작성일</div>
          <div className='announcementboard-list-table-viewcount'>조회수</div>
        </div>
        {viewList.map(item => <ListItem {...item} />)}
      </div>
      <div className='announcementboard-list-bottom'>
        <div style={{ width: '299px' }}></div>
        <div className='announcementboard-list-pagenation'>
          <div className='announcementboard-list-page-left' onClick={onPreSectionClickHandler}></div>
          <div className='announcementboard-list-page-box'>
            {pageList.map(page => 
              page === currentPage ? 
              <div className='announcementboard-list-page-active'>{page}</div> :
              <div className='announcementboard-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
}