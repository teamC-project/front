import { ChangeEvent, useState } from 'react';

import { useNavigate } from 'react-router';

import InputBox from 'src/components/Inputbox';
import AuthTopBar from 'src/components/authTopBar';

import { 
    setUpPasswordRequest, 
    emailAuthCheckRequest, 
    foundPosswordIdCheckRequest, 
    foundPasswordEmailAuthRequest, 
    foundPasswordUserCheckRequest, 
} from 'src/apis/auth';
import { 
    EmailAuthRequestDto, 
    PasswordResetRequestDto, 
    SetUpPasswordRequestDto, 
    EmailAuthCheckRequestDto, 
    FoundPasswordIdCheckRequestDto, 
} from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';

import { AUTH_PASSOWORD_RESET_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH, EMAILPATTERN, PASSWORDPATTERN } from 'src/constant';

import "./style.css";

let globalId = '';

//                          component                           //
export function SettingPassword() {

//                          state                           //
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    const [isPasswordPattern, setIsPasswordPattern] = useState<boolean>(false);
    const [isEqaulPassword, setIsEqaulPassword] = useState<boolean>(false);

    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

//                          function                            //
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
        navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    };

//                          event handler                           //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value)
        const passwordPattern = PASSWORDPATTERN;
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

    const requestBody: SetUpPasswordRequestDto = {
        userId: globalId,
        userPassword: password
    };
    setUpPasswordRequest(requestBody).then(passwordSetupResponse);
    };

//                          render                          //
    return (
        <div id='auth-wrapper'>
            <AuthTopBar />
            <div className='auth-under-bar'>
                <div className='auth-left-null'></div>
                <div className='auth-center-value'>
                    <div className='auth-found-box'>
                        <div className='auth-sign-up-title'>비밀번호 재설정</div>
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>비밀번호</div>
                            <InputBox 
                                type={'password'} 
                                value={password} 
                                placeholder={'비밀번호를 입력해주세요'} 
                                onChangeHandler={onPasswordChangeHandler} 
                                message={passwordMessage} 
                                error />
                        </div>
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>비밀번호 확인</div>
                            <InputBox 
                                type={'password'} 
                                value={passwordCheck} 
                                placeholder={'비밀번호를 입력해주세요'} 
                                onChangeHandler={onPasswordCheckChangeHandler} 
                                message={passwordCheckMessage} 
                                error />
                        </div>
                        <div className='auth-submit-box'>
                            <div className='auth-submit-box user-primary-button' onClick={onSetUpPasswordButtonClickHandler}>비밀번호 변경</div>
                        </div>
                    </div>
                </div>
                <div className='auth-right-null'></div>
            </div>
        </div>
    )
}

//                          component                           //
export default function PasswordFoundPage() {

//                          state                           //
    const [success, setSuccess] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');

    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);

    const [isIdCheck, setIsIdCheck] = useState<boolean>(false);
    const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
    const [isAuthNumberCheck, setIsAuthNumberCheck] = useState<boolean>(false);

    const [idMessage, setIdMessage] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [isIdError, setIsIdError] = useState<boolean>(false);
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isAuthNumberError, setIsAuthNumberError] = useState<boolean>(false);

//                          function                            //
    const navigator = useNavigate();

    const idCheckResponse = (result: ResponseDto | null) => {
        const idMessage =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
            result.code === 'NI' ? '존재 하지 않는 아이디 입니다.' :
            result.code === 'DBE' ? '서버에 접근할 수 없습니다.' :
            result.code === 'SU' ? '존재하는 아이디 입니다.' : '';
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
            result.code === 'NE' ? '존재하지 않는 이메일입니다.' :
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
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '인증번호를 입력해주세요.' :
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' :
            result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
        const authNumberCheck = result !== null && result.code === 'SU';
        const authNumberError = !authNumberCheck;

        setAuthNumberMessage(authNumberMessage);
        setIsAuthNumberCheck(authNumberCheck);
        setIsAuthNumberError(authNumberError);
    };

    const passwordFoundResponse = (result: ResponseDto | null) => {
    const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
        result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccess = result && result.code === 'SU'
        if (!isSuccess) {
            alert(message);
            return;
        }
        globalId = id;
        navigator(AUTH_PASSOWORD_RESET_ABSOLUTE_PATH);
    };

