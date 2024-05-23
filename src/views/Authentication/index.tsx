import React from 'react'
import "./style.css";

export function ChooseSingUp() {
  return (
    <div id='sign-up-wrapper'>

      <div className='top-bar'>
        <div className='top-bar-login'>로그인</div>
        <div className='top-bar-line'>|</div>
        <div className='top-bar-sign-up'>회원가입</div>
      </div>

      <div className='welcome-image-box'>
        <div className='welcome-image'></div>
      </div>

      <div className='welcome-text'>헤어어드바에 오신 것을 환영합니다 !</div>

      <div className='choose-type-text'>회원가입 방식을 선택해주세요.</div>

      <div className='type-image'>
        <div className='type-image-customer'></div>
        <div className='type-image-designer'></div>
      </div>

      <div className='type-text'>
        <div className='type-text-customer'>고객</div>
        <div className='type-text-designer'>디자이너</div>
      </div>

      <div className='sign-up-sns'>
          <div className='sign-up-naver'></div>
          <div className='sign-up-kakao'></div>
      </div>

    </div>
  )
}

export default function Authentication() {
  return (
    <div>
      <ChooseSingUp />
    </div>
  )
}
