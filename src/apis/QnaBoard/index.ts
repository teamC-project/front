import axios from "axios"
import { GET_QNA_BOARD_LIST_URL } from "src/constant"
import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetQnaBoardListResponseDto } from "./dto/response"

// function :  Q&A 검색 리스트 불러오기 API 함수
export const getBoardListRequest  = async (accessToken : string) => {
	const result = await axios
	.get(GET_QNA_BOARD_LIST_URL, bearerAuthorization(accessToken))
	.then(requestHandler<GetQnaBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}