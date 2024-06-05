import React, { ChangeEvent, useState } from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import { AUTH_SIGN_IN_ABSOLUTE_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useNavigate } from 'react-router';
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, FoundIdCheckRequestDto } from 'src/apis/auth/dto/request';
import { emailAuthCheckRequest, foundIdEmailAuthRequest, foundIdRequest } from 'src/apis/auth';
import ResponseDto from 'src/apis/response.dto';
import { IdFoundResponseDto } from 'src/apis/auth/dto/response';

//                    component                    //
export default function IdFound() {

//                     state                        //
  const [success, setSuccess] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setauthNumberButtonStatus] = useState<boolean>(false);

  const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
  const [isAuthNumberCheck, setIsAuthNumberCheck] = useState<boolean>(false);

  const [emailMessage, setEmailMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isAuthNumberError, setIsAuthNumberError] = useState<boolean>(false);

//                   function                       //
  const navigator = useNavigate();

  const emailAuthResponse = (result: ResponseDto | null) => {
    const emailMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '이메일 형식이 아닙니다.' :
      result.code === 'NE' ? '존재하지 않는 이메일 입니다.' :
      result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';
      
    const emailCheck = result !== null && result.code === 'SU';
    const emailError = !emailCheck;

    setEmailMessage(emailMessage);
    setIsEmailCheck(emailCheck);
    setIsEmailError(emailError);
  };

  const emailAuthCheckResponse = (result: ResponseDto | null) => {
    const authNumberMessage =
      !result ? '서버에 문제가 있습니다.':
      result.code === 'VF' ? '인증번호를 입력해주세요.' :
      result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.':
      result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';

    const authNumberCheck = result !== null && result.code === 'SU';
    const authNumberError = !authNumberCheck;

    setAuthNumberMessage(authNumberMessage);
    setIsAuthNumberCheck(authNumberCheck);
    setIsAuthNumberError(authNumberError);
  };

const foundIdResponse = (result: IdFoundResponseDto | ResponseDto | null) => {
  const message = 
    !result ? '서버에 문제가 있습니다.' :
    result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
    result.code === 'NE' ? '존재하지 않는 이메일 입니다.' :
    result.code === 'NI' ? '존재하지 않는 아이디 입니다.':
    result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
    result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  const isSuccess = result && result.code === 'SU'
  if (!isSuccess) {
    alert(message);
    setSuccess(false);
    return;
  }

  const { userId } = result as IdFoundResponseDto;
  setSuccess(true);
  setId(userId);

};

//                   event handler                  //
  const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
  const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);
  const onClickMainHandler = () => navigator(MAIN_PATH);

  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);
    setEmailButtonStatus(value !=='');
    setIsEmailCheck(false);
    setIsAuthNumberCheck(false);
    setEmailMessage('');
  }
  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setAuthNumber(value);
    setauthNumberButtonStatus(value !=='');
    setIsAuthNumberCheck(false);  
    setAuthNumberMessage('');
  };

  const onEmailButtonClickHandler = () => {
    if(!emailButtonStatus) return;

    const emailPattern = /^([-.]?[a-zA-Z0-9])*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const isEmailPattern = emailPattern.test(email);
    if(!isEmailPattern) {
      setEmailMessage('이메일 형식이 아닙니다.');
      setIsEmailError(true);
      setIsEmailCheck(false);  
      return;
    }
    const requestBody: EmailAuthRequestDto = { userEmail : email};
    foundIdEmailAuthRequest(requestBody).then(emailAuthResponse);
  };

  const onAuthNumberButtonClickHandler = () => {
    if(!authNumberButtonStatus) return;
    if(!authNumber) return;

    const requsetBody: EmailAuthCheckRequestDto = { 
      userEmail: email,
      authNumber
    };
    emailAuthCheckRequest(requsetBody).then(emailAuthCheckResponse);
  };  

  const onFoundIdButtonClickHandler = () => {
    if(!email || !authNumber) {
      alert('모든 내용을 입력해주세요.')
      return;
    };

    const requestBody: FoundIdCheckRequestDto = {

      userEmail: email,
      authNumber
    };
    foundIdRequest(requestBody).then(foundIdResponse);
  };


//                      render                      //
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
      <div className='auth-sign-up-next-box' ><InputBox type={'text'} value={email} placeholder={'이메일 주소를 입력해주세요'} onChangeHandler={onEmailChangeHandler} buttonTitle='이메일 인증' buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError}  /> 
      </div>
    </div>


    <div className='auth-sign-up-box-text'>
      <div className='auth-sign-up-text'>이메일인증</div>
      <div className='auth-sign-up-next-box'><InputBox type={'text'} value={authNumber} placeholder={'인증번호 4자리를 입력해주세요'} onChangeHandler={onAuthNumberChangeHandler} buttonTitle='인증 확인' buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />
      </div>
    </div>

    <div className='auth-submit-box'>
      <div className='auth-submit-box auth-primary-button' onClick={onFoundIdButtonClickHandler}>확인</div>
    </div>
      {success && <div className='is-user-id'>아이디는 {id} 입니다.</div>}
    </div>
  </div>

  <div className='auth-right-null'></div>
  </div>
  </div>
  )
}


