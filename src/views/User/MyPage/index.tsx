import { useNavigate } from 'react-router';

import { useUserStore } from 'src/stores';

import { 
    CHANGE_PASSWORD_ABSOLUTE_PATH, 
    DELETE_INFO_ABSOLUTE_PATH, 
    UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH, 
    UPDATE_DESIGNER_INFO_ABSOLUTE_PATH,  
    } 
    from 'src/constant';

import "./style.css";

//                          component                          //
export default function MyPage() {

//                          state                          //
    const { loginUserRole } = useUserStore();

//                          function                          //
    const navigator = useNavigate();

//                          event handler                          //
    const onInfoUpdatePageClickHandler = () => {
    if( loginUserRole === 'ROLE_CUSTOMER')
        navigator(UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH);
    else 
        navigator(UPDATE_DESIGNER_INFO_ABSOLUTE_PATH);
    };

    const onUpdatePasswordClickHandler = () => {
        navigator(CHANGE_PASSWORD_ABSOLUTE_PATH);
    }

    const onUserDeleteInfoClickHandler = () => {
        navigator(DELETE_INFO_ABSOLUTE_PATH);
    }

//                          render                          //
    return (
        <div id='mypage-wrapper'>
            <div className='info-sub-title'>마이 페이지</div>
            <div className='mypage'>
                <div className='information' onClick={onInfoUpdatePageClickHandler}>
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
        </div>
    );
}