import React  from 'react';
import './style.css';
import ToastEditor from 'src/components/ToastEditor';

export default function TrendWrite() {

  return (
    <div id='trend-board-write-wrapper'>
      <div className='trend-board-write-top-bar'>
        <input className='trend-board-write-title' placeholder='제목을 입력해주세요' />
        <div className='search-button'>썸네일 이미지 선택</div>
      </div>
      <div className='trend-board-textarea-container'>
			<ToastEditor body={''} setBody={function (body: string): void { } } imageHandler={function (blob: File, callback: FunctionConstructor): void {
				} } />
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