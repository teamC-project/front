<<<<<<< HEAD
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
=======
 import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import SelectBox from 'src/components/Selectbox';
import { useNavigate, useParams } from 'react-router';
>>>>>>> 6688ee3f71a08de2549368ccdaaa0ba2fe799c1c
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { customerSignUpRequest, designerSignUpRequest, emailAuthCheckRequest, emailAuthRequest, idCheckRequest, signInRequest } from 'src/apis/auth';
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpCustomerRequestDto, SignUpDesignerRequestDto } from 'src/apis/auth/dto/request';
import { SignInResponseDto } from 'src/apis/auth/dto/response';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/Inputbox';
import SelectBox from 'src/components/Selectbox';
import AuthTopBar from 'src/components/authTopBar';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH, AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH, ID_FOUND_ABSOLUTE_PATH, PASSWORD_FOUND_ABSOLUTE_PATH } from 'src/constant';
import { useSnsStore } from 'src/stores';
import "./style.css";

export function Main() {
  return (
    <div id='main-page-wrapper'>
      <AuthTopBar />
      <div className='auth-under-bar'>
          <div className='main-page-image-box'>
            <div className='main-page-title-image'></div>
            <div className='main-page-image'></div>
          </div>
      </div>
    </div>
  )
}

//           component           //
export function Sns() {
  //           state          //
  const { accessToken, expires } = useParams();
  const [cookies, setCookie] = useCookies();
  //           function          //
  const navigator = useNavigate();
  //           effect          //
  useEffect(() => {
    if (!accessToken || !expires) return;
    const expiration = new Date(Date.now() + (Number(expires) * 1000));
    setCookie('accessToken', accessToken, { path: '/', expires: expiration });

    navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
  }, []);
  //          render           //
  return <></>;
}

//                    component                    //
export function SignIn() {
  //                    state                    //
  const [cookies, setCookie] = useCookies();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  //                    function                    //
  const navigator = useNavigate();

  const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
        result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
        result.code === 'TF' ? '서버에 문제가 있습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    setMessage(message);
    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) return;

    const { accessToken, expires } = result as SignInResponseDto;
    const expiration = new Date(Date.now() + (expires * 1000));
    setCookie('accessToken', accessToken, { path: '/', expires: expiration });

    navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
  };

  //                    event handler                    //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setMessage('');
  };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setMessage('');
  };

  const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onSignInButtonClickHandler();
  };

  const onSignInButtonClickHandler = () => {
    if (!id || !password) {
      setMessage('아이디와 비밀번호를 모두 입력하세요.')
      return;
    }
    const requestBody: SignInRequestDto = {
      userId: id,
      userPassword: password
    }
    signInRequest(requestBody).then(signInResponse);
  };

  const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
    window.location.href = 'http://localhost:4200/api/v1/auth/oauth2/' + type;
  };

  const onClickIdFoundHandler = () => navigator(ID_FOUND_ABSOLUTE_PATH);
  const onClickPasswordFoundHandler = () => navigator(PASSWORD_FOUND_ABSOLUTE_PATH);
  //                    render                    //
  return (
    <div id='auth-wrapper'>
      <AuthTopBar />
      <div className='sign-in-main-box'>
        <div className='image-box'></div>
        <div className='login-box'>
          <div className='login-container'>
            <div className='login-page h1'>로그인 페이지</div>
            <div className='sign-in-contents'>

              <div className='auth-sign-up-box-text'>
                <div className='auth-sign-up-text'>아이디</div>
                <div><InputBox type={'text'} value={id} placeholder={'아이디를 입력해주세요'} onChangeHandler={onIdChangeHandler}  />
                </div>
              </div>

              <div className='auth-sign-up-box-text'>
                <div className='auth-sign-up-text'>비밀번호</div>
                <div><InputBox label='' type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} onKeydownHandler={onPasswordKeydownHandler} message={message} error />
                </div>
              </div>

              <div className='auth-submit-box'>
                <div className='auth-submit-box auth-primary-button' onClick={onSignInButtonClickHandler}>로그인</div>
              </div>

              <div className='socal-login'>
                <div className='kakao-login' onClick={() => onSnsButtonClickHandler('kakao')}></div>
                <div className='naver-login' onClick={() => onSnsButtonClickHandler('naver')}></div>
              </div>

              <div className="short-divider"></div>

              <div className='user-found'>
                <div className='auth-sign-up-text text-cusor-pointer' onClick={onClickIdFoundHandler}>아이디 찾기</div>
                <div className='auth-sign-up-text text-cusor-pointer' onClick={onClickPasswordFoundHandler}>비밀번호 찾기</div>
              </div>
            </div>
          </div>
        </div>
        <div className='under-right-bar'></div>
      </div>
    </div>
  )
}

