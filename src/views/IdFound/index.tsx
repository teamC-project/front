import React from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import { AUTH_SIGN_IN_ABSOLUTE_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useNavigate } from 'react-router';


export default function IdFound() {
    //                  function                 //
    const navigator = useNavigate();
    //                event handler               //
    const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    
    const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);

    const onClickMainHandler = () => navigator(MAIN_PATH);
  return (
<div id='auth-wrapper'>

<div className='auth-top-bar'>
  <div className='auth-logo-image' onClick={onClickMainHandler}></div>
  
  <div className='auth-top-right-bar'>
    <div className='auth-top-right-bar-login' onClick={onClickSignInHandler}>로그인</div>
    <div className='auth-top-right-bar-line'>|</div>
    <div className='auth-top-right-bar-sign-up' onClick={onClickSignUpHandler}>회원가입</div>
  </div>
</div>

<div className='auth-under-bar'>
  <div className='auth-left-null'></div>

  <div  className='auth-center-value'>
  <div className='auth-sign-up-box'>
    <div className='auth-sign-up-title'>아이디 찾기</div>

    <div className='auth-sign-up-box-text'>
      <div className='auth-sign-up-text'>이메일</div>
      <div className='auth-sign-up-next-box' ><InputBox type={'text'} value={''} placeholder={'이메일을 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
      <div className='primary-button auth-sign-in-button-size'>보내기</div>
    </div>

    <div className='email-check'>
                <div>이메일을 다시 확인해주세요</div>
                <div>인증번호가 전송되었습니다</div>
                </div>

    <div className='auth-sign-up-box-text'>
      <div className='auth-sign-up-text'>이메일인증</div>
      <div className='auth-sign-up-next-box'><InputBox type={'text'} value={''} placeholder={'인증번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
      <div className='primary-button auth-sign-in-button-size'>확인</div>
    </div>

    <div className='auth-check'>
                  <div>인증번호가 일치하지 않습니다.</div>
                  <div>인증번호가 확인 되었습니다.</div>
                </div>

    <div className='id-box'>
                  <div className='id-title'>고객님의 정보와 일치하는 아이디입니다.</div>
                  <div className='id'>ID:john0256</div>
                  <div className='id-check'>확인</div>
                </div>

    <div className='auth-submit-box'>
      <div className='auth-submit-box primary-button'>확인</div>

    </div>
  </div>
  </div>

  <div className='auth-right-null'></div>
</div>

</div>
      
  )
}


