import { ChangeEvent, useState } from "react";

import { useSnsStore } from "src/stores";

import ResponseDto from "src/apis/response.dto";
import { 
    idCheckRequest, 
    emailAuthRequest, 
    emailAuthCheckRequest, 
} from "src/apis/auth";

import { 
    IdCheckRequestDto, 
    EmailAuthRequestDto, 
    EmailAuthCheckRequestDto, 
} from "src/apis/auth/dto/request";
import { EMAILPATTERN, PASSWORDPATTERN } from "src/constant";

const useAuthSignUp = () => {

//                          state                           //
    const { snsId, joinPath} = useSnsStore();

    const [id, setId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    const [age, setAge] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');

    const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    const [idMessage, setIdMessage] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [imageMessage, setImageMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [companyNameMessage, setCompanyNameMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

    const [isIdError, setIsIdError] = useState<boolean>(false);
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isAuthNumberError, setIsAuthNumberError] = useState<boolean>(false);

//                          function                            //
    const idCheckResponse = (result: ResponseDto | null) => {
        const idMessage = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
            result.code === 'DI' ? '이미 사용중인 아이디 입니다.' :
            result.code === 'DBE' ? '서버에 접근할 수 없습니다.' :
            result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';

        const idError = !(result && result.code === 'SU');

        setIdMessage(idMessage);
        setIsIdError(idError);
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
        setIsEmailError(emailError);
    };

    const emailAuthCheckResponse = (result: ResponseDto | null) => {
        const authNumberMessage =
            !result ? '서버에 문제가 있습니다.':
            result.code === 'VF' ? '발송된 인증번호를 입력해주세요.' :
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.':
            result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';

        const authNumberCheck = result !== null && result.code === 'SU';
        const authNumberError = !authNumberCheck;

        setAuthNumberMessage(authNumberMessage);
        setIsAuthNumberError(authNumberError);
    };

//                    event handler                  //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        const idPattern = /^[a-zA-Z0-9]*$/;
        const minLength = 8;
        const maxLength = 15;

        setId(value);

        if (value.length === 0) {
            setIdMessage('');
            setIdButtonStatus(false);
        return;
        }

        if (!idPattern.test(value)) {
            setIdMessage('아이디는 영문자와 숫자만 사용할 수 있습니다. 공백 및 특수문자는 사용할 수 없습니다.');
            setIdButtonStatus(false);
        } else if (value.length < minLength || value.length > maxLength) {
            setIdMessage(`아이디는 ${minLength}자에서 ${maxLength}자 사이여야 합니다.`);
            setIdButtonStatus(false);
        } else {
            setIdMessage('');
            setIdButtonStatus(true);
        }
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPassword(value)
        const passwordPattern = PASSWORDPATTERN;
        const isPassworPattern = passwordPattern.test(value);
        const passwordMessage =
            isPassworPattern ? '':
            value ? '영문, 숫자를 혼용하여 8 ~ 15자 입력해주세요.' : '';

        setPasswordMessage(passwordMessage);

        const isEqaulPassword = passwordCheck === value
        const passwordCheckMessage = isEqaulPassword ? '':
            passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';

        setPasswordCheckMessage(passwordCheckMessage);
    };

    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPasswordCheck(value);
        const isEqaulPassword = password === value
        const passwordCheckMessage = isEqaulPassword ? '':
            passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
        setPasswordCheckMessage(passwordCheckMessage);
    };

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setEmail(value);
        setEmailButtonStatus(value !=='');
        setEmailMessage('');
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setAuthNumber(value);
        setAuthNumberButtonStatus(value !=='');
        setAuthNumberMessage('');
    };

    const onGenderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    const onAgeChangeHandler = (age: string) => {
        setAge(age);
    };

    const onCompanyNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setCompanyName(value);
        setCompanyNameMessage('');
    };

    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setImage(value);
        setImageMessage('');
    };

    const onIdButtonClickHandler = () => {
        if(!idButtonStatus) return;

        const requsetBody: IdCheckRequestDto = { userId: id };
        idCheckRequest(requsetBody).then(idCheckResponse);
    };  

    const onEmailButtonClickHandler = () => {
        if(!emailButtonStatus) return;

        const emailPattern = EMAILPATTERN;
        const isEmailPattern = emailPattern.test(email);
        if(!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setIsEmailError(true);
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
//                          render                           //
    return{
        id,
        age,
        image,
        email,
        snsId,
        gender,
        password,
        joinPath,
        authNumber,
        companyName,
        passwordCheck,
        
        setId,
        setEmail,
        setAuthNumber,

        idMessage,
        emailMessage,
        imageMessage,
        passwordMessage,
        authNumberMessage,
        companyNameMessage,
        passwordCheckMessage,

        setIdMessage,
        setEmailMessage,
        setAuthNumberMessage,

        idButtonStatus,
        emailButtonStatus,
        authNumberButtonStatus,

        setEmailButtonStatus,
        setAuthNumberButtonStatus,

        isIdError,
        isEmailError,
        isAuthNumberError,

        setIsIdError,
        setIsEmailError,
        setIsAuthNumberError,

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
    };
}
export default useAuthSignUp;