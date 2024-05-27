import React from 'react'
import "./style.css"; 
import InputBox from 'src/components/Inputbox';

export function SettingPassword() {
  return (
    <div id='auth-wrapper'>

    <div className='auth-top-bar'>
      <div className='auth-logo-image'></div>
      
      <div className='auth-top-right-bar'>
        <div className='auth-top-right-bar-login'>로그인</div>
        <div className='auth-top-right-bar-line'>|</div>
        <div className='auth-top-right-bar-sign-up'>회원가입</div>
      </div>
    </div>

    <div className='auth-under-bar'>
      <div className='auth-left-null'></div>

      <div  className='auth-center-value'>
      <div className='auth-sign-up-box'>
        <div className='auth-sign-up-title'>비밀번호 재설정</div>

        <div className='auth-sign-up-box-text'>
          <div className='auth-sign-up-text'>비밀번호</div>
          <div className='auth-sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            } } /></div>
        </div>

        <div className='auth-sign-up-box-text'>
          <div className='auth-sign-up-text'>비밀번호 확인</div>
          <div className='auth-sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            } } /></div>
        </div>

        <div className='auth-submit-box'>
          <div className='auth-submit-box primary-button'>비밀번호 변경</div>
        </div>
      </div>
      </div>

      <div className='auth-right-null'></div>
    </div>

  </div>
  )
}

export function PasswordFoundPage() {
  return (
    

  <div id='auth-wrapper'>

<div className='auth-top-bar'>
  <div className='auth-logo-image'></div>
  
  <div className='auth-top-right-bar'>
    <div className='auth-top-right-bar-login'>로그인</div>
    <div className='auth-top-right-bar-line'>|</div>
    <div className='auth-top-right-bar-sign-up'>회원가입</div>
  </div>
</div>

<div className='auth-under-bar'>
  <div className='auth-left-null'></div>

  <div  className='auth-center-value'>
  <div className='auth-sign-up-box'>
    <div className='auth-sign-up-title'>비밀번호 찾기</div>

    <div className='auth-sign-up-box-text'>
      <div className='auth-sign-up-text'>아이디</div>
      <div className='auth-sign-up-next-box'><InputBox  label={''} type={'text'} value={''} placeholder={'아이디를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
    </div>

    <div className='auth-sign-up-box-text'>
      <div className='auth-sign-up-text'>이메일</div>
      <div className='auth-sign-up-next-box' ><InputBox label={''} type={'text'} value={''} placeholder={'이메일을 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
      <div className='primary-button auth-sign-in-button-size'>보내기</div>
    </div>

    <div className='auth-sign-up-box-text'>
      <div className='auth-sign-up-text'>이메일인증</div>
      <div className='auth-sign-up-next-box'><InputBox label={''} type={'text'} value={''} placeholder={'인증번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
      <div className='primary-button auth-sign-in-button-size'>확인</div>
    </div>


    <div className='auth-submit-box'>
      <div className='auth-submit-box primary-button'>다음</div>
    </div>
  </div>
  </div>

  <div className='auth-right-null'></div>
</div>

</div>
  )
}


export default function PasswordFound() {
  return (
    <div>
      <PasswordFoundPage />
      <SettingPassword />
    </div> 
  )
}
