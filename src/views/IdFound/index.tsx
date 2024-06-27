import { ChangeEvent, useState } from 'react';

import {  useAuthSignUp  } from '../../hooks';

import InputBox from 'src/components/Inputbox';
import AuthTopBar from 'src/components/authTopBar';

import { 
    foundIdRequest, 
    emailAuthCheckRequest, 
    foundIdEmailAuthRequest, 
} from 'src/apis/auth';
import { 
    EmailAuthRequestDto, 
    FoundIdCheckRequestDto, 
    EmailAuthCheckRequestDto, 
} from 'src/apis/auth/dto/request';
import { IdFoundResponseDto } from 'src/apis/auth/dto/response';
import ResponseDto from 'src/apis/response.dto';

import "./style.css";
import { EMAILPATTERN } from 'src/constant';

//                          component                           //
export default function IdFound() {

//                          state                           //
    const [success, setSuccess] = useState<boolean>(false);

    const {
        id,
        email,
        authNumber,

        emailMessage,
        authNumberMessage,

        emailButtonStatus,
        authNumberButtonStatus,

        isEmailError,
        isAuthNumberError,

        setId,
        setEmail,
        setAuthNumber,

        setEmailMessage,
        setAuthNumberMessage,
        
        setEmailButtonStatus,
        setAuthNumberButtonStatus,
        
        setIsEmailError,
        setIsAuthNumberError,
    } = useAuthSignUp();

    //                   function                       //
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
        setIsAuthNumberError(authNumberError);
    };

    const foundIdResponse = (result: IdFoundResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
            result.code === 'NE' ? '존재하지 않는 이메일 입니다.' :
            result.code === 'NI' ? '존재하지 않는 아이디 입니다.' :
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

//                          event handler                           //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        setEmailButtonStatus(value !== '');
        setEmailMessage('');
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setAuthNumberButtonStatus(value !== '');
        setAuthNumberMessage('');
    };

    const onEmailButtonClickHandler = () => {
        if (!emailButtonStatus) return;

    const emailPattern = EMAILPATTERN;
    const isEmailPattern = emailPattern.test(email);
        if (!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setIsEmailError(true);
            return;
        }

    const requestBody: EmailAuthRequestDto = { userEmail: email };
        foundIdEmailAuthRequest(requestBody).then(emailAuthResponse);
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

    const onFoundIdButtonClickHandler = () => {
        if (!email || !authNumber) {
            alert('모든 내용을 입력해주세요.')
            return;
        };

        const requestBody: FoundIdCheckRequestDto = {
            userEmail: email,
            authNumber
        };
        foundIdRequest(requestBody).then(foundIdResponse);
    };

//                          render                          //
    return (
    <div id='auth-wrapper' className='found-wrapper'>
        <AuthTopBar />
        <div className='auth-under-bar'>
            <div className='auth-left-null'></div>
            <div className='auth-center-value'>
                <div className='auth-found-box'>
                    <div className='auth-sign-up-title'>아이디 찾기</div>
                    <div className='auth-sign-up-box-text'>
                        <div className='auth-sign-up-text'>이메일</div>
                        <InputBox 
                            type={'text'} 
                            value={email} 
                            placeholder={'이메일 주소를 입력해주세요'} 
                            onChangeHandler={onEmailChangeHandler} 
                            buttonTitle='이메일 인증' 
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
                            buttonTitle='인증 확인' 
                            buttonStatus={authNumberButtonStatus} 
                            onButtonClickHandler={onAuthNumberButtonClickHandler} 
                            message={authNumberMessage} 
                            error={isAuthNumberError} />
                    </div>
                    <div className='auth-submit-box'>
                        <div className='auth-submit-box user-primary-button' onClick={onFoundIdButtonClickHandler}>확인</div>
                    </div>
                    {success && <div className='is-user-id'>아이디는 {id} 입니다.</div>}
                </div>
            </div>
            <div className='auth-right-null'></div>
        </div>
    </div>
    )
}