import React, { useState } from 'react'
import './style.css'
import '../../../../App.css'
export default function QnaList() {
	const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('검색어:', searchTerm);
  };
	return (
	<div id='qna_board_list_wrapper'>
			<div className='qna_board_search_box'>
				<div className='qna_board_top_search_keword'></div>
				<input 
				className='search_input'
				placeholder="검색어를 입력해주세요."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div className='search_button' onClick={handleSearch}>검색</div>
			</div>
			<div className='qna_board_list_container'>
				<div className='qna_board_list_information'>
					<div className= "qna_board_list_information1 ">번호</div>
					<div className= "qna_board_list_information2">제목</div>
					<div className= "qna_board_list_information3">작성일</div>
					<div className= "qna_board_list_information4">조회</div>
				</div>
			</div>
			<div className='qna_board_list_main_view'>
				<div className='qna_board_list_title1'>게시물 제목 1</div>
				<div className='qna_board_list_title2'>게시물 제목 2</div>
				<div className='qna_board_list_title3'>게시물 제목 3</div>
				<div className='qna_board_list_title4'>게시물 제목 4</div>
				<div className='qna_board_list_title5'>게시물 제목 5</div>
				<div className='qna_board_list_title6'>게시물 제목 6</div>
				<div className='qna_board_list_title7'>게시물 제목 7</div>
				<div className='qna_board_list_title8'>게시물 제목 8</div>
				<div className='qna_board_list_title9'>게시물 제목 9</div>
				<div className='qna_board_list_title10'>게시물 제목 10</div>
			</div>
			<div className="pagination">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">&gt;</a>
        <a href="#">&gt;&gt;</a>
      </div>
	</div>
	)
}