//                 component                 //
export function ChooseSingUp() {

  //                    state                  //
  const { snsId, joinPath, setValue } = useSnsStore();
  const [ params ] = useSearchParams();

  //                  function                 //
  const navigator = useNavigate();
  //                event handler               //
  const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
    window.location.href = 'http://localhost:4200/api/v1/auth/oauth2/' + type;
  };

const onClickCustomerSignUpHandler = () => navigator(AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH);
const onClickDesignerSignUpHandler = () => navigator(AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH);

useEffect(() => {
  const snsId = params.get('snsId');
  const joinPath = params.get('joinPath');
  if (!snsId || !joinPath) {
    setValue('', '');
    return;
  }
  setValue(snsId, joinPath);
}, [params])

//                   render                  //
  return (
    <div id='auth-wrapper'>

      <AuthTopBar />

      <div className='auth-welcome-image-box'>
        <div className='auth-welcome-image'></div>
      </div>

      <div className='auth-choose-type-text'>회원가입 방식을 선택해주세요.</div>

      <div className='auth-type-image'>
        <div className='auth-type-image-customer' onClick={onClickCustomerSignUpHandler}></div>
        <div className='auth-type-image-designer' onClick={onClickDesignerSignUpHandler}></div>
      </div>

      <div className='auth-type-text'>
        <div className='auth-type-text-customer' onClick={onClickCustomerSignUpHandler}>고객</div>
        <div className='auth-type-text-designer' onClick={onClickDesignerSignUpHandler}>디자이너</div>
      </div>

      {!snsId && !joinPath && (
      <div className='auth-sign-up-sns'>
        <div className='auth-sign-up-naver' onClick={() => onSnsButtonClickHandler('naver')}></div>
        <div className='auth-sign-up-kakao' onClick={() => onSnsButtonClickHandler('kakao')}></div>
      </div>
      )}
      

    </div>
  )
}


