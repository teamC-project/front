import React from 'react'
import "./style.css";

export default function MyPage() {
  return (
    <div id='mypage-wrapper'>
      <div className='mypage-image'></div>
      <div id='full'>
        <div className='top'>
          <div className='top-group'>
            <div className='top-logo'></div>
            <div className='top-bar-title'>내 정보</div>
            <div className='top-bar-service'>
              <div className='logout-button'>로그아웃</div>
            </div>
          </div>
        </div>
        <div className='under'>
          <div className='left-bar'>
            <div className='left-bar-container'>
              <button className='left-bar-title' >공지사항</button>
              <button className='left-bar-title'>트렌드 게시판</button>
              <button className='left-bar-title'>고객 게시판</button>
              <button className='left-bar-title'>디자이너 게시판</button>
              <button className='left-bar-title'>Q&A  게시판</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
