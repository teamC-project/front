import React from 'react'
import "./style.css";

export default function Main() {
  return (
    <div id='main-page-wrapper'>

    <div className='main-page-top-bar'>
      <div className='main-page-logo-image'></div>
      
      <div className='main-page-top-right-bar'>
        <div className='main-page-top-right-bar-login'>로그인</div>
        <div className='main-page-top-right-bar-line'>|</div>
        <div className='main-page-top-right-bar-sign-up'>회원가입</div>
      </div>
    </div>
    
    <div className='main-page-image-box'>
      <div className='main-page-title-image'></div>
      <div className='main-page-image'></div>
    </div>


  </div>

  )
}
