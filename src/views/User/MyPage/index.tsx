import React from 'react'
import "./style.css";
import { Path, useNavigate } from 'react-router';
import { DELETE_INFO_ABSOLUTE_PATH, UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH, UPDATE_CUSTOMER_INFO_PATH, UPDATE_PASSWORD_ABSOLUTE_PATH } from 'src/constant';

//                    interface                    //
interface Props {
  path: Path;
}

//                    component                    //
export default function MyPage() {

  //                    state                    //


  //                    function                    //
  const navigator = useNavigate();

  //                    event handler                    //
  const onInfoCustomerClickHandler = () => {
    navigator(UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH);
  };

  const onUpdatePasswordClickHandler = () => {
    navigator(UPDATE_PASSWORD_ABSOLUTE_PATH);
  }

  const onUserDeleteInfoClickHandler = () => {
    navigator(DELETE_INFO_ABSOLUTE_PATH);
  }

  //                    render                    //
  return (
    <div id='mypage-wrapper'>
      <div className='john'></div>
      <div className='mypage'>
          <div className='information' onClick={onInfoCustomerClickHandler}>
            <div className='information-image'></div>
            <div className='edit-personal-information'>개인정보수정</div>
          </div>
          <div className='password-change-container' onClick={onUpdatePasswordClickHandler}>
            <div className='password-change-image'></div>
            <div className='password-change'>비밀번호 재설정</div>
          </div>
          <div className='user-delete-container' onClick={onUserDeleteInfoClickHandler}>
            <div className='user-delete-image'></div>
            <div className='user-delete'>회원탈퇴</div>
          </div>
        </div>
      <div className='john1'></div>
    </div>
  );
}