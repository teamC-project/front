import React, { useRef } from 'react';
import ToolBar from '../../../../components/ToolBar'; 
import './style.css';
import '../../../../App.css';


export default function TrendWrite() {
	const textAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div id='trend-board-write-wrapper'>
      <div className='trend-board-write-top-bar'>
        <input className='trend-board-write-title' placeholder='제목을 입력해주세요' />
        <div className='search-button'>썸네일 이미지 선택</div>
      </div>
      <div className='trend-board-textarea-container'>
        <ToolBar />
				<div
				ref={textAreaRef}
				contentEditable
				className='trend-board-textarea'></div>
      </div>
      <div className='trend-board-write-footer'>
        <div className='trend-board-button-container'>
          <div className='search-button'>올리기</div>
          <div className='search-button'>취소</div>
        </div>
      </div>
    </div>
  );
}