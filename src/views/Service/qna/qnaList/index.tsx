import React, { useState } from 'react'
import './style.css'
import '../../../../App.css'
export default function QnaList() {
	const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('검색어:', searchTerm);
  };
	return (
	<div id='qna-board-list-wrapper'>
			<div className='qna-board-search-box'>
				<div className='qna-board-top-search-keword'></div>
				<input 
				className='search-input'
				placeholder="검색어를 입력해주세요."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div className='search-button' onClick={handleSearch}>검색</div>
			</div>
			<div className='qna-board-list-container'>
				<div className='qna-board-list-information'>
					<div className= "qna-board-list-information1 ">번호</div>
					<div className= "qna-board-list-information2">제목</div>
					<div className= "qna-board-list-information3">작성일</div>
					<div className= "qna-board-list-information4">조회</div>
				</div>
			</div>
			<div className='qna-board-list-main-view'>
				<div className='qna-board-list-title1'>게시물 제목 1</div>
				<div className='qna-board-list-title2'>게시물 제목 2</div>
				<div className='qna-board-list-title3'>게시물 제목 3</div>
				<div className='qna-board-list-title4'>게시물 제목 4</div>
				<div className='qna-board-list-title5'>게시물 제목 5</div>
				<div className='qna-board-list-title6'>게시물 제목 6</div>
				<div className='qna-board-list-title7'>게시물 제목 7</div>
				<div className='qna-board-list-title8'>게시물 제목 8</div>
				<div className='qna-board-list-title9'>게시물 제목 9</div>
				<div className='qna-board-list-title10'>게시물 제목 10</div>
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
