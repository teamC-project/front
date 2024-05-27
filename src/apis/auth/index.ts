import axios from "axios";
import { EmailAuthRequesetDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./dto/request";
import { EMAIL_AUTH_REQUEST_URL, ID_CHECK_REQUEST_URL, SIGN_IN_REQUEST_URL, SIGN_UP_REQUEST_URL } from "src/constant";
import { requestErrorHandler, requestHandler } from "..";
import { SignInResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";

export const SignInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios.post(SIGN_IN_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);

  return result;
};

export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
  const result = await axios
    .post(ID_CHECK_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler)
  return result;
};

export const EmailAuthRequest = async (requestBody: EmailAuthRequesetDto) => {
  const result = await axios
    .post(EMAIL_AUTH_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
};

export const SignUpRequest = async(requestBody:SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_REQUEST_URL, requestBody)
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
  return result;
};