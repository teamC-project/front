import axios from "axios";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, FoundIdCheckRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpCustomerRequestDto, SignUpDesignerRequestDto } from "./dto/request";
import { CUSTOMER_SIGN_UP_URL, DESIGNER_SIGN_UP_URL, EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, FOUND_ID_URL, ID_CHECK_REQUEST_URL, SIGN_IN_REQUEST_URL } from "src/constant";
import { SignInResponseDto } from "./dto/response";
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
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}