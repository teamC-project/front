import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { QnaBoardListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, QNA_BOARD_DETAIL_ABSOLUTE_PATH, QNA_BOARD_WRITE_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetQnaBoardListResponseDto, GetSearchQnaBoardListResponseDto } from 'src/apis/QnaBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getSearchQnaBoardListRequest } from 'src/apis/QnaBoard';


//                    component                    //
function ListItem ({
  qnaBoardNumber,
  qnaBoardTitle,
	qnaBoardStatus,
  qnaBoardWriterId,
  qnaBoardWriteDatetime,
  qnaBoardViewCount
}: QnaBoardListItem) {

  //              function              //
  const navigator = useNavigate();

  //              event handler              //
  const onClickHandler = () => navigator(QNA_BOARD_DETAIL_ABSOLUTE_PATH(qnaBoardNumber));

  //              render              //
  return (
    <div className='qnaboard-list-table-tr' onClick={onClickHandler}>
      <div className='qnaboard-list-table-number'>{qnaBoardNumber}</div>
			<div className='qnaboard-list-table-status'>{qnaBoardStatus}</div>
      <div className='qnaboard-list-table-title'>{qnaBoardTitle}</div>
      <div className='qnaboard-list-table-writer-id'>{qnaBoardWriterId}</div>
      <div className='qnaboard-list-table-write-date'>{qnaBoardWriteDatetime}</div>
      <div className='qnaboard-list-table-viewcount'>{qnaBoardViewCount}</div>
    </div>
  );
}

//                    component                    //
export default function QnaBoardList() {

  //                    state                    //
  const { loginUserRole } = useUserStore();
  const [cookies] = useCookies();
  const [qnaBoardList, setQnaBoardList] = useState<QnaBoardListItem[]>([]);
  const [viewList, setViewList] = useState<QnaBoardListItem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);

  //                    function                    //
  const navigator = useNavigate();

  const changePage = (qnaBoardList: QnaBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = qnaBoardList.slice(startIndex, endIndex);
    setViewList(viewList);
  };

  const changeSection = (totalPage: number) => {
    if (!currentSection) return;
    const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
    let endPage = currentSection * COUNT_PER_SECTION;
    if (endPage > totalPage) endPage = totalPage;
    const pageList: number[] = [];
    for (let page = startPage; page <= endPage; page++) pageList.push(page);
    setPageList(pageList);
  };

  const changeQnaBoardList = (qnaBoardList: QnaBoardListItem[]) => {
    const totalLength = qnaBoardList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(qnaBoardList, totalLength);

    changeSection(totalPage);
  };

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
    changeQnaBoardList(qnaBoardList);

    setCurrentPage(!qnaBoardList.length ? 0 : 1);
    setCurrentSection(!qnaBoardList.length ? 0 : 1);
  };

  const getSearchQnaBoardListResponse = (result: GetSearchQnaBoardListResponseDto | ResponseDto | null) =>  {
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
		const updatedQnaBoardList = qnaBoardList.map(item => ({
      ...item,
      qnaBoardViewCount: item.qnaBoardViewCount || 0,
    }));
    setQnaBoardList(updatedQnaBoardList);
    changeQnaBoardList(updatedQnaBoardList);
    changePage(updatedQnaBoardList, updatedQnaBoardList.length);
    setCurrentPage(!updatedQnaBoardList.length ? 0 : 1);
    setCurrentSection(!updatedQnaBoardList.length ? 0 : 1);
    setIsSearched(false);
  };

  const fetchQnaBoardList = () => {
    getSearchQnaBoardListRequest('', cookies.accessToken).then(getQnaBoardListResponse);
  };

  //                    event handler                    //
  const onWriteButtonClickHandler = () => {
    if (loginUserRole !== 'ROLE_ADMIN') return;
    navigator(QNA_BOARD_WRITE_ABSOLUTE_PATH);
  };

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
    changePage(qnaBoardList, totalLength);
  };

  const onPreSectionClickHandler = () => {
    if (currentSection <= 1) return;
    setCurrentSection(currentSection - 1);
    setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
  };

  const onNextSectionClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentSection(currentSection + 1);
    setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
  };

  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
    if (!searchWord) {
      setIsSearched(false);
      fetchQnaBoardList(); 
    }
  };

  const onSearchButtonClickHandler = () => {
    if (!searchWord) {
      setIsSearched(false); 
      fetchQnaBoardList();
      return;  
    }
    if (!cookies.accessToken) return;
    setIsSearched(true);
    getSearchQnaBoardListRequest(searchWord, cookies.accessToken).then(getSearchQnaBoardListResponse);
  };

  const onSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSearchButtonClickHandler();
  };

  //                    effect                    //
  useEffect(() => {
    if (!cookies.accessToken) return;
    fetchQnaBoardList();
  }, [cookies.accessToken]);

  useEffect(() => {
    if (!qnaBoardList.length) return;
    changePage(qnaBoardList, totalLength);
  }, [currentPage]);

  useEffect(() => {
    if (!qnaBoardList.length) return;
    changeSection(totalPage);
  }, [currentSection]);

  //                    render                    //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return (
    <div className='qnaboard-list-wrapper'>
      <div className='qnaboard-list-search-box'>
        <div className='qnaboard-list-search-keyword'>검색 키워드</div>
        <div className='qnaboard-list-search-input-box'>
          <input
            className='qnaboard-list-search-input'
            placeholder='검색어를 입력하세요.'
            value={searchWord}
            onChange={onSearchWordChangeHandler}
            onKeyDown={onSearchInputKeyDown}
          />
        </div>
        <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>
          검색
        </div>
      </div>
      <div className='qnaboard-list-table'>
        <div className='qnaboard-table-th'>
          <div className='qnaboard-list-table-reception-number'>접수번호</div>
          <div className='qnaboard-list-table-title'>제목</div>
          <div className='qnaboard-list-table-writer-id'>작성자</div>
          <div className='qnaboard-list-table-write-date'>작성일</div>
          <div className='qnaboard-list-table-viewcount'>조회수</div>
        </div>
        {viewList.map(item => <ListItem key={item.qnaBoardNumber} {...item} />)}
      </div>
      <div className='qnaboard-list-bottom'>
        <div style={{ width: '299px' }}></div>
        <div className='qnaboard-list-pagenation'>
          <div className='qnaboard-list-page-left' onClick={onPreSectionClickHandler}></div>
          <div className='qnaboard-list-page-box'>
            {pageList.map(page => 
              page === currentPage ? 
              <div key={page} className='qnaboard-list-page-active'>{page}</div> :
              <div key={page} className='qnaboard-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
          </div>
          <div className='qnaboard-list-page-right' onClick={onNextSectionClickHandler}></div>
        </div>
        {loginUserRole !== 'ROLE_USER' && (
          <div className='qnaboard-list-write-button' onClick={onWriteButtonClickHandler}>
            글쓰기
          </div>
        )}
      </div>
    </div>
  );
}
