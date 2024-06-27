import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';

import { useSnsStore } from 'src/stores';
import useAuthSignUp from "../../hooks/auth.sign.up.hook";

import InputBox from 'src/components/Inputbox';
import SelectBox from 'src/components/Selectbox';
import AuthTopBar from 'src/components/authTopBar';

import { 
    signInRequest, 
    customerSignUpRequest, 
    designerSignUpRequest
} from 'src/apis/auth';
import { 
    SignInRequestDto, 
    SignUpCustomerRequestDto, 
    SignUpDesignerRequestDto 
} from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { SignInResponseDto } from 'src/apis/auth/dto/response';

import { 
    LOCALHOST,
    ID_FOUND_ABSOLUTE_PATH, 
    AUTH_SIGN_IN_ABSOLUTE_PATH, 
    PASSWORD_FOUND_ABSOLUTE_PATH, 
    AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH, 
    AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH, 
    ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH,
} from 'src/constant';

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

//                          component                           //
export function Sns() {

//                          state                           //
    const [cookies, setCookie] = useCookies();
    const { accessToken, expires } = useParams();

//                          function                            //
    const navigator = useNavigate();

//                          effect                          //
    useEffect(() => {
        if (!accessToken || !expires) return;
        const expiration = new Date(Date.now() + (Number(expires) * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires: expiration });

        navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
        }, []);
//                          render                          //
    return <></>;
}

//                          component                           //
export function SignIn() {

//                          state                           //
    const [cookies, setCookie] = useCookies();

    const [id, setId] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [password, setPassword] = useState<string>('');

//                          function                            //
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

//                          event handler                           //
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
    window.location.href = LOCALHOST + type;
    };

    const onClickIdFoundHandler = () => navigator(ID_FOUND_ABSOLUTE_PATH);
    const onClickPasswordFoundHandler = () => navigator(PASSWORD_FOUND_ABSOLUTE_PATH);

//                          render                          //
    return (
        <div id='auth-wrapper'>
            <AuthTopBar />
            <div className='auth-under-value'>
                <div className='sign-in-main-box'>
                    <div className='login-image-box'></div>
                    <div className='login-box'>
                        <div className='login-container'>
                            <div className='login-page-title'>로그인 페이지</div>
                            <div className='sign-in-contents'>
                                <div className='auth-sign-up-box-text'>
                                    <div className='auth-sign-up-text'>아이디</div>
                                    <InputBox 
                                        type={'text'} 
                                        value={id} 
                                        placeholder={'아이디를 입력해주세요'} 
                                        onChangeHandler={onIdChangeHandler} />
                                </div>
                                <div className='auth-sign-up-box-text'>
                                    <div className='auth-sign-up-text'>비밀번호</div>
                                    <InputBox 
                                        label='' 
                                        type={'password'} 
                                        value={password} 
                                        placeholder={'비밀번호를 입력해주세요'} 
                                        onChangeHandler={onPasswordChangeHandler} 
                                        onKeydownHandler={onPasswordKeydownHandler} 
                                        message={message} 
                                        error />
                                </div>
                                <div className='auth-submit-box'>
                                    <div className='auth-submit-box user-primary-button' onClick={onSignInButtonClickHandler}>로그인</div>
                                </div>
                                <div className='socal-login'>
                                    <div className='kakao-login' onClick={() => onSnsButtonClickHandler('kakao')}></div>
                                    <div className='naver-login' onClick={() => onSnsButtonClickHandler('naver')}></div>
                                </div>
                                <div className="short-divider"></div>
                                <div className='user-found'>
                                    <div className='auth-sign-up-text cursor-pointer' onClick={onClickIdFoundHandler}>아이디 찾기</div>
                                    <div className='auth-sign-up-text cursor-pointer' onClick={onClickPasswordFoundHandler}>비밀번호 찾기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='login-under-right-bar'></div>
                </div>
            </div>
        </div>
    )
}

