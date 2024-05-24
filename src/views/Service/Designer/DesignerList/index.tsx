import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css'


export default function DesignerList() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('검색어:', searchTerm);
  };

  return (
    <div>
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
      <div className="container">
        <div className="designer-list-information">
          <div className="designer-list-information1">번호</div>
          <div className="designer-list-information2">제목</div>
          <div className="designer-list-information3">작성일</div>
          <div className="designer-list-information4">조회</div>
        </div>
      </div> 
      <div className="designer-list-main-view">
        <div className="designer-list-title1">게시물 제목 1</div>
        <div className="designer-list-title2">게시물 제목 2</div>
        <div className="designer-list-title3">게시물 제목 3</div>
        <div className="designer-list-title4">게시물 제목 4</div>
        <div className="designer-list-title5">게시물 제목 5</div>
        <div className="designer-list-title6">게시물 제목 6</div>
        <div className="designer-list-title7">게시물 제목 7</div>
        <div className="designer-list-title8">게시물 제목 8</div>
        <div className="designer-list-title9">게시물 제목 9</div>
        <div className="designer-list-title10">게시물 제목 10</div>
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
  );
}
