import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './style.css';

// //           component           //
// export function Sns () {
// //           state          //
//   const {accessToken, expires} = useParams();
//   const [cookies, setCookie] = useCookies();
// //           function          //
//   const navigator = useNavigate();
// //           effect          //
//   useEffect (() => {
//     if (!accessToken || !expires) return;
//     const expiration = new Date(Date.now() + (Number(expires) * 1000));
//     setCookie('accessToken', accessToken, { path: '/', expires: expiration});
    
//     navigator(LOCAL_ABSOLUTE_PATH);
//   }, []);
// //          render           //
//   return <></>;
// }


// // type //
// type AuthPage = 'sign-in' | 'sign-up';

// //           interface           //
// interface SnsContainerProps{
//   title: string;
// }

// // component //
// function SnsContainer({title}: SnsContainerProps) {
  
//   // event handler // 
//   const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
//     window.location.href = 'http://localhost:4000/api/v1/auth/oauth2/' + type;
//   };
// //           render           //
//   return (
//     <div className="authentication-sns-container">
//       <div className="sns-container-title label">{title}</div>
//       <div className="sns-button-container">
//         <div className="sns-button kakao-button" onClick={() =>onSnsButtonClickHandler('kakao')}></div>
//         <div className="sns-button naver-button" onClick={() =>onSnsButtonClickHandler('naver')}></div>
//       </div>
//     </div>
//   );
//   // onClick={() =>onSnsButtonClickHandler('naver')} 익명의 1회성 함수를 만들어서 함수를 호출하게 만듬(매개변수 적기)
// };

// interface Props {
//   onLinkClickHandler : () => void;
// }
// //          component          //
// function SignIn ({onLinkClickHandler}: Props) {
//   //          state          //
//   const [cookies, setCookie] = useCookies();

//   const [id, setId] = useState<string>('');
//   const [password, setPassword] = useState<string>('');

//   const [message, setMessage] = useState<string>('');
  
//   //          function          //
//   const navigator = useNavigate();

//   const signInResponse = (result: SignInResponseDto | ResponseDto |  null) => {
    
//     const message = 
//       !result ? '서버에 문제가 있습니다.' :
//       result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
//       result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
//       result.code === 'TF' ? '서버에 문제가 있습니다.' :
//       result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
//     setMessage(message);
//     const isSuccess = result && result.code === 'SU';
//     if(!isSuccess) return;

//     const { accessToken, expires} = result as SignInResponseDto;
//     const expiration = new Date(Date.now() + (expires * 1000));
//     setCookie('accessToken', accessToken, { path: '/', expires: expiration});
    
//     navigator(LOCAL_ABSOLUTE_PATH);
//   };

//   //          event handler          //
//   const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setId(event.target.value);
//     setMessage('');
//   };
//   const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//     setMessage('');
//   };

//   const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//     if(event.key !== 'Enter') return;
//     onSignInButtonClickHandler();
//   };
  
//   const onSignInButtonClickHandler = () => {
    
//     if(!id || !password) {
//       setMessage('아이디와 비밀번호를 모두 입력하세요.');
//       return;
//     }
//     const requestBody: SignInRequsetDto = {
//       userId: id,
//       userPassword: password
//     }
//     signInRequest(requestBody).then(signInResponse);

//   };

//   //          render          //
//   return (
//     <div className='authentication-contents'>
//       <div className='authentication-input-container'>
//         <InputBox label={'아이디'} type={'text'} value={id} placeholder={'아이디를 입력해주세요'} onChangeHandler={onIdChangeHandler}  />
//         <InputBox label={'패스워드'} type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} onKeydownHandler={onPasswordKeydownHandler} message={message} error />
//       </div>
//       <div className='authentication-button-container'>
//         <div className="primary-button full-width" onClick={onSignInButtonClickHandler}> 로그인</div>
//         <div  className="text-link" onClick={onLinkClickHandler}>회원가입</div>
//       </div>
//       <div className='short-divider'></div>
//       <div className='authentication-sns-container'></div>
//       <SnsContainer title={'SNS 로그인'} />
//     </div>
//   )
// };

// //          component          //
// function SignUp ({onLinkClickHandler}: Props) {

//   //          state          //
//   const [id, setId] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [passwordCheck, setPasswordCheck] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [authNumber, setAuthNumber] = useState<string>('');

//   const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
//   const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
//   const [authNumberButtonStatus, setauthNumberButtonStatus] = useState<boolean>(false);
  
//   const [isIdCheck, setIsIdCheck] = useState<boolean>(false);
//   const [isPasswordPattern,setIsPasswordPattern] = useState<boolean>(false);
//   const [isEqaulPassword,setIsEqaulPassword] = useState<boolean>(false);
//   const [isEmailCheck,setIsEmailCheck] = useState<boolean>(false);
//   const [isAuthNumberCheck,setIsAuthNumberCheck] = useState<boolean>(false);

