import React from 'react'
import "./style.css";

export default function Footer() {
  return (
    <div className='footer-size-check'>
      <div className='footer-top-bar'>
        <div className=''>사이트소개</div>
        <div className=''>|</div>
        <div className=''>이용약관</div>
        <div className=''>|</div>
        <div className=''>개인정보처리방침</div>
        <div className=''>|</div>
        <div className=''>청소년보호정책</div>
        <div className=''>|</div>
        <div className=''>광고/제휴</div>
        <div className=''>|</div>
        <div className=''>메일문의</div>
      </div>
      <div className='footer-under-bar'>
        <div className=''>헤어어드바이저 2024~ <span className=''>&copy;</span> All Rights Reserved.</div>
        <div className='footer-total-user-box'>
          <div className=''>오늘 접속자</div>
          <div>|</div>
          <div className=''>총 접속자</div>
        </div>
      </div>
    </div>
  )
}
