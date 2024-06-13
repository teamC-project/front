import React from 'react'
import './style.css';
import { AUTH_SIGN_IN_ABSOLUTE_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useNavigate } from 'react-router';

//                    component                    //
export default function AuthTopBar() {
  //                   function                       //
  const navigator = useNavigate();
  //                    event handler                    //
  const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
  const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);
  const onClickMainHandler = () => navigator(MAIN_PATH);
  //                     render                     //
  return (
    <div className='auth-top-bar'>
  <div className='auth-logo-image' onClick={onClickMainHandler}></div>
  
  <div className='auth-top-right-bar'>
    <div className='auth-top-right-bar-login' onClick={onClickSignInHandler}>로그인</div>
    <div className='auth-top-right-bar-line'>|</div>
    <div className='auth-top-right-bar-sign-up' onClick={onClickSignUpHandler}>회원가입</div>
  </div>
</div>
  )
}