//   const [idMessage, setIdMessage] = useState<string>('');
//   const [passwordMessage, setPasswordMessage] = useState<string>('');
//   const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
//   const [emailMessage, setEmailMessage] = useState<string>('');
//   const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
//   const [isIdError, setIsIdError] = useState<boolean>(false);
//   const [isEmailError, setIsEmailError] = useState<boolean>(false);
//   const [isAuthNumberError, setIsAuthNumberError] = useState<boolean>(false);

//   const isSignUpActive = isIdCheck && isEmailCheck && isAuthNumberCheck && isPasswordPattern && isEqaulPassword;
//   // primary-button full-width / disable-button full-width
//   const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable'}-button full-width`
//   // isSignUpActive ? 'primary-button full-width' : 'disable-button full-width' 
//   // (isSignUpActive ? 'primary' :  'disable') + -'button full-width'

//   //                    function                    //
//   const idCheckResponse = (result: ResponseDto | null) => {

//     const idMessage = 
//       !result ? '서버에 문제가 있습니다.' : 
//       result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
//       result.code === 'DI' ? '이미 사용중인 아이디 입니다.' :
//       result.code === 'DBE' ? '서버에 접근할 수 없습니다.' :
//       result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
//     const idError = !(result && result.code === 'SU');
//     const idCheck = !idError;

//     setIdMessage(idMessage);
//     setIsIdError(idError);
//     setIsIdCheck(idCheck);

// };

// const emailAuthResponse = (result: ResponseDto | null) => {

//   const emailMessage = 
//       !result ? '서버에 문제가 있습니다.' : 
//       result.code === 'VF' ? '이메일 형식이 아닙니다.' :
//       result.code === 'DE' ? '이미 사용중인 이메일 입니다.' :
//       result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
//       result.code === 'DBE' ? '서버에 문제가 있습니다.' :
//       result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';
//     const emailCheck = result !== null && result.code === 'SU';
//     const emailError = !emailCheck;

//     setEmailMessage(emailMessage);
//     setIsEmailCheck(emailCheck);
//     setIsEmailError(emailError);
// };

// const emailAuthCheckResponse = (result: ResponseDto | null) => {
  
//   const authNumberMessage =
//       !result ? '서버에 문제가 있습니다.':
//       result.code === 'VF' ? '인증번호를 입력해주세요.' :
//       result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
//       result.code === 'DBE' ? '서버에 문제가 있습니다.':
//       result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
//     const authNumberCheck = result !== null && result.code === 'SU';
//     const authNumberError = !authNumberCheck;

//     setAuthNumberMessage(authNumberMessage);
//     setIsAuthNumberCheck(authNumberCheck);
//     setIsAuthNumberError(authNumberError);
// };

// const signUpResponse = (result: ResponseDto | null) => {

//   const message = 
//     !result ? '서버에 문제가 있습니다.' :
//     result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
//     result.code === 'DI' ? '이미 사용중인 아이디입니다.' :
//     result.code === 'DE' ? '중복된 이메일입니다.' :
//     result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
//     result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

//   const isSuccess = result && result.code === 'SU'
//   if (!isSuccess) {
//     alert(message);
//     return;
//   } 
//   onLinkClickHandler();
// };

//   //          event handler          //
//   const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const {value} = event.target;
//     setId(value);
//     setIdButtonStatus(value !=='');
//     setIsIdCheck(false);
//     setIdMessage('');
//   }
//   const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const {value} = event.target;
//     setPassword(value)
//     const passwordPattern = /^(?=.*[a-zA-Z0-9])(?=.*[0-9]).{8,13}$/
//     const isPassworPattern = passwordPattern.test(value);
//     setIsPasswordPattern(isPassworPattern);
//     const passwordMessage =
//       isPassworPattern ? '':
//       value ? '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' : '';
//     setPasswordMessage(passwordMessage);

//     const isEqaulPassword = passwordCheck === value
//     const passwordCheckMessage = isEqaulPassword ? '': 
//       passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
//     setIsEqaulPassword(isEqaulPassword);
//     setPasswordCheckMessage(passwordCheckMessage);


