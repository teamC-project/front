import React from 'react'
import "./style.css";

export default function NotFound() {
  return (
    <div id='not-found-wrapper'>
      <div className='not-found-head-text'>존재하지 않는 페이지 입니다.</div>
      <div className=''>
        <div className='not-found-small-text'>입력하신 페이지 주소를 확인해보시기 바랍니다.</div>
        <div className='not-found-small-text'>궁금하신 사항은 <span className='not-found-bold'>고객센터</span>로 문의해 주시기 바랍니다.</div>
      </div>
      <div className='before-page-box'>
        <div className='before-page'>헤어어드바이저 메인으로 가기</div>
      </div>
    </div>
  )
}