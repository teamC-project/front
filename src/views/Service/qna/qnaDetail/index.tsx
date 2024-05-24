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
      <div className="qna-board-detail-comment">
        <div className="qna-board-detail-comment-title">댓글</div>
        <div className="qna-board-detail-comment-list">
          <div className="qna-board-detail-comment-item">
            <div className="qna-board-detail-comment-meta">
              <div className="qna-board-detail-comment-author">작성자</div>
              <div className="qna-board-detail-comment-content">댓글 내용</div>
              <div className="qna-board-detail-comment-date-text">작성일</div>
            </div>
            <div className="qna-board-detail-comment-details">
              <div className="qna-board-detail-comment-content-text">댓글 내용 상세</div>
              <div className="qna-board-detail-comment-date-text">날짜</div>
              <div className="qna-board-detail-comment-delete">삭제</div>
              <div className="qna-board-detail-comment-put">수정</div>
              <div className="qna-board-detail-comment-recomment-write">대댓글 작성</div>
            </div>
          </div>
          <div className="qna-board-detail-comment-item">
            <div className="qna-board-detail-comment-meta">
              <div className="qna-board-detail-comment-author">작성자</div>
              <div className="qna-board-detail-comment-content">댓글 내용</div>
              <div className="qna-board-detail-comment-date">작성일</div>
            </div>
            <div className="qna-board-detail-comment-details">
              <div className="qna-board-detail-comment-author-name">닉네임</div>
              <div className="qna-board-detail-comment-content-text">댓글 내용 상세</div>
              <div className="qna-board-detail-comment-date-text">날짜</div>
              <div className="qna-board-detail-comment-recomment-write">대댓글 작성</div>
            </div>
          </div>
        </div>
        <div className="qna-board-detail-comment-write">댓글 작성</div>
      </div>
      <div className="qna-board-detail-go-to-qna-boardList" onClick={handleGoToList} >
        목록으로
      </div>
    </div>
  );
}
