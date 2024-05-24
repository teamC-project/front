import React from 'react'
import "./style.css";

export default function Login() {
  return (
    <div id='wrapper'>
      <div className='image-box'></div>
      <div className='login-box'>
        <div className='top-bar-container'>
          <div className='title-image'></div>
            <div className='top-bar-right'>
            <div className='signup-button'>회원가입</div>
          </div>
        </div>
        <div className='login-container'>
        <div className='login-page h1'>로그인 페이지</div>
        <div className='sign-in-container'>
          <div className='user-id'>
            <div>아이디</div>
            <div className='input-box'></div>
          </div>
            <div>로그인 정보가 일치하지 않습니다</div>

          <div className='user-password'>
            <div>비밀번호</div>
            <div className='input-box'></div>
          </div>
            <div>로그인 정보가 일치하지 않습니다</div>

          <div className='login-button'>로그인</div>

        <div className='socal-login'>
          <div className='kakao-login'></div>
          <div className='naver-login'></div>
        </div>

        <div className="short-divider"></div>

        <div className='user-found'>
          <div className='id-found'>아이디 찾기</div>
          <div className='password-found'>비밀번호 찾기</div>
        </div>
        </div>
        </div>
      </div>

    </div>
  )
}
