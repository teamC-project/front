import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css'

export default function CustomerDetail() {
  return (
    <div>
      <div className="customer-detail-title">제목</div>
      <div className="customer-detail-container">
        <div className="customer-detail-information">
          <div className="customer-detail-information1">작성자</div>
          <div className="customer-detail-information2">작성일</div>
          <div className="customer-detail-information3">조회</div>
          <div className="customer-detail-information4">삭제</div>
          <div className="customer-detail-information5">수정</div>
        </div>
      </div>
      <div className="customer-detail-view">내용</div>
      <div className="customer-detail-comment">
        <div className="customer-detail-comment1"></div>
        <div className="customer-detail-comment2"></div>
      </div>
    </div>
  )
}
