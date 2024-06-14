import axios from "axios";
import { GET_SIGN_IN_USER_REQUEST_URL, INFO_CUSTOMER_UPDATE_URL, INFO_DESIGNER_UPDATE_URL, USER_DELETE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { GetSignInUserResponseDto, GetUserInfoResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";

//  function: 로그인 유저 정보 불러오기 API 함수  //
export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios.get(GET_SIGN_IN_USER_REQUEST_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetSignInUserResponseDto>)
    .catch(requestErrorHandler);
  return result;
};

// function: 고객 정보 업데이트
export const updateCustomerInfoRequest = async(accessToken: string, customerInfoUpdate: any) => {
  const result = await axios.post(INFO_CUSTOMER_UPDATE_URL, customerInfoUpdate, bearerAuthorization(accessToken))
    .then(requestHandler<GetUserInfoResponseDto> )
    .catch(requestErrorHandler);
  return result;
};

// function: 디자이너 정보 업데이트
export const updateDesignerInfoRequest = async (accessToken: string, designerInfoUpdate: any) => {
  const result = await axios.post(INFO_DESIGNER_UPDATE_URL, designerInfoUpdate, bearerAuthorization(accessToken))
    .then(requestHandler<GetUserInfoResponseDto>)
    .catch(requestErrorHandler);
  return result;
};

// function: 사용자 회원 탈퇴
export const userInfoDeleteRequest = async (userId: string, accessToken: string) => {
    const result = await axios.delete<ResponseDto>((USER_DELETE_URL),bearerAuthorization(accessToken))
      .then(requestHandler)
      .catch(requestErrorHandler);
    return result;
  };