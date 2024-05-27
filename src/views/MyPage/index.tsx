import React from 'react'
import "./style.css";

export default function MyPage() {
  return (
    <div id='mypage-wrapper'>
      <div className='john'></div>
      <div className='mypage'>
          <div className='information'>
            <div className='information-image'></div>
            <div className='edit-personal-information'>개인정보수정</div>
          </div>
          <div className='password-change-container'>
            <div className='password-change-image'></div>
            <div className='password-change'>비밀번호 재설정</div>
          </div>
          <div className='user-delete-container'>
            <div className='user-delete-image'></div>
            <div className='user-delete'>회원탈퇴</div>
          </div>
        </div>
      <div className='john1'></div>
    </div>
  );
}