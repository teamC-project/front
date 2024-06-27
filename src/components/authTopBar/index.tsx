import { useLocation, useNavigate } from 'react-router';

import {
    MAIN_PATH,
    AUTH_SIGN_IN_ABSOLUTE_PATH,
    AUTH_SIGN_UP_ABSOLUTE_PATH,
    AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH,
    AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH
} from 'src/constant';

import './style.css';

//                          component                           //
export default function AuthTopBar() {

//                          function                            //
    const navigator = useNavigate();
    const location = useLocation();
    const locationPathname = location.pathname !== AUTH_SIGN_UP_ABSOLUTE_PATH 
                            && location.pathname !== AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH 
                            && location.pathname !== AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH; 

//                          event handler                           //
    const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);
    const onClickMainHandler = () => navigator(MAIN_PATH);

//                          render                          //
    return (
        <div className='auth-top-bar'>
        <div className='auth-logo-image' onClick={onClickMainHandler}></div>
        <div className='auth-top-right-bar'>
        {location.pathname !== AUTH_SIGN_IN_ABSOLUTE_PATH && (
        <div className='auth-top-right-bar-login' onClick={onClickSignInHandler}>로그인</div>
    )}
    {locationPathname && (
        <div className='auth-top-right-bar-sign-up' onClick={onClickSignUpHandler}>회원가입</div>
    )}      
    </div>
    </div>
    )
}
