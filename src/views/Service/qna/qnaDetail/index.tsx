import React from 'react'
import './style.css';
import'../../../../App.css'
import { useNavigate } from 'react-router';
import {  QNA_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

export default function QnaDetail() {
	const navigate = useNavigate();

	const handleGoToList = () => {
    navigate(`${QNA_BOARD_LIST_ABSOLUTE_PATH}`);
  };
	return (
    <div id="qna-board-detail-wrapper">
      <div className="qna-board-detail-title">제목</div>
      <div className="qna-board-detail-container">
        <div className="qna-board-detail-information">
          <div className="qna-board-detai-information1">작성자</div>
          <div className="qna-board-detail-information2">작성일</div>
          <div className="qna-board-detail-information3">조회</div>
          <div className="qna-board-detail-information4">삭제</div>
          <div className="qna-board-detail-information5">수정</div>
        </div>
      </div>
      <div className="qna-board-detail-view">
        내용 상세
      </div>
			<div id = 'qna-board-comment-wrapper'>
			        <div className="qna-board-comment-write-box">
          <div className="qna-board-comment-textarea-box">
            <textarea
              className="qna-board-comment-textarea"
              placeholder="답글을 작성해주세요."
            />
          </div>
					<div className='qna-board-comment-button-box'>
          <div className="qna-board-comment-button" >
					답글 달기
          </div>
				<div className="qna-board-comment-button" >
          목록보기
        </div>
				</div>
				</div>
		</div>
      <div className="qna-board-detail-go-to-qna-boardList" onClick={handleGoToList} >
        목록으로
      </div>
    </div>
  );
}
