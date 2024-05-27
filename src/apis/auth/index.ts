import axios from "axios";
import { EmailAuthCheckRequsetDto, EmailAuthRequsetDto, IdCheckRequsetDto, SignInRequsetDto, SignUpRequsetDto } from "./dto/request";
import { EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, ID_CHECK_REQUEST_URL, SIGN_IN_REQUEST_URL, SIGN_UP_REQUEST_URL } from "src/constant";
import { SignInResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";
import { requestErrorHandler, requestHandler } from "..";

// function: 로그인 API 함수
export const signInRequest = async (requestBody: SignInRequsetDto) => {
  const result = await axios.post(SIGN_IN_REQUEST_URL, requestBody)
    .then(requestHandler<SignInResponseDto>)
    .catch(requestErrorHandler);
  return result;
};

//  function: 아이디 중복 확인 API 함수
export const idCheckRequest = async (requestBody: IdCheckRequsetDto) => {
  const result = await axios.post(ID_CHECK_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 이메일 인증 API 함수
export const emailAuthRequest = async (requestBody: EmailAuthRequsetDto) => {
  const result = await axios.post(EMAIL_AUTH_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 이메일 인증 확인 API 함수
export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequsetDto) => {
  const result = await axios.post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 회원가입 API 함수
export const signUpRequest = async (requestBody: SignUpRequsetDto) => {
  const result = await axios.post(SIGN_UP_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}