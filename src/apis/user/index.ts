import axios from "axios";
import { GET_SIGN_IN_USER_REQUEST_URL, INFO_CUSTOMER_UPDATE_URL, INFO_DESIGNER_UPDATE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { GetSignInUserResponseDto, GetUserInfoResponseDto } from "./dto/response";

//  function: 로그인 유저 정보 불러오기 API 함수  //
export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios.get(GET_SIGN_IN_USER_REQUEST_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetSignInUserResponseDto>)
    .catch(requestErrorHandler);
  return result;
};

// function: 고객 정보 업데이트
export const updateCustomerInfoRequest = (accessToken: string, customerInfoUpdate: any) => {
  const result = axios.post(INFO_CUSTOMER_UPDATE_URL, customerInfoUpdate, bearerAuthorization(accessToken))
    .then(requestHandler<GetUserInfoResponseDto> )
    .catch(requestErrorHandler);
  return result;
};

// function: 디자이너 정보 업데이트
export const updateDesignerInfoRequest = (accessToken: string, designerInfoUpdate: any) => {
  const result = axios.post(INFO_DESIGNER_UPDATE_URL, designerInfoUpdate, bearerAuthorization(accessToken))
    .then(requestHandler<GetUserInfoResponseDto> )
    .catch(requestErrorHandler);
  return result;
};