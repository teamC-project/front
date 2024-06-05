import axios from "axios"
import { GET_QNA_BOARD_DETAIL_URL, GET_QNA_BOARD_LIST_URL, GET_SEARCH_QNA_BOARD_LIST_URL, POST_QNA_BOARD_WRITE_URL, PUT_QNA_BOARD_PUT_URL } from "src/constant"
import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetQnaBoardListResponseDto, GetQnaBoardResponseDto, GetSearchQnaBoardResponseDto } from "./dto/response"
import { PostQnaBoardRequestDto, PutQnaBoardRequestDto } from "./dto/request"
import ResponseDto from "../response.dto"

// function : Q&A 작성 API 함수
export const postQnaBoardRequest = async (requestBody: PostQnaBoardRequestDto, accessToken : string ) => {
	const result = await axios.post(POST_QNA_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
	.then(requestHandler<ResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

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

// function : Q&A 게시물 불러오기 API 함수
export const getQnaBoardRequest =  async(qnaBoardNumber : number | string, accessToken : string) => {
	const result = await axios.get(GET_QNA_BOARD_DETAIL_URL(qnaBoardNumber), bearerAuthorization(accessToken))
	.then(requestHandler<GetQnaBoardResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function : Q&A 게시물 수정 API 함수
export const putQnaBoardRequest = async(qnaBoardNumber : number | string, requestBody : PutQnaBoardRequestDto, accessToken : string) => {
	const result = await axios.put(PUT_QNA_BOARD_PUT_URL(qnaBoardNumber), requestBody, bearerAuthorization(accessToken))
	.then(requestHandler<ResponseDto>)
	.catch(requestHandler);
	return result;
}