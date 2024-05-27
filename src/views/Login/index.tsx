import React from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';

export default function Login() {
  return (
    <div id='login-wrapper'>
      <div className='auth-top-bar'>
        <div className='auth-logo-image'></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-sign-up'>회원가입</div>
        </div>
      </div>

      <div className='sign-in-main-box'>
        <div className='image-box'></div>

        <div className='login-box'>
          <div className='login-container'>
            <div className='login-page h1'>로그인 페이지</div>
            <div className='sign-in-contents'>
            <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>아이디</div>
            <div className='auth-sign-up-next-box'><InputBox  label={''} type={'text'} value={''} placeholder={'아이디를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

                

                <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호</div>
            <div className='auth-sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>
          <div className='error-text'>로그인 정보가 일치하지 않습니다</div>

              <div className='auth-submit-box'>
            <div className='auth-submit-box primary-button'>로그인</div>
          </div>

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
      <div className='under-right-bar'></div>
      </div>
    </div>
  )
}
