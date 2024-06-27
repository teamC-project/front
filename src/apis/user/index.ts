import axios from "axios";

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";

import ResponseDto from "../response.dto";
import { GetSignInUserResponseDto, GetUserInfoResponseDto } from "./dto/response";

import { ChangePasswordRequestDto } from "./dto/request";

import { 
    GET_SIGN_IN_USER_REQUEST_URL, 
    GET_USER_ROLE_URL, 
    INFO_CUSTOMER_UPDATE_URL, 
    INFO_DESIGNER_UPDATE_URL, 
    PASSWORD_CHANGE_URL, 
    USER_DELETE_URL 
} from "src/constant";


export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetSignInUserResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const updateCustomerInfoRequest = async(accessToken: string, customerInfoUpdate: any) => {
    const result = await axios.put(INFO_CUSTOMER_UPDATE_URL, customerInfoUpdate, bearerAuthorization(accessToken))
        .then(requestHandler<GetUserInfoResponseDto> )
        .catch(requestErrorHandler);
    return result;
};

export const updateDesignerInfoRequest = async (accessToken: string, designerInfoUpdate: any) => {
    const result = await axios.put(INFO_DESIGNER_UPDATE_URL, designerInfoUpdate, bearerAuthorization(accessToken))
        .then(requestHandler<GetUserInfoResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const userInfoDeleteRequest = async (userId: string, accessToken: string) => {
    const result = await axios.delete(USER_DELETE_URL, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const changePasswordRequest = async (requestBody: ChangePasswordRequestDto, accessToken: string) => {
    const result = await axios.put(PASSWORD_CHANGE_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getUserRoleRequest = async (userId: string, accessToken: string) => {
    const result = await axios.get(GET_USER_ROLE_URL(userId), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};