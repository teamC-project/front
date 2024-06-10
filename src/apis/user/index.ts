import axios from "axios";
import { GET_SIGN_IN_USER_REQUEST_URL, INFO_CUSTOMER_UPDATE_URL, INFO_DESIGNER_UPDATE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { GetSignInUserResponseDto } from "./dto/response";

//  function: 로그인 유저 정보 불러오기 API 함수  //
export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios.get(GET_SIGN_IN_USER_REQUEST_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetSignInUserResponseDto>)
    .catch(requestErrorHandler);
  return result;
};

// function: 고객 저장
export const updateCustomerInfoRequest = async (accessToken: string) => {
  const result = await axios.post(INFO_CUSTOMER_UPDATE_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetSignInUserResponseDto>)
    .catch(requestErrorHandler);
  return result;
}

// function: 디자이너 저장
export const updateDesignerInfoRequest = async (accessToken: string) => {
  const result = await axios.post(INFO_DESIGNER_UPDATE_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetSignInUserResponseDto>)
    .catch(requestErrorHandler);
  return result;
}

// function: 고객 업데이트
export const updateCustomerInfo = async (accessToken: string, customerInfoUpdate: string) => {
  try {
    const response = await axios.post(INFO_CUSTOMER_UPDATE_URL, customerInfoUpdate, bearerAuthorization(accessToken));
    return requestHandler(response.data);
  } catch (error) {
    return requestErrorHandler(error);
  }
}

  // function: 디자이너 업데이트
  export const updateDesignerInfo = async (accessToken: string, designerInfoUpdate: string) => {
    try {
      const response = await axios.post(INFO_DESIGNER_UPDATE_URL, designerInfoUpdate, bearerAuthorization(accessToken));
      return requestHandler(response.data);
    } catch (error) {
      return requestErrorHandler(error);
    }
}
