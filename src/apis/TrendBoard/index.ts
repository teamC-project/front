import axios from "axios";
import { PostTrendBoardRequestDto } from "./dto/request";
import { GET_SEARCH_SEARCH_TREND_BOARD_LIST_URL, GET_TREND_BOARD_LIST_URL, POST_TREND_BOARD_WRITE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetSearchTrendBoardListResponseDto, GetTrendBoardListResponseDto } from "./dto/response";

// function : 트렌드 게시물 작성 API 함수
export const postTrendBoardRequest = async (
	requestBody : PostTrendBoardRequestDto,
	accessToken : string 
) => {
		const result = await axios
    .post(POST_TREND_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
		return result;
}

// function : 트렌드 전체 게시물 불러오기 API 함수
export const getTrendBoardListRequest = async(accessToken  : string) => {
	const result = await axios.get(GET_TREND_BOARD_LIST_URL, bearerAuthorization(accessToken))
	.then(requestHandler<GetTrendBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function : 트렌드 검색 리스트 불러오기 API 함수
export const getSearchTrendBoardListRequest =  async (word : string, accessToken : string) => {
	const config = {...bearerAuthorization(accessToken), params :  {
		word
	}};
	const result = await axios.get(GET_SEARCH_SEARCH_TREND_BOARD_LIST_URL, config)
	.then(requestHandler<GetSearchTrendBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}