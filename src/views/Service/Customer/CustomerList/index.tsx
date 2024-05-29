import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { GetCustomerBoardListResponseDto } from 'src/apis/CustomerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { CustomerBoardListItem} from 'src/types';



export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerBoardList, setCustomerBoardList] = useState<CustomerBoardListItem[]>([]);
	const [customerBoardViewList, setCustomerViewList] = useState<CustomerBoardListItem[]>([]);
	const [customerBoardTotalLength , setCustomerBoardTotalLength] = useState<number>(0);
	const [customerBoardTotalPage, setCustomerBoardTotalPage]= useState<number>(1);
	const [customerBoardCurrentPage ,setCustomerBoardCurrentPage] = useState<number>(1);
	const [customerBoardPageList, setCustomerBoardPageList] = useState<number[]>([1]);
	const [customerBoardCurrentSection , setCustomerBoardCurrentSection] = useState<number>(1);
	const [customerBoardIsToggleOn, setCustomerBoardToggleOn] = useState<boolean>(false);
	
	const [customerBoardSearchWord, setCustomerBoardSearchWord] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoardList(currentPage);
  }, [currentPage]);

  const fetchBoardList = async (page: number) => {
    try {
      const response = await fetch(`/api/customer-board?page=${page}&search=${searchTerm}`);
      const data = await response.json();
      setCustomerBoardList(data);
    } catch (error) {
      console.error('Failed to fetch board list:', error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchBoardList(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoToWrite = () => {
    navigate('/service/customer_board/write');
  };

  const handleGoToDetail = (boardNumber: number) => {
    navigate(`/service/customer_board/${boardNumber}`);
  };

  return (<div>
    {/* 검색 기능 */}
    <div className="search">
      <div className="search-box">
        <div className="search-keyword">검색 키워드</div>
        <input
          className="list-search-input"
          placeholder="검색어를 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-button" onClick={handleSearch}>
          검색
        </div>
      </div>
    </div>

    {/* 게시물 목록 */}
    <div className="customer-list-container">
      <div className="customer-list-header">
        <div className="customer-list-header-item">번호</div>
        <div className="customer-list-header-item">제목</div>
        <div className="customer-list-header-item">작성일</div>
        <div className="customer-list-header-item">조회</div>
      </div>
      {customerBoardList.map((board) => (
        <div
          key={board.customerBoardNumber}
          className="customer-list-item"
          onClick={() => handleGoToDetail(board.customerBoardNumber)}
        >
          <div className="customer-list-item-number">{board.customerBoardNumber}</div>
          <div className="customer-list-item-title">{board.customerBoardTitle}</div>
          <div className="customer-list-item-date">{board.customerBoardWriteDatetime}</div>
          <div className="customer-list-item-views">{board.customerBoardViewCount}</div>
        </div>
      ))}
    </div>

    {/* 페이지네이션 */}
    <div className="pagination-wrapper">
      {/* ... */}
    </div>

    {/* 글쓰기 버튼 */}
    <div className="write-button" onClick={handleGoToWrite}>
      글쓰기
    </div>
  </div>
  );
}