import React from 'react';
import './style.css';
import { useNavigate } from 'react-router';

export default function DesignerDetail() {
    const navigate = useNavigate();

    const handleGoToList = () => {
    navigate('/service/designer_board');
    };

    const handleEdit = () => {
    navigate('/service/designer_board/update/1');
    };

    return (
    <div className="designer-detail">
        <div className="designer-detail-title">제목</div>
        <div className="designer-detail-container">
        <div className="designer-detail-information">
            <div className="designer-detail-information1">작성자</div>
            <div className="designer-detail-information2">작성일</div>
            <div className="designer-detail-information3">조회</div>
            <div className="designer-detail-information4">삭제</div>
            <div className="designer-detail-information5" onClick={handleEdit}>수정</div>
        </div>
        </div>
        <div className="designer-detail-view">
        내용 상세
        </div>
        <div className="designer-detail-comment">
        <div className="designer-detail-comment-title">댓글</div>
        <div className="designer-detail-comment-list">
            <div className="designer-detail-comment-item">
            <div className="designer-detail-comment-meta">
                <div className="designer-detail-comment-author">작성자</div>
                <div className="designer-detail-comment-content">댓글 내용</div>
                <div className="designer-detail-comment-date">작성일</div>
            </div>
            <div className="designer-detail-comment-details">
                <div className="designer-detail-comment-author-name">닉네임</div>
                <div className="designer-detail-comment-content-text">댓글 내용 상세</div>
                <div className="designer-detail-comment-date-text">날짜</div>
                <div className="designer-detail-comment-delete">삭제</div>
                <div className="designer-detail-comment-put">수정</div>
                <div className="designer-detail-comment-recomment-write">대댓글 작성</div>
            </div>
            </div>
            <div className="designer-detail-comment-item">
            <div className="designer-detail-comment-meta">
                <div className="designer-detail-comment-author">작성자</div>
                <div className="designer-detail-comment-content">댓글 내용</div>
                <div className="designer-detail-comment-date">작성일</div>
            </div>
            <div className="designer-detail-comment-details">
                <div className="designer-detail-comment-author-name">닉네임</div>
                <div className="designer-detail-comment-content-text">댓글 내용 상세</div>
                <div className="designer-detail-comment-date-text">날짜</div>
                <div className="designer-detail-comment-recomment-write">대댓글 작성</div>
            </div>
            </div>
        </div>
        <div className="designer-detail-comment-write">댓글 작성</div>
        </div>
        <div className="designer-detail-go-to-designerList" onClick={handleGoToList}>
        목록으로
        </div>
    </div>
    );
}
