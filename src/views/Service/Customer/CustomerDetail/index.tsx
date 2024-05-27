import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function CustomerDetail() {
  const navigate = useNavigate();

  const handleGoToList = () => {
    navigate('/service/customer_board');
  };

  const handleEdit = () => {
    navigate('/service/customer_board/update/1');
  };

  return (
    <div className="customer-detail">
      <div className="customer-detail-title">제목</div>
      <div className="customer-detail-container">
        <div className="customer-detail-information">
          <div className="customer-detail-information1">작성자</div>
          <div className="customer-detail-information2">작성일</div>
          <div className="customer-detail-information3">조회</div>
          <div className="customer-detail-information4">삭제</div>
          <div className="customer-detail-information5" onClick={handleEdit}>수정</div>
        </div>
      </div>
      <div className="customer-detail-view">
        내용 상세
      </div>
      <div className="customer-detail-comment">
        <div className="customer-detail-comment-title">댓글</div>
        <div className="customer-detail-comment-list">
          <div className="customer-detail-comment-item">
            <div className="customer-detail-comment-meta">
              <div className="customer-detail-comment-author">작성자</div>
              <div className="customer-detail-comment-content">댓글 내용</div>
              <div className="customer-detail-comment-date">작성일</div>
            </div>
            <div className="customer-detail-comment-details">
              <div className="customer-detail-comment-author-name">닉네임</div>
              <div className="customer-detail-comment-content-text">댓글 내용 상세</div>
              <div className="customer-detail-comment-date-text">날짜</div>
              <div className="customer-detail-comment-delete">삭제</div>
              <div className="customer-detail-comment-put">수정</div>
              <div className="customer-detail-comment-recomment-write">대댓글 작성</div>
            </div>
          </div>
          <div className="customer-detail-comment-item">
            <div className="customer-detail-comment-meta">
              <div className="customer-detail-comment-author">작성자</div>
              <div className="customer-detail-comment-content">댓글 내용</div>
              <div className="customer-detail-comment-date">작성일</div>
            </div>
            <div className="customer-detail-comment-details">
              <div className="customer-detail-comment-author-name">닉네임</div>
              <div className="customer-detail-comment-content-text">댓글 내용 상세</div>
              <div className="customer-detail-comment-date-text">날짜</div>
              <div className="customer-detail-comment-recomment-write">대댓글 작성</div>
            </div>
          </div>
        </div>
        <div className="customer-detail-comment-write">댓글 작성</div>
      </div>
      <div className="customer-detail-go-to-CustomerList" onClick={handleGoToList}>
        목록으로
      </div>
    </div>
  );
}