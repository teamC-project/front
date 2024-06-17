import React, { ChangeEvent, useState } from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import { useNavigate } from 'react-router';
import { AUTH_PASSOWORD_RESET_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import ResponseDto from 'src/apis/response.dto';
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto,
  SetUpPasswordRequestDto } from 'src/apis/auth/dto/request';
import { emailAuthCheckRequest, foundPasswordEmailAuthRequest, foundPasswordUserCheckRequest, idCheckRequest, setUpPasswordRequest } from 'src/apis/auth';
import AuthTopBar from 'src/components/authTopBar';
import { ChangePasswordRequestDto, PasswordChangeRequestDto } from 'src/apis/user/dto/request';
import { changePasswordRequest, setUpChangePasswordRequest } from 'src/apis/user';

let globalPassword = '';

export function ChangePassword() {
  //                      state                     //

  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const [isPasswordPattern, setIsPasswordPattern] = useState<boolean>(false);
  const [isEqaulPassword, setIsEqaulPassword] = useState<boolean>(false);

  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

  //                     function                     //
  const navigator = useNavigate();

  const passwordSetupResponse = (result: ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccess = result && result.code === 'SU'
    if (!isSuccess) {
      alert(message);
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return;
    }
    globalPassword = password;
    navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
  };

  //                    event handler                  //

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value)
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/;
    const isPassworPattern = passwordPattern.test(value);
    setIsPasswordPattern(isPassworPattern);
    const passwordMessage =
      isPassworPattern ? '' :
        value ? '영문, 숫자를 혼용하여 8 ~ 15자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

    const isEqaulPassword = passwordCheck === value
    const passwordCheckMessage = isEqaulPassword ? '' :
      passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);
  };

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordCheck(value);
    const isEqaulPassword = password === value
    const passwordCheckMessage = isEqaulPassword ? '' :
      passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);
  };


  const onSetUpPasswordButtonClickHandler = () => {
    if (!password || !passwordCheck) {
      alert('모든 내용을 입력해주세요.')

      return;
    };

    const requestBody: ChangePasswordRequestDto = {
      userPassword: globalPassword
    };
    changePasswordRequest(requestBody).then(passwordSetupResponse);
  };


  //                   render                        //
  return (
    <div id='auth-wrapper'>

      <div className='auth-under-bar'>
        <div className='auth-left-null'></div>

        <div className='auth-center-value'>
          <div className='auth-sign-up-box'>
            <div className='auth-sign-up-title'>비밀번호 재설정</div>

            <div className='auth-sign-up-box-text'>
              <div className='auth-sign-up-text'>비밀번호</div>
              <InputBox type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
            </div>

            <div className='auth-sign-up-box-text'>
              <div className='auth-sign-up-text'>비밀번호 확인</div>
              <InputBox type={'password'} value={passwordCheck} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />
            </div>

            <div className='auth-submit-box'>
              <div className='auth-submit-box auth-primary-button' onClick={onSetUpPasswordButtonClickHandler}>비밀번호 변경</div>
            </div>
          </div>
        </div>

        <div className='auth-right-null'></div>
      </div>

    </div>
  )
}

//                component               //
export default function PasswordChangePage() {
  //                  state                //

  const [password, setPassword] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const [passwordButtonStatus, setPasswordButtonStatus] = useState<boolean>(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  //                  function                 //
  const navigator = useNavigate();

  const passwordCheckResponse = (result: ResponseDto | null) => {
    const passwordMessage =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '비밀번호는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
          result.code === 'NP' ? '존재하지 않는 비밀번호 입니다.' :
            result.code === 'DBE' ? '서버에 접근할 수 없습니다.' :
              result.code === 'SU' ? '사용 가능한 비밀번호입니다.' : '';

    const passwordError = !(result && result.code === 'SU')
    const passwordCheck = !passwordError;

    setPasswordMessage(passwordMessage);
    setIsPasswordError(passwordError);
    setIsPasswordCheck(passwordCheck);
  };

  const passwordChangeResponse = (result: ResponseDto | null) => {
    const message =
    !result ? '서버에 문제가 있습니다.' :
    result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
    result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
    result.code === 'DBEE' ? '서버에 문제가 있습니다.' : '' ;

    const isSuccess =result && result.code === 'SU'
    if (!isSuccess) {
      alert(message);
      return;
    }
    globalPassword = password;
    navigator(AUTH_PASSOWORD_RESET_ABSOLUTE_PATH);
  }

  //                event handler               //

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value);
    setPasswordButtonStatus(value !=='');
    setIsPasswordCheck(false);
    setPasswordMessage('');
  }

  const onPasswordButtonClickHandler = () => {
    if(!passwordButtonStatus) return;
  };  

  const onChangePasswordButtonClickHandler = () => {
    if(!password) {
      alert('비밀번호를 입력해주세요.')
      return;
    };

    const requestBody: PasswordChangeRequestDto = {
      userPassword: password
      };
    changePasswordRequest(requestBody).then(passwordChangeResponse);
  };


  //                      render                     //
  return (
    <div id='auth-wrapper'>
<div className='auth-under-bar'>
    <div className='auth-left-null'></div>
  
    <div  className='auth-center-value'>
    <div className='auth-sign-up-box'>
      <div className='auth-sign-up-title'>비밀번호 재설정</div>
  
      <div className='auth-sign-up-box-text'>

            <div className='auth-sign-up-text'>비밀번호</div>
              <InputBox type={'text'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} buttonTitle='비밀번호 확인' buttonStatus={passwordButtonStatus} onButtonClickHandler={onPasswordButtonClickHandler} message={passwordMessage} error={isPasswordError} />
          </div>

          <div className='auth-submit-box'>
            <div className='auth-submit-box auth-primary-button' onClick={onChangePasswordButtonClickHandler}>확인</div>
          </div>
        </div>
    </div>
  
    <div className='auth-right-null'></div>
  </div>
  
  </div>
    )
}