//                          component                           //
export function ChooseSingUp() {

//                          state                           //
const [ params ] = useSearchParams();
    const { snsId, joinPath, setValue } = useSnsStore();

//                          function                            //
    const navigator = useNavigate();

//                          event handler                           //
    const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
        window.location.href = LOCALHOST + type;
    };

    const onClickCustomerSignUpHandler = () => navigator(AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH);
    const onClickDesignerSignUpHandler = () => navigator(AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH);

//                          effect                          //
    useEffect(() => {
        const snsId = params.get('snsId');
        const joinPath = params.get('joinPath');
        if (!snsId || !joinPath) {
            setValue('', '');
            return;
        }
        setValue(snsId, joinPath);
    }, [params])

//                          render                          //
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
                <div onClick={onClickCustomerSignUpHandler}>고객</div>
                <div onClick={onClickDesignerSignUpHandler}>디자이너</div>
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

//                          component                           //
export function CustomerSignUp() {

//                          state                           //
    const {
        id,
        age,
        email,
        snsId,
        gender,
        joinPath,
        password,
        authNumber,
        passwordCheck,

        idMessage,
        emailMessage,
        passwordMessage,
        authNumberMessage,
        passwordCheckMessage,

        idButtonStatus,
        emailButtonStatus,
        authNumberButtonStatus,

        isIdError,
        isEmailError,
        isAuthNumberError,

        onIdChangeHandler,
        onAgeChangeHandler,
        onEmailChangeHandler,
        onGenderChangeHandler,
        onPasswordChangeHandler,
        onAuthNumberChangeHandler,
        onPasswordCheckChangeHandler,

        onIdButtonClickHandler,
        onEmailButtonClickHandler,
        onAuthNumberButtonClickHandler,
    } = useAuthSignUp();

//                          function                            //
    const navigator = useNavigate();

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

//                          event handler                           //
    const onSignUpButtonClickHandler = () => {
        if(!id || !password || !passwordCheck || !email || !authNumber || !gender || !age) {
            alert('모든 내용을 입력해주세요.')
            return;
        };

        const requestBody: SignUpCustomerRequestDto = {
            userId: id,
            authNumber,
            userAge: age,
            userEmail: email,
            userGender: gender,
            userPassword: password,
            snsId: snsId ? snsId : undefined,
            joinPath: joinPath ? joinPath : 'HOME',
        };
        customerSignUpRequest(requestBody).then(signUpResponse);
    };

//                          render                          //
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
                            <InputBox 
                                type={'text'} 
                                value={id} 
                                placeholder={'아이디를 입력해주세요'} 
                                onChangeHandler={onIdChangeHandler} 
                                buttonTitle='중복 확인' 
                                buttonStatus={idButtonStatus} 
                                onButtonClickHandler={onIdButtonClickHandler} 
                                message={idMessage} 
                                error={isIdError} />
                        </div>
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
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>성별</div>
                            <div className='auth-radio-box'>
                                <div className='auth-sign-up-radio-box'>
                                    <InputBox 
                                        label={'MALE'} 
                                        type={'radio'} 
                                        value={'MALE'} 
                                        name={'gender'} 
                                        onChangeHandler={onGenderChangeHandler} 
                                        checked={gender === 'MALE'} />
                                </div>
                                <div className='auth-sign-up-radio-box'>
                                    <InputBox 
                                        label={'FEMALE'} 
                                        type={'radio'} 
                                        value={'FEMALE'} 
                                        name={'gender'} 
                                        onChangeHandler={onGenderChangeHandler} 
                                        checked={gender === 'FEMALE'} />
                                </div>
                            </div>
                        </div>
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>연령대</div>
                            <div>
                                <SelectBox value={age} onChange={onAgeChangeHandler} />
                            </div>
                        </div>
                        <div className='sign-up-submit-box'>
                            <div className='user-primary-button' onClick={onSignUpButtonClickHandler}>가입하기</div>
                        </div>
                    </div>
                </div>
                <div className='auth-right-null'></div>
            </div>
        </div>
    )
}

