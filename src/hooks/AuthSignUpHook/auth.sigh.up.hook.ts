import { ChangeEvent, useState } from "react";
import { emailAuthCheckRequest, emailAuthRequest, idCheckRequest } from "src/apis/auth";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto } from "src/apis/auth/dto/request";
import ResponseDto from "src/apis/response.dto";
import { useSnsStore } from "src/stores";

const useAuthSignUp = () => {

//state//
  const { snsId, joinPath, setValue } = useSnsStore();

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

//function//

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
      result.code === 'VF' ? '발송된 인증번호를 입력해주세요.' :
      result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.':
      result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
    const authNumberCheck = result !== null && result.code === 'SU';
    const authNumberError = !authNumberCheck;
  
    setAuthNumberMessage(authNumberMessage);
    setIsAuthNumberCheck(authNumberCheck);
    setIsAuthNumberError(authNumberError);
  };


  // event handeler
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

  return{
    id,
    password,
    passwordCheck,
    email,
    authNumber,
    gender,
    age,
    companyName,
    image,
    joinPath,
    snsId,

    setId,
    setEmail,
    setAuthNumber,

    idMessage,
    passwordMessage,
    passwordCheckMessage,
    emailMessage,
    authNumberMessage,
    companyNameMessage,
    imageMessage,

    setIdMessage,
    setEmailMessage,
    setAuthNumberMessage,

    idButtonStatus,
    emailButtonStatus,
    authNumberButtonStatus,

    setEmailButtonStatus,
    setAuthNumberButtonStatus,
    
    setIsIdCheck,
    setIsEmailCheck,
    setIsAuthNumberCheck,

    isIdError,
    isEmailError,
    isAuthNumberError,

    setIsIdError,
    setIsEmailError,
    setIsAuthNumberError,

    onIdChangeHandler,
    onPasswordChangeHandler,
    onPasswordCheckChangeHandler,
    onEmailChangeHandler,
    onAuthNumberChangeHandler,
    onGenderChangeHandler,
    onAgeChangeHandler,
    onCompanyNameChangeHandler,
    onImageChangeHandler,
    
    onIdButtonClickHandler,
    onEmailButtonClickHandler,
    onAuthNumberButtonClickHandler,
  };
}
export default useAuthSignUp;