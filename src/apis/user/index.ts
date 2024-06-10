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
// 아이디값은 고정, 리퀘스트바디: 바꿀내용 넣어서 쏘는용도, 토큰은 토근
// 리퀘스트바디안에 고객, 디자이너만들거나 하나로만들어서 고정값아닌애들 ?찍기


// const getBoardResponse = (result: GetBoardResponseDto | ResponseDto | null) => {
// const message = 
// !result ? '서버에 문제가 있습니다.' :
// result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
// result.code === 'AF' ? '인증에 실패했습니다.' :
// result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
// result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

// if (!result || result.code !== 'SU') {
// alert(message);
// navigator(QNA_LIST_ABSOLUTE_PATH);
// return;
// }

// const { writerId, title, contents, status } = result as GetBoardResponseDto;
// if (writerId !== loginUserId) {
// alert('권한이 없습니다.');
// navigator(QNA_LIST_ABSOLUTE_PATH);
// return;
// }
// if (status) {
// alert('답변이 완료된 게시물입니다.');
// navigator(QNA_LIST_ABSOLUTE_PATH);
// return;
// }

// setTitle(title);
// setContents(contents);
// setWriterId(writerId);
// };


    // //                    effect                    //
    // let effectFlag = false;
    //  useEffect(() => {
    //     if (!receptionNumber || !cookies.accessToken) return;
    //     if (!loginUserRole) return;
    //     if (effectFlag) return;
    //     effectFlag = true;
    //     if (loginUserRole !== 'ROLE_USER') {
    //         navigator(QNA_LIST_ABSOLUTE_PATH);
    //         return;
    //     }
    //     getBoardRequest(receptionNumber, cookies.accessToken).then(getBoardResponse);
    // }, [loginUserRole]);

// function: 디자이너 저장
export const updateDesignerInfoRequest = async (accessToken: string, age: string, data: FormData) => {
  data.append('age', age);
  const result = await axios.post(INFO_DESIGNER_UPDATE_URL, data, bearerAuthorization(accessToken))
    .then(requestHandler<GetSignInUserResponseDto>)
    .catch(requestErrorHandler);
  return result;
}

// function: 업데이트
export const updateCustomerInfo = async (accessToken: string, userId: string) => {
  try {
    const response = await axios.post(INFO_CUSTOMER_UPDATE_URL, updateCustomerInfo, bearerAuthorization(accessToken));
    return requestHandler(response.data);
  } catch (error) {
    return requestErrorHandler(error);
  }
}

  // function: 업데이트
  export const updateDesignerInfo = async (accessToken: string, updateDesignerInfo: any) => {
    try {
      const response = await axios.post(INFO_DESIGNER_UPDATE_URL, updateDesignerInfo, bearerAuthorization(accessToken));
      return requestHandler(response.data);
    } catch (error) {
      return requestErrorHandler(error);
    }

}