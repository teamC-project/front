import React from 'react'
import "./style.css";

export default function Login() {
  return (
    <div className="idCheck-wrapper">
      <div className='image-box'></div>
      <div className='top-bar-container'> 
        <div className='top-bar-right'>
          <div className='second-box'>회원가입</div>
        </div>
      </div>
      <div>
        로그인 페이지
        <div>
          <div>아이디</div>
          <div>비밀번호</div>
          <div>로그인</div>
          
        </div>
      </div>
    </div>
  )
}
