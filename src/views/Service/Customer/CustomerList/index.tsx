import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router';
import { CustomerBoardListItem } from 'src/types';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH, CUSTOMER_BOARD_WRITE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetCustomerBoardListResponseDto, GetSearchCustomerBoardListResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getSearchCustomerBoardListRequest } from 'src/apis/customerBoard';

//                    component                    //
function ListItem ({
  customerBoardNumber,
  customerBoardStatus,
  customerBoardTitle,
  customerBoardWriterId,
  customerBoardWriteDatetime,
  customerBoardViewCount
}: CustomerBoardListItem) {

  //              function              //
  const navigator = useNavigate();

  //              event handler              //
  const onClickHandler = () => navigator(CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH(customerBoardNumber));

  //              render              //
  return (
    <div className='customerboard-list-table-tr' onClick={onClickHandler}>
      <div className='customerboard-list-table-number'>{customerBoardNumber}</div>
      <div className='customerboard-list-table-title' style={{ textAlign:'left' }}>{customerBoardTitle}</div>
      <div className='customerboard-list-table-writer-id'>{customerBoardWriterId}</div>
      <div className='customerboard-list-table-write-date'>{customerBoardWriteDatetime}</div>
      <div className='customerboard-list-table-viewcount'>{customerBoardViewCount}</div>
    </div>
  );
}

//                    component                    //
export default function CustomerList() {

  //                    state                    //
  const {loginUserRole} = useUserStore();
  const [cookies] = useCookies();
  const [customerBoardList, setCustomerBoardList] = useState<CustomerBoardListItem[]>([]);
  const [viewList, setViewList] = useState<CustomerBoardListItem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isToggleOn, setToggleOn] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);

  //                    function                    //
  const navigator = useNavigate();

  const changePage = (customerBoardList: CustomerBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage -1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = customerBoardList.slice(startIndex, endIndex);
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

  const changeCustomerBoardList = (customerBoardList: CustomerBoardListItem[]) => {
    const totalLength = customerBoardList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(customerBoardList, totalLength);

    changeSection(totalPage);
  };

  const getCustomerBoardResponse = (result: GetCustomerBoardListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
        alert(message);
        if (result?.code === 'AF') navigator(MAIN_PATH);
        return;
      }

      const { customerBoardList } = result as GetCustomerBoardListResponseDto;
      changeCustomerBoardList(customerBoardList);

      setCurrentPage(!customerBoardList.length ? 0 : 1);
      setCurrentSection(!customerBoardList.length ? 0 : 1);
  };

  const getSearchCustomerBoardListResponse = (result: GetSearchCustomerBoardListResponseDto | ResponseDto | null) => {
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
  
    const { customerBoardList } = result as GetSearchCustomerBoardListResponseDto;
    const updatedCustomerBoardList = customerBoardList.map(item => ({
      ...item,
      customerBoardViewCount: item.customerBoardViewCount || 0, // 조회수가 없으면 0으로 설정
    }));
    setCustomerBoardList(updatedCustomerBoardList);
    changeCustomerBoardList(updatedCustomerBoardList);
    changePage(updatedCustomerBoardList, updatedCustomerBoardList.length);
    setCurrentPage(!updatedCustomerBoardList.length ? 0 : 1);
    setCurrentSection(!updatedCustomerBoardList.length ? 0 : 1);
    setIsSearched(false); // 검색 완료 후 isSearched 상태 초기화
  };
  //                    event handler                    //
  const onWriteButtonClickHandler = () => {
    navigator(CUSTOMER_BOARD_WRITE_ABSOLUTE_PATH);
  };

  const  onPageClickHandler = (page: number) => {
    setCurrentPage(page);
    changePage(customerBoardList, totalLength);
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

  const onSearchButtonClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    handleSearch();
  };
  
  const onSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleSearch = () => {
    if (!searchWord) {
      alert('검색어를 입력하세요.');
      return;
    }
  
    if (!cookies.accessToken) return;
  
    setIsSearched(true);
    getSearchCustomerBoardListRequest(searchWord, cookies.accessToken)
      .then(getSearchCustomerBoardListResponse);
  };
  useEffect(() => {
  if (!isSearched || !cookies.accessToken) return;

  getSearchCustomerBoardListRequest(searchWord, cookies.accessToken)
    .then(getSearchCustomerBoardListResponse);
}, [isSearched, searchWord, cookies.accessToken]);

  //                    effect                    //
  useEffect(() => {
    if (!cookies.accessToken) return;
    getSearchCustomerBoardListRequest('', cookies.accessToken)
      .then(getSearchCustomerBoardListResponse);
  }, [cookies.accessToken]);
  
  useEffect(() => {
    if (!customerBoardList.length) return;
    changePage(customerBoardList, totalLength);
  }, [currentPage]);

  useEffect(() => {
    if (!customerBoardList.length) return;
    changeSection(totalPage);
  }, [currentSection]);

  //                    render                    //
  
  return (
    <div className='customerboard-list-wrapper'>
      <div className='customerboard-list-search-box'>
        <div className='customerboard-list-search-keyword'>검색 키워드</div>
        <div className='customerboard-list-search-input-box'>
          <input
            className='customerboard-list-search-input'
            placeholder='검색어를 입력하세요.'
            value={searchWord}
            onChange={onSearchWordChangeHandler}
            onKeyDown={onSearchInputKeyDown}
          />
        </div>
        <div className='customerboard-list-search-input-button' onClick={onSearchButtonClickHandler}>
          검색
        </div>
      </div>
      <div className='customerboard-list-table'>
        <div className='customerboard-table-th'>
          <div className='customerboard-list-table-reception-number'>접수번호</div>
          <div className='customerboard-list-table-title'>제목</div>
          <div className='customerboard-list-table-writer-id'>작성자</div>
          <div className='customerboard-list-table-write-date'>작성일</div>
          <div className='customerboard-list-table-viewcount'>조회수</div>
        </div>
        {viewList.map(item => <ListItem {...item} />)}
      </div>
      <div className='customerboard-list-bottom'>
        <div style={{ width: '299px' }}></div>
        <div className='customerboard-list-pagenation'>
          <div className='customerboard-list-page-left' onClick={onPreSectionClickHandler}></div>
          <div className='customerboard-list-page-box'>
            {pageList.map(page => 
              page === currentPage ? 
              <div className='customerboard-list-page-active'>{page}</div> :
              <div className='customerboard-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
          </div>
          <div className='customerboard-list-page-right' onClick={onNextSectionClickHandler}></div>
        </div>
        {loginUserRole === 'ROLE_CUSTOMER' && (
          <div className='customerboard-list-write-button' onClick={onWriteButtonClickHandler}>
            글쓰기
          </div>
        )}
      </div>
    </div>
  );

}