//                          component                           //
export function DesignerSignUp() {

//                          state                           //
    const {
        id,
        age,
        email,
        snsId,
        image,
        gender,
        password,
        joinPath,
        authNumber,
        companyName,
        passwordCheck,

        idMessage,
        emailMessage,
        imageMessage,
        passwordMessage,
        authNumberMessage,
        companyNameMessage,
        passwordCheckMessage,

        idButtonStatus,
        emailButtonStatus,
        authNumberButtonStatus,

        isIdError,
        isEmailError,
        isAuthNumberError,

        onIdChangeHandler,
        onAgeChangeHandler,
        onEmailChangeHandler,
        onImageChangeHandler,
        onGenderChangeHandler,
        onPasswordChangeHandler,
        onAuthNumberChangeHandler,
        onCompanyNameChangeHandler,
        onPasswordCheckChangeHandler,

        onIdButtonClickHandler,
        onEmailButtonClickHandler,
        onAuthNumberButtonClickHandler,
    } = useAuthSignUp();

//                          function                            //
    const navigator = useNavigate();

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

//                          event handler                           //
    const onSignUpButtonClickHandler = () => {
        if(!id || !password || !passwordCheck || !email || !authNumber || !gender || !age) {
        alert('모든 내용을 입력해주세요.')
        return;
        };

        const requestBody: SignUpDesignerRequestDto = {
            authNumber,
            userId: id,
            userAge: age,
            userEmail: email,
            userImage : image,
            userGender: gender,
            userPassword: password,
            userCompanyName : companyName,
            snsId: snsId ? snsId : undefined,
            joinPath: joinPath ? joinPath : 'HOME',
        };
    
        designerSignUpRequest(requestBody).then(signUpResponse);
    };

//                          render                          //
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
                            <InputBox 
                                type={'text'} 
                                value={id} 
                                placeholder={'아이디를 입력해주세요'} 
                                onChangeHandler={onIdChangeHandler} 
                                buttonTitle='중복 확인' 
                                buttonStatus={idButtonStatus} 
                                onButtonClickHandler={onIdButtonClickHandler} 
                                message={idMessage} 
                                error={isIdError} />
                        </div>
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
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>성별</div>
                            <div className='auth-radio-box'>
                                <div className='auth-sign-up-radio-box'>
                                    <InputBox 
                                        label={'MALE'} 
                                        type={'radio'} 
                                        value={'MALE'} 
                                        name={'gender'} 
                                        onChangeHandler={onGenderChangeHandler} />
                                </div>
                                <div className='auth-sign-up-radio-box'>
                                    <InputBox 
                                        label={'FEMALE'} 
                                        type={'radio'} 
                                        value={'FEMALE'} 
                                        name={'gender'} 
                                        onChangeHandler={onGenderChangeHandler} />
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
                            <InputBox 
                                type={'text'} 
                                value={companyName} 
                                placeholder={'업체명을 입력해주세요.'} 
                                onChangeHandler={onCompanyNameChangeHandler} 
                                message={companyNameMessage} />
                        </div>
                        <div className='auth-sign-up-box-text'>
                            <div className='auth-sign-up-text'>면허증사진</div>
                            <InputBox 
                                type={'file'} 
                                value={image} 
                                placeholder={''} 
                                onChangeHandler={onImageChangeHandler} 
                                message={imageMessage} />
                        </div>
                        <div className='sign-up-submit-box'>
                            <div className='user-primary-button' onClick={onSignUpButtonClickHandler}>가입하기</div>
                        </div>
                    </div>
                </div>
                <div className='auth-right-null'></div>
            </div>
        </div>
    )
}

//                          component                          //
export default function Authentication() {

    //                          render                          //
    return (
    <>
    </>
    )
}
