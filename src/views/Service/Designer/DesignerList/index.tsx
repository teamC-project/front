import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router';
import { DesignerBoardListItem } from 'src/types';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH, DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetDesignerBoardListResponseDto, GetSearchDesignerBoardListResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getSearchDesignerBoardListRequest } from 'src/apis/designerBoard';

//                    component                    //
function ListItem ({
  designerBoardNumber,
  designerBoardTitle,
  designerBoardWriterId,
  designerBoardWriteDatetime,
  designerBoardViewCount
}: DesignerBoardListItem) {

  //              function              //
  const navigator = useNavigate();

  //              event handler              //
  const onClickHandler = () => navigator(DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH(designerBoardNumber));

  //              render              //
  return (
    <div className='designerboard-list-table-tr' onClick={onClickHandler}>
      <div className='designerboard-list-table-number'>{designerBoardNumber}</div>
      <div className='designerboard-list-table-title' style={{ textAlign:'left' }}>{designerBoardTitle}</div>
      <div className='designerboard-list-table-writer-id'>{designerBoardWriterId}</div>
      <div className='designerboard-list-table-write-date'>{designerBoardWriteDatetime}</div>
      <div className='designerboard-list-table-viewcount'>{designerBoardViewCount}</div>
    </div>
  );
}

//                    component                    //
export default function DesignerList() {

  //                    state                    //
  const {loginUserRole} = useUserStore();
  const [cookies] = useCookies();
  const [designerBoardList, setDesignerBoardList] = useState<DesignerBoardListItem[]>([]);
  const [viewList, setViewList] = useState<DesignerBoardListItem[]>([]);
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

  const changePage = (designerBoardList: DesignerBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage -1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = designerBoardList.slice(startIndex, endIndex);
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

  const changeDesignerBoardList = (designerBoardList: DesignerBoardListItem[]) => {
    const totalLength = designerBoardList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(designerBoardList, totalLength);

    changeSection(totalPage);
  };

  const getDesignerBoardResponse = (result: GetDesignerBoardListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
        alert(message);
        if (result?.code === 'AF') navigator(MAIN_PATH);
        return;
      }

      const { designerBoardList } = result as GetDesignerBoardListResponseDto;
      changeDesignerBoardList(designerBoardList);

      setCurrentPage(!designerBoardList.length ? 0 : 1);
      setCurrentSection(!designerBoardList.length ? 0 : 1);
  };

  const getSearchDesignerBoardListResponse = (result: GetSearchDesignerBoardListResponseDto | ResponseDto | null) => {

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

    const { designerBoardList } = result as GetSearchDesignerBoardListResponseDto;
    changeDesignerBoardList(designerBoardList);

    setCurrentPage(!designerBoardList.length ? 0 : 1);
    setCurrentSection(!designerBoardList.length ? 0 : 1);
  };

  //                    event handler                    //
  const onWriteButtonClickHandler = () => {
    if (loginUserRole !== 'ROLE_USER') return;
    navigator(DESIGNER_BOARD_WRITE_ABSOLUTE_PATH);
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

    getSearchDesignerBoardListRequest(searchWord, cookies.accessToken).then(getSearchDesignerBoardListResponse);
  };

  //                    effect                    //
  useEffect(() => {
    if (!designerBoardList.length) return;
    changePage(designerBoardList, totalLength);
  }, [currentPage]);

  useEffect(() => {
    if (!designerBoardList.length) return;
    changeSection(totalPage);
  }, [currentSection]);

  useEffect(() => {
    if (!cookies.accessToken) return;
    getSearchDesignerBoardListRequest(searchWord, cookies.accessToken).then(getSearchDesignerBoardListResponse);
  })

  //                    render                    //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return (
    <div className='designerboard-list-wrapper'>
      <div className='designerboard-list-search-box'>
        <div className='designerboard-list-search-input-box'>
          <input className='designerboard-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
        </div>
        <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
      </div>
      <div className='designerboard-list-table'>
        <div className='designerboard-table-th'>
          <div className='designerboard-list-table-reception-number'>접수번호</div>
          <div className='designerboard-list-table-title'>제목</div>
          <div className='designerboard-list-table-writer-id'>작성자</div>
          <div className='designerboard-list-table-write-date'>작성일</div>
          <div className='designerboard-list-table-viewcount'>조회수</div>
        </div>
        {viewList.map(item => <ListItem {...item} />)}
      </div>
      <div className='designerboard-list-bottom'>
        <div style={{ width: '299px' }}></div>
        <div className='designerboard-list-pagenation'>
          <div className='designerboard-list-page-left' onClick={onPreSectionClickHandler}></div>
          <div className='designerboard-list-page-box'>
            {pageList.map(page => 
              page === currentPage ? 
              <div className='designerboard-list-page-active'>{page}</div> :
              <div className='designerboard-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
            </div>
        </div>
      </div>
    </div>
  );

}
