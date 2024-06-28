import axios from "axios";

import { requestErrorHandler, requestHandler } from "..";

import ResponseDto from "../response.dto";

import { 
    SignInRequestDto, 
    IdCheckRequestDto, 
    EmailAuthRequestDto, 
    FoundIdCheckRequestDto, 
    PasswordResetRequestDto, 
    SetUpPasswordRequestDto, 
    SignUpDesignerRequestDto, 
    EmailAuthCheckRequestDto, 
    SignUpCustomerRequestDto, 
    FoundPasswordIdCheckRequestDto 
} from "./dto/request";

import { IdFoundResponseDto, SignInResponseDto } from "./dto/response";

import { 
    FOUND_ID_URL, 
    FOUND_PASSWORD_PATH, 
    SIGN_IN_REQUEST_URL, 
    CUSTOMER_SIGN_UP_URL, 
    DESIGNER_SIGN_UP_URL, 
    ID_CHECK_REQUEST_URL, 
    RESET_PASSOWORD_PATH, 
    EMAIL_AUTH_REQUEST_URL, 
    FOUND_ID_EMAIL_AUTH_URL, 
    EMAIL_AUTH_CHECK_REQUEST_URL, 
    FOUND_PASSWORD_EMAIL_AUTH_URL, 
    FOUND_PASSWORD_ID_CHECK_REQUEST_URL
} from "src/constant";

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_REQUEST_URL, requestBody)
        .then(requestHandler<SignInResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const foundIdEmailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios.post(FOUND_ID_EMAIL_AUTH_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const foundPasswordEmailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios.post(FOUND_PASSWORD_EMAIL_AUTH_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const customerSignUpRequest = async (requestBody: SignUpCustomerRequestDto) => {
    const result = await axios.post(CUSTOMER_SIGN_UP_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const designerSignUpRequest = async (requestBody: SignUpDesignerRequestDto) => {
    const result = await axios.post(DESIGNER_SIGN_UP_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const foundIdRequest = async (requestBody: FoundIdCheckRequestDto) => {
    const result = await axios.post(FOUND_ID_URL, requestBody)
        .then(requestHandler<IdFoundResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const foundPosswordIdCheckRequest = async (requsetBody: FoundPasswordIdCheckRequestDto) => {
    const result = await axios.post(FOUND_PASSWORD_ID_CHECK_REQUEST_URL, requsetBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const foundPasswordUserCheckRequest = async (requestBody: PasswordResetRequestDto) => {
    const result = await axios.post(FOUND_PASSWORD_PATH, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const setUpPasswordRequest = async (requestBody: SetUpPasswordRequestDto) => {
    const result = await axios.post(RESET_PASSOWORD_PATH, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};