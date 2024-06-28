import { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';

import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, CHANGE_PASSWORD_ABSOLUTE_PATH } from 'src/constant';

import InputBox from 'src/components/Inputbox';

import { ChangePasswordRequestDto, } from 'src/apis/user/dto/request';
import { changePasswordRequest, } from 'src/apis/user';
import ResponseDto from 'src/apis/response.dto';

import "./style.css";

//                          component                          //
export default function PasswordChangePage() {

//                          state                          //
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [passwordChange, setPasswordChange] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

    const [isPasswordPattern, setIsPasswordPattern] = useState<boolean>(false);
    const [isEqaulPassword, setIsEqaulPassword] = useState<boolean>(false);

    const { userPassword } = useParams();
    
    const [cookies] = useCookies();

//                          function                          //
    const navigator = useNavigate();

    const passwordChangeResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력형식이 맞지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccess = result && result.code === 'SU'
            if (!isSuccess) {
                alert(message);
                return;
        }
        if (passwordChange !== passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.')
            return;
        }
    };

//                          event handler                          //
    const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordChange(value);
        
        const passwordPattern = /^(?=.*[a-zA-Z0-9])(?=.*[0-9]).{8,15}$/;
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
    }

    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);

    const isEqaulPassword = passwordChange === value
        const passwordCheckMessage = isEqaulPassword ? '' :
        passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
        setIsEqaulPassword(isEqaulPassword);
        setPasswordCheckMessage(passwordCheckMessage);
    }

    const onChangePasswordButtonClickHandler = () => {
        if (!cookies.accessToken) return;
        if (!passwordChange || !passwordCheck) {
            alert('모든 내용을 입력해주세요.')
            navigator(CHANGE_PASSWORD_ABSOLUTE_PATH);
        return;
    };

    const requestBody: ChangePasswordRequestDto = {
        userPassword: passwordChange
    };

    changePasswordRequest(requestBody, cookies.accessToken).then(passwordChangeResponse);
    alert('비밀번호가 변경되었습니다.')
    navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    };

//                          render                          //
    return (
        <div id='change-wrapper'>
            <div className='change-center-value'>
                <div className='change-sign-up-box'>
                    <div className='info-sub-title'>비밀번호 재설정</div>
                    <div className='change-sign-up-box-text'>
                        <div className='change-sign-up-text'>현재 비밀번호</div>
                        <InputBox type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordHandler} />
                        <div className='change-sign-up-text'>새 비밀번호</div>
                        <InputBox type={'password'} value={passwordChange} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
                        <div className='change-sign-up-text'>새 비밀번호 확인</div>
                        <InputBox type={'password'} value={passwordCheck} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />
                    </div>
                    <div className='submit-box'>
                        <div className='change-submit-box user-primary-button' onClick={onChangePasswordButtonClickHandler}>확인</div>
                    </div>
                </div>
            </div>
        </div>
    )
}