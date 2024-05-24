import React from 'react'
import "./style.css";


export default function IdFound() {
  return (
    <div id='wrapper'>
      <div className='top-bar-container'>
        <div className='title'>헤어어드바이저</div>
          <div className='top-bar-right'>
          <div className='login-button'>로그인</div>
          <div className='signup-button'>회원가입</div>
          </div>
      </div>


      <div className='sub-wrapper'>
          <div className='id-found-box'>
              <div className='sub-title'>
                <div className='id-found-title'>아이디 찾기</div>
                <div className='id-found'>
                  <div className='email'>이메일 주소</div>
                  <div className='input-box'></div>
                  <div className='send-authnumber'>인증번호 보내기</div>
                </div>
                <div className='email-check'>
                <div>이메일을 다시 확인해주세요</div>
                <div>인증번호가 전송되었습니다</div>
                </div>
                <div className='auth'>
                  <div className='authnumber'>인증번호</div>
                  <div className='input-box'></div>
                  <div className='check'>확인</div>
                </div>
                <div className='auth-check'>
                  <div>인증번호가 일치하지 않습니다.</div>
                  <div>인증번호가 확인 되었습니다.</div>
                </div>
                  <div className='next'>다음</div>
            </div>
        </div>
      </div>
    </div>
      
  )
}
