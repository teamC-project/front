import axios from "axios"
import { GET_QNA_BOARD_LIST_URL, GET_SEARCH_QNA_BOARD_LIST_URL } from "src/constant"
import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetQnaBoardListResponseDto, GetSearchQnaBoardResponseDto } from "./dto/response"

// function :  Q&A 전체 리스트 불러오기 API 함수
export const getQnaBoardListRequest  = async (accessToken : string) => {
	const result = await axios
	.get(GET_QNA_BOARD_LIST_URL, bearerAuthorization(accessToken))
	.then(requestHandler<GetQnaBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function : Q&A 검색 리스트 불러오기 API 함수
export const getSearchQnaBoardListRequest = async (
qnaBoardSearchWord : string,
accessToken: string
) => {
	const config = {...bearerAuthorization(accessToken), params : {qnaBoardSearchWord}};
	const result = await axios
	.get(GET_SEARCH_QNA_BOARD_LIST_URL, config)
	.then(requestHandler<GetSearchQnaBoardResponseDto>)
	.catch(requestHandler);
	return result;
}