//                          event handler                           //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
        setIdButtonStatus(value !== '');
        setIsIdCheck(false);
        setIdMessage('');
    }

    const onIdButtonClickHandler = () => {
        if (!idButtonStatus) return;

        const requsetBody: FoundPasswordIdCheckRequestDto = { userId: id };
        foundPosswordIdCheckRequest(requsetBody).then(idCheckResponse);
    };

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        setEmailButtonStatus(value !== '');
        setIsEmailCheck(false);
        setIsAuthNumberCheck(false);
        setEmailMessage('');
    }

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setAuthNumberButtonStatus(value !== '');
        setIsAuthNumberCheck(false);
        setAuthNumberMessage('');
    };

    const onEmailButtonClickHandler = () => {
        if (!emailButtonStatus) return;

        const emailPattern = EMAILPATTERN;
        const isEmailPattern = emailPattern.test(email);
        if (!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setIsEmailError(true);
            setIsEmailCheck(false);
            return;
        }
        const requestBody: EmailAuthRequestDto = { userEmail: email };
        foundPasswordEmailAuthRequest(requestBody).then(emailAuthResponse);
    };

    const onAuthNumberButtonClickHandler = () => {
        if (!authNumberButtonStatus) return;
        if (!authNumber) return;

        const requsetBody: EmailAuthCheckRequestDto = {
            userEmail: email,
            authNumber
        };
        emailAuthCheckRequest(requsetBody).then(emailAuthCheckResponse);
    };

    const onFoundPasswordButtonClickHandler = () => {
        if (!id || !email || !authNumber) {
            alert('모든 내용을 입력해주세요.')
            return;
        };

        const requestBody: PasswordResetRequestDto = {
            userId: id,
            userEmail: email,
            authNumber
        };
        foundPasswordUserCheckRequest(requestBody).then(passwordFoundResponse);
    };

//                          render                          //
    return (
        <div id='auth-wrapper'>
            <AuthTopBar />
            <div className='auth-under-bar'>
                <div className='auth-left-null'></div>
                <div className='auth-center-value'>
                    <div className='auth-found-box'>
                        <div className='auth-sign-up-title'>비밀번호 찾기</div>
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>아이디</div>
                            <InputBox 
                                type={'text'} 
                                value={id} 
                                placeholder={'아이디를 입력해주세요'} 
                                onChangeHandler={onIdChangeHandler} 
                                buttonTitle='아이디 확인' 
                                buttonStatus={idButtonStatus} 
                                onButtonClickHandler={onIdButtonClickHandler} 
                                message={idMessage} 
                                error={isIdError} />
                        </div>
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>이메일</div>
                            <InputBox 
                                type={'text'} 
                                value={email} 
                                placeholder={'이메일 주소를 입력해주세요'} 
                                onChangeHandler={onEmailChangeHandler} 
                                buttonTitle='보내기' 
                                buttonStatus={emailButtonStatus} 
                                onButtonClickHandler={onEmailButtonClickHandler} 
                                message={emailMessage} 
                                error={isEmailError} />
                        </div>
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>이메일인증</div>
                            <InputBox 
                                type={'text'} 
                                value={authNumber} 
                                placeholder={'인증번호 4자리를 입력해주세요'} 
                                onChangeHandler={onAuthNumberChangeHandler} 
                                buttonTitle='확인' 
                                buttonStatus={authNumberButtonStatus} 
                                onButtonClickHandler={onAuthNumberButtonClickHandler} 
                                message={authNumberMessage} 
                                error={isAuthNumberError} />
                        </div>
                        <div className='auth-submit-box'>
                            <div className='auth-submit-box user-primary-button' onClick={onFoundPasswordButtonClickHandler}>확인</div>
                        </div>
                    </div>
                </div>
                <div className='auth-right-null'></div>
            </div>
        </div>
    )
}