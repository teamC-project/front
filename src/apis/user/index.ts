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
export const userInfoDeleteRequest = async (accessToken: string, userId: string) => {
  try {
    // 요청 헤더 설정
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` } // Bearer 토큰을 포함하는 인증 헤더
    };

    // axios.delete 요청 실행 및 결과 처리
    const result = await axios.delete<ResponseDto>(`${USER_DELETE_URL}/${userId}`, config)
      .then(requestHandler) // 요청 성공 시 결과를 처리하는 함수 호출
      .catch(requestErrorHandler); // 요청 실패 시 에러를 처리하는 함수 호출

    return result; // 결과 반환
  } catch (error) {
    console.error('Error in userInfoDeleteRequest:', error); // 에러 로그 출력
    throw error; // 에러를 상위로 던져 추가적인 에러 처리가 가능하도록 합니다.
  }
};