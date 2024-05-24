import React from 'react'
import "./style.css";

export default function Login() {
  return (
    <div id='login-wrapper'>
      <div className='image-box'></div>

      <div className='login-right-side'>
        <div className='top-bar'>
          <div className='logo-image'></div>
          <div className='top-right-bar'>
            <div className='top-right-bar-sign-up'>회원가입</div>
          </div>
        </div>

        <div className='login-box'>
          <div className='login-container'>
            <div className='login-page h1'>로그인 페이지</div>
            <div className='sign-in-contents'>
              <div className='user-id'>
                <div className='input-label'>아이디</div>
                <div className='input-box'></div>
              </div>
                <div className='error-text'>로그인 정보가 일치하지 않습니다</div>

              <div className='user-password'>
                <div className='input-label'>비밀번호</div>
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
    </div>
  )
}
