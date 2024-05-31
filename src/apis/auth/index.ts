import axios from "axios";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, FoundIdCheckRequestDto, IdCheckRequestDto, PasswordResetRequestDto, SetUpPasswordRequestDto, SignInRequestDto, SignUpCustomerRequestDto, SignUpDesignerRequestDto } from "./dto/request";
import { CUSTOMER_SIGN_UP_URL, DESIGNER_SIGN_UP_URL, EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, FOUND_ID_EMAIL_AUTH_URL, FOUND_ID_URL, FOUND_PASSWORD_PATH, ID_CHECK_REQUEST_URL, RESET_PASSOWORD_PATH, SIGN_IN_REQUEST_URL } from "src/constant";
import { IdFoundResponseDto, SignInResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";
import { requestErrorHandler, requestHandler } from "..";

// function: 로그인 API 함수
export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios.post(SIGN_IN_REQUEST_URL, requestBody)
    .then(requestHandler<SignInResponseDto>)
    .catch(requestErrorHandler);
  return result;
};

//  function: 아이디 중복 확인 API 함수
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
  const result = await axios.post(ID_CHECK_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 이메일 인증 API 함수
export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
  const result = await axios.post(EMAIL_AUTH_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 아이디 찾기 이메일 인증 API 함수
export const foundIdEmailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
  const result = await axios.post(FOUND_ID_EMAIL_AUTH_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 이메일 인증 확인 API 함수
export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
  const result = await axios.post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 고객 회원가입 API 함수
export const customerSignUpRequest = async (requestBody: SignUpCustomerRequestDto) => {
  const result = await axios.post(CUSTOMER_SIGN_UP_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 디자이너 회원가입 API 함수
export const designerSignUpRequest = async (requestBody: SignUpDesignerRequestDto) => {
  const result = await axios.post(DESIGNER_SIGN_UP_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 아이디 찾기 API 함수
export const foundIdRequest = async (requestBody: FoundIdCheckRequestDto) => {
  const result = await axios.post(FOUND_ID_URL, requestBody)
    .then(requestHandler<IdFoundResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 비밀번호 찾기 사용자 확인 API 함수
export const foundPasswordUserCheckRequest = async (requestBody: PasswordResetRequestDto) => {
  const result = await axios.post(FOUND_PASSWORD_PATH, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 비밀번호 변경 API 함수
export const setUpPasswordRequest = async (requestBody: SetUpPasswordRequestDto) => {
  const result = await axios.post(RESET_PASSOWORD_PATH, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}