//   }
//   const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const {value} = event.target;
//     setPasswordCheck(value);
//     const isEqaulPassword = password === value
//     const passwordCheckMessage = isEqaulPassword ? '': 
//     passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
//     setIsEqaulPassword(isEqaulPassword);
//     setPasswordCheckMessage(passwordCheckMessage);
//   }
//   const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const {value} = event.target;
//     setEmail(value);
//     setEmailButtonStatus(value !=='');
//     setIsEmailCheck(false);
//     setIsAuthNumberCheck(false);
//     setEmailMessage('');
//   }
//   const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const {value} = event.target;
//     setAuthNumber(value);
//     setauthNumberButtonStatus(value !=='');
//     setIsAuthNumberCheck(false);  
//     setAuthNumberMessage('');
//   };

//   const onIdButtonClickHandler = () => {
//     if(!idButtonStatus) return;
//     // if(!id || !id.trim()) return;

//     const requsetBody: IdCheckRequsetDto = { userId: id };
//     idCheckRequest(requsetBody).then(idCheckResponse);
//   };  

//   const onEmailButtonClickHandler = () => {
//     if(!emailButtonStatus) return;

//     const emailPattern = /^([-.]?[a-zA-Z0-9])*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
//     const isEmailPattern = emailPattern.test(email);
//     if(!isEmailPattern) {
//       setEmailMessage('이메일 형식이 아닙니다.');
//       setIsEmailError(true);
//       setIsEmailCheck(false);  
//       return;
//     }
//     const requestBody: EmailAuthRequsetDto = { userEmail : email};
//     emailAuthRequest(requestBody).then(emailAuthResponse);
//   };

//   const onAuthNumberButtonClickHandler = () => {
//     if(!authNumberButtonStatus) return;
//     if(!authNumber) return;

//     const requsetBody: EmailAuthCheckRequsetDto = { 
//       userEmail: email,
//       authNumber
//     };
//     emailAuthCheckRequest(requsetBody).then(emailAuthCheckResponse);
//   };  

//   const onSignUpButtonClickHandler = () => {
//     if(!isSignUpActive) return;
//     if(!id || !password || !passwordCheck || !email || !authNumber) {
//       alert('모든 내용을 입력해주세요.')
//       return;
//     };

//     const requestBody: SignUpRequsetDto = {
//       userId: id,
//       userPassword: password,
//       userEmail: email,
//       authNumber
//     };
//     signUpRequest(requestBody).then(signUpResponse);
//   };

//   //          render          //
//   return (
//     <div className='authentication-contents'>
//     <SnsContainer title='SNS 회원가입' />
//     <div className='short-divider'></div>
//     <div className='authentication-input-container'>

//     <InputBox label={'아이디'} type={'text'} value={id} placeholder={'아이디를 입력해주세요'} onChangeHandler={onIdChangeHandler} buttonTitle='중복 확인' buttonStatus={idButtonStatus} onButtonClickHandler={onIdButtonClickHandler} message={idMessage} error={isIdError} />

//     <InputBox label={'비밀번호'} type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />

//     <InputBox label={'비밀번호 확인'} type={'password'} value={passwordCheck} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

//     <InputBox label={'이메일'} type={'text'} value={email} placeholder={'이메일 주소를 입력해주세요'} onChangeHandler={onEmailChangeHandler} buttonTitle='이메일 인증' buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError}  /> 

//     { 
//     isEmailCheck &&
//     <InputBox label={'인증번호'} type={'text'} value={authNumber} placeholder={'인증번호 4자리를 입력해주세요'} onChangeHandler={onAuthNumberChangeHandler} buttonTitle='인증 확인' buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />
//     }

//     </div>
//     <div className='authentication-button-container'>
//       <div className={signUpButtonClass} onClick={onSignUpButtonClickHandler}> 회원가입</div>
//       <div  className="text-link" onClick={onLinkClickHandler}>로그인</div>
//     </div>
//   </div>
//   )
// };

//           component           //
export default function Authentication() {

  // const [page, setPage] = useState<AuthPage>('sign-in'); //useState는 컴포넌트 내부에 선언되어야 함

  // const onLinkClickHandler = () => {
  //   if  (page === 'sign-in') setPage('sign-up');
  //   else setPage('sign-in');
  // };

  // const AuthenticationContents = 
  // page === 'sign-in' ? 
  // <SignIn onLinkClickHandler={onLinkClickHandler} /> : 
  // <SignUp onLinkClickHandler={onLinkClickHandler} />;

  // const imageBoxStyle = { backgroundImage: `url(${page === 'sign-in' ? SignInBackground : SignUpBackground})`}

  //              render             //
  return (
    <div id="authentication-wrapper">
      {/* <div 
        className='authentication-image-box' 
        style={imageBoxStyle}></div>
      <div className='authentication-box'>
        <div className='authentication-container'>
          <div className='authentication-title h1'>{'임대 주택 가격 서비스'}</div>
          { AuthenticationContents }
        </div>
      </div> */}
    </div>
  )
}