//                    component                   //
export function CustomerSignUp() {

//                      state                     //
const { snsId, joinPath, setValue } = useSnsStore();

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');
  
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
  const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

  const [isIdCheck, setIsIdCheck] = useState<boolean>(false);
  const [isPasswordPattern,setIsPasswordPattern] = useState<boolean>(false);
  const [isEqaulPassword,setIsEqaulPassword] = useState<boolean>(false);
  const [isEmailCheck,setIsEmailCheck] = useState<boolean>(false);
  const [isAuthNumberCheck,setIsAuthNumberCheck] = useState<boolean>(false);
  const [isGenderCheck,setIsGenderCheck] = useState<boolean>(false);
  const [isAgeCheck,setIsAgeCheck] = useState<boolean>(false);

  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
  const [isIdError, setIsIdError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isAuthNumberError, setIsAuthNumberError] = useState<boolean>(false);

//                     function                    //
const navigator = useNavigate();

const idCheckResponse = (result: ResponseDto | null) => {
  const idMessage = 
    !result ? '서버에 문제가 있습니다.' : 
    result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
    result.code === 'DI' ? '이미 사용중인 아이디 입니다.' :
    result.code === 'DBE' ? '서버에 접근할 수 없습니다.' :
    result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
  const idError = !(result && result.code === 'SU');
  const idCheck = !idError;

  setIdMessage(idMessage);
  setIsIdError(idError);
  setIsIdCheck(idCheck);
};


const emailAuthResponse = (result: ResponseDto | null) => {
  const emailMessage = 
    !result ? '서버에 문제가 있습니다.' : 
    result.code === 'VF' ? '이메일 형식이 아닙니다.' :
    result.code === 'DE' ? '이미 사용중인 이메일 입니다.' :
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

const signUpResponse = (result: ResponseDto | null) => {
  const message = 
    !result ? '서버에 문제가 있습니다.' :
    result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
    result.code === 'DI' ? '이미 사용중인 아이디입니다.' :
    result.code === 'DE' ? '중복된 이메일입니다.' :
    result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
    result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  const isSuccess = result && result.code === 'SU'
  if (!isSuccess) {
    alert(message);
    return;
  } 
  navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
};


//                  event handler                  //

  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setId(value);
    setIdButtonStatus(value !=='');
    setIsIdCheck(false);
    setIdMessage('');
  }

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value)
    const passwordPattern = /^(?=.*[a-zA-Z0-9])(?=.*[0-9]).{8,15}$/;
    const isPassworPattern = passwordPattern.test(value);
    setIsPasswordPattern(isPassworPattern);
    const passwordMessage =
      isPassworPattern ? '':
      value ? '영문, 숫자를 혼용하여 8 ~ 15자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

    const isEqaulPassword = passwordCheck === value
    const passwordCheckMessage = isEqaulPassword ? '':
      passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);
  }

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPasswordCheck(value);
    const isEqaulPassword = password === value
    const passwordCheckMessage = isEqaulPassword ? '':
    passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);
  }

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
    setAuthNumberButtonStatus(value !=='');
    setIsAuthNumberCheck(false);  
    setAuthNumberMessage('');
  };

  const onGenderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };


  
  const onAgeChangeHandler = (age: string) => {
    setAge(age);
  };

  const onIdButtonClickHandler = () => {
    if(!idButtonStatus) return;

    const requsetBody: IdCheckRequestDto = { userId: id };
    idCheckRequest(requsetBody).then(idCheckResponse);
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
    emailAuthRequest(requestBody).then(emailAuthResponse);
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

  const onSignUpButtonClickHandler = () => {
    if(!id || !password || !passwordCheck || !email || !authNumber || !gender || !age) {
      alert('모든 내용을 입력해주세요.')
      return;
    };

    const requestBody: SignUpCustomerRequestDto = {
      userId: id,
      userPassword: password,
      userEmail: email,
      authNumber,
      userGender: gender,
      userAge: age,
      joinPath: joinPath ? joinPath : 'HOME',
      snsId: snsId ? snsId : undefined
    };
    customerSignUpRequest(requestBody).then(signUpResponse);
  };

//                      render                      //
  return (
    <div id='auth-wrapper'>

<AuthTopBar />

      <div className='auth-under-bar'>
        <div className='auth-left-null'></div>

        <div className='auth-center-value'>
          <div className='auth-sign-up-box'>
            <div className='auth-sign-up-title'>고객 회원가입</div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>아이디</div>
              <InputBox type={'text'} value={id} placeholder={'아이디를 입력해주세요'} onChangeHandler={onIdChangeHandler} buttonTitle='중복 확인' buttonStatus={idButtonStatus} onButtonClickHandler={onIdButtonClickHandler} message={idMessage} error={isIdError} />
          </div>


          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호</div>
              <InputBox type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호 확인</div>
              <InputBox type={'password'} value={passwordCheck} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일</div>
              <InputBox type={'text'} value={email} placeholder={'이메일 주소를 입력해주세요'} onChangeHandler={onEmailChangeHandler} buttonTitle='보내기' buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError}  />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일인증</div>
              <InputBox type={'text'} value={authNumber} placeholder={'인증번호 4자리를 입력해주세요'} onChangeHandler={onAuthNumberChangeHandler} buttonTitle='확인' buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>성별</div>
            <div className='auth-radio-box'>
              <div className='auth-sign-up-radio-box'>
                <InputBox label={'MALE'} type={'radio'} value={'MALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} checked={gender === 'MALE'} /></div>
              <div className='auth-sign-up-radio-box'>
                <InputBox label={'FEMALE'} type={'radio'} value={'FEMALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} checked={gender === 'FEMALE'} /></div>
            </div>
          </div>


          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>연령대</div>
            <div>
              <SelectBox value={age} onChange={onAgeChangeHandler} />
            </div>
          </div>

          <div className='auth-submit-box'>
            <div className='auth-submit-box auth-primary-button' onClick={onSignUpButtonClickHandler}>가입하기</div>
          </div>
        </div>
      </div>

      <div className='auth-right-null'></div>
      </div>

    </div>
  )
}

//                     component                      //
export function DesignerSignUp() {

//                      state                     //
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
  const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

  const [isIdCheck, setIsIdCheck] = useState<boolean>(false);
  const [isPasswordPattern,setIsPasswordPattern] = useState<boolean>(false);
  const [isEqaulPassword,setIsEqaulPassword] = useState<boolean>(false);
  const [isEmailCheck,setIsEmailCheck] = useState<boolean>(false);
  const [isAuthNumberCheck,setIsAuthNumberCheck] = useState<boolean>(false);
  const [isGenderCheck,setIsGenderCheck] = useState<boolean>(false);
  const [isAgeCheck,setIsAgeCheck] = useState<boolean>(false);
  const [isCompanyNameCheck,setIsCompanyNameCheck] = useState<boolean>(false);
  const [isImageCheck,setIsImageCheck] = useState<boolean>(false);

  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
  const [companyNameMessage, setCompanyNameMessage] = useState<string>('');
  const [imageMessage, setImageMessage] = useState<string>('');
  const [isIdError, setIsIdError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isAuthNumberError, setIsAuthNumberError] = useState<boolean>(false);
  const [isCompanyNameError, setIsCompanyNameError] = useState<boolean>(false);
  const [isImageError, setIsImageError] = useState<boolean>(false);

//                     function                    //
  const navigator = useNavigate();

  const idCheckResponse = (result: ResponseDto | null) => {
    const idMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
      result.code === 'DI' ? '이미 사용중인 아이디 입니다.' :
      result.code === 'DBE' ? '서버에 접근할 수 없습니다.' :
      result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
    const idError = !(result && result.code === 'SU');
    const idCheck = !idError;

    setIdMessage(idMessage);
    setIsIdError(idError);
    setIsIdCheck(idCheck);
  };

  const emailAuthResponse = (result: ResponseDto | null) => {
    const emailMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '이메일 형식이 아닙니다.' :
      result.code === 'DE' ? '이미 사용중인 이메일 입니다.' :
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

  const signUpResponse = (result: ResponseDto | null) => {
    const message = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
      result.code === 'DI' ? '이미 사용중인 아이디입니다.' :
      result.code === 'DE' ? '중복된 이메일입니다.' :
      result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
  
    const isSuccess = result && result.code === 'SU'
    if (!isSuccess) {
      alert(message);
      return;
    } 
    navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
  };

//                  event handler                  //

  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setId(value);
    setIdButtonStatus(value !=='');
    setIsIdCheck(false);
    setIdMessage('');
  }

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value)
    const passwordPattern = /^(?=.*[a-zA-Z0-9])(?=.*[0-9]).{8,15}$/;
    const isPassworPattern = passwordPattern.test(value);
    setIsPasswordPattern(isPassworPattern);
    const passwordMessage =
      isPassworPattern ? '':
      value ? '영문, 숫자를 혼용하여 8 ~ 15자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

    const isEqaulPassword = passwordCheck === value
    const passwordCheckMessage = isEqaulPassword ? '': 
      passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);
  }

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPasswordCheck(value);
    const isEqaulPassword = password === value
    const passwordCheckMessage = isEqaulPassword ? '': 
    passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);
  }

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
    setAuthNumberButtonStatus(value !=='');
    setIsAuthNumberCheck(false);  
    setAuthNumberMessage('');
  };

  const onGenderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setGender(value);
    setIsGenderCheck(false);
  };

  const onAgeChangeHandler = (age: string) => {
    setAge(age);
  };

  const onCompanyNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setCompanyName(value);
    setIsCompanyNameCheck(false);
    setCompanyNameMessage('');
  };
  
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setImage(value);
    setIsImageCheck(false);
    setImageMessage('');
  };

  const onIdButtonClickHandler = () => {
    if(!idButtonStatus) return;

    const requsetBody: IdCheckRequestDto = { userId: id };
    idCheckRequest(requsetBody).then(idCheckResponse);
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
    emailAuthRequest(requestBody).then(emailAuthResponse);
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

  const onSignUpButtonClickHandler = () => {
    if(!id || !password || !passwordCheck || !email || !authNumber || !gender || !age) {
      alert('모든 내용을 입력해주세요.')
      return;
    };

    const requestBody: SignUpDesignerRequestDto = {
      userId: id,
      userPassword: password,
      userEmail: email,
      authNumber,
      userAge: age,
      userGender: gender,
      userCompanyName : companyName,
      userImage : image,
      joinPath: 'HOME'
    };
  designerSignUpRequest(requestBody).then(signUpResponse);
  };
//                      render                      //
return (
  <div id='auth-wrapper'>
    <AuthTopBar />
      <div className='auth-under-bar'>
        <div className='auth-left-null'></div>

        <div className='auth-center-value'>
          <div className='auth-sign-up-box'>
            <div className='auth-sign-up-title'>디자이너 회원가입</div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>아이디</div>
              <InputBox type={'text'} value={id} placeholder={'아이디를 입력해주세요'} onChangeHandler={onIdChangeHandler} buttonTitle='중복 확인' buttonStatus={idButtonStatus} onButtonClickHandler={onIdButtonClickHandler} message={idMessage} error={isIdError} />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호</div>
              <InputBox type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호 확인</div>
              <InputBox type={'password'} value={passwordCheck} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일</div>
              <InputBox type={'text'} value={email} placeholder={'이메일 주소를 입력해주세요'} onChangeHandler={onEmailChangeHandler} buttonTitle='보내기' buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError}  />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일인증</div>
              <InputBox type={'text'} value={authNumber} placeholder={'인증번호 4자리를 입력해주세요'} onChangeHandler={onAuthNumberChangeHandler} buttonTitle='확인' buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>성별</div>
            <div className='auth-radio-box'>
              <div className='auth-sign-up-radio-box'>
                <InputBox label={'MALE'} type={'radio'} value={'MALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} />
              </div>
              <div className='auth-sign-up-radio-box'>
                <InputBox label={'FEMALE'} type={'radio'} value={'FEMALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} />
              </div>
            </div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>연령대</div>
            <div>
              <SelectBox value={age} onChange={onAgeChangeHandler} />
            </div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>업체명</div>
            <div><InputBox type={'text'} value={companyName} placeholder={'업체명을 입력해주세요.'} onChangeHandler={onCompanyNameChangeHandler} message={companyNameMessage} error={isCompanyNameError} /></div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>면허증사진</div>
            <div><InputBox type={'file'} value={image} placeholder={''} onChangeHandler={onImageChangeHandler} message={imageMessage} error={isImageError} /></div>
          </div>

          <div className='auth-submit-box'>
            <div className='auth-submit-box auth-primary-button' onClick={onSignUpButtonClickHandler}>가입하기</div>
          </div>
        </div>
      </div>

      <div className='auth-right-null'></div>
      </div>

    </div>
  )
}

//                component                  //
export default function Authentication() {
  //                   render                //
  return (
    <>
    </>
  )
}
