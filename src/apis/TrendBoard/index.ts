import axios from "axios";
import { PostTrendBoardCommentRequestDto, PostTrendBoardRequestDto, PutTrendBoardCommentRequestDto, PutTrendBoardRequestDto } from "./dto/request";
import { DELETE_TREND_BOARD_COMMENT_DELETE_URL, DELETE_TREND_BOARD_DELETE_URL, GET_SEARCH_SEARCH_TREND_BOARD_LIST_URL, GET_TREND_BOARD_COMMENT_LIST_URL, GET_TREND_BOARD_DETAIL_URL, GET_TREND_BOARD_LIST_URL, PATCH_TREND_BOARD_INCREASE_VIEW_COUNT_URL, POST_TREND_BOARD_COMMENT_WRITE_URL, POST_TREND_BOARD_WRITE_URL, PUT_TREND_BOARD_COMMENT_PUT_URL, PUT_TREND_BOARD_LIKE_URL, PUT_TREND_BOARD_PUT_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetSearchTrendBoardListResponseDto, GetTrendBoardCommentListResponseDto, GetTrendBoardListResponseDto, GetTrendBoardResponseDto } from "./dto/response";

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

// function : 트렌드 게시물 답글 작성 API 함수
export const postTrendBoardCommentRequest = async (
trendBoardNumber : number | string, requestBody : PostTrendBoardCommentRequestDto, accessToken: string
) => {
	const result = await axios.post(POST_TREND_BOARD_COMMENT_WRITE_URL(trendBoardNumber), requestBody, bearerAuthorization(accessToken))
	.then(requestHandler<ResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function : 트렌드 전체 게시물 리스트 불러오기 API 함수
export const getTrendBoardListRequest = async(accessToken  : string) => {
	const result = await axios.get(GET_TREND_BOARD_LIST_URL, bearerAuthorization(accessToken))
	.then(requestHandler<GetTrendBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function : 트렌드 게시물의 답글 전체 리스트 불러오기 API 함수
export const getTrendBoardCommentByBoardNumberListRequest = async ( trendBoardNumber : number | string, accessToken : string) => {
	const result = await axios.get(GET_TREND_BOARD_COMMENT_LIST_URL(trendBoardNumber), bearerAuthorization(accessToken))
	.then(requestHandler<GetTrendBoardCommentListResponseDto>)
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

// function  : 트렌드 게시물 불러오기 API 함수 
export const getTrendBoardRequest = async (trendBoardNumber  : number | string , accessToken : string) => {
	const result = await axios.get(GET_TREND_BOARD_DETAIL_URL(trendBoardNumber), bearerAuthorization(accessToken))
	.then(requestHandler<GetTrendBoardResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function: 트렌드 게시물 수정 API 함수 
export const putTrendBoardRequest = async (trendBoardNumber: number | string, requestBody: PutTrendBoardRequestDto, accessToken: string) => {
	const result = await axios.put(PUT_TREND_BOARD_PUT_URL(trendBoardNumber), requestBody, bearerAuthorization(accessToken))
			.then(requestHandler<ResponseDto>)
			.catch(requestErrorHandler);
	return result;
};

// function: 트렌드 게시물 답글 수정 API 함수 
export const putTrendBoardCommentRequest = async (trendBoardCommentNumber: number | string, requestBody: PutTrendBoardCommentRequestDto, accessToken: string) => {
	const result = await axios.put(PUT_TREND_BOARD_COMMENT_PUT_URL(trendBoardCommentNumber), requestBody, bearerAuthorization(accessToken))
			.then(requestHandler<ResponseDto>)
			.catch(requestErrorHandler);
	return result;
};

// function: 트렌드 게시물 삭제 API 함수 
export const deleteTrendBoardRequest = async (trendBoardNumber: number | string, accessToken: string) => {
	const result = await axios.delete(DELETE_TREND_BOARD_DELETE_URL(trendBoardNumber), bearerAuthorization(accessToken))
			.then(requestHandler<ResponseDto>)
			.catch(requestErrorHandler);
	return result;
};

// function: 트렌드 답글 삭제 API 함수 
export const deleteTrendBoardCommentRequest = async (trendBoardCommentNumber: number | string, accessToken: string) => {
	const result = await axios.delete(DELETE_TREND_BOARD_COMMENT_DELETE_URL(trendBoardCommentNumber), bearerAuthorization(accessToken))
			.then(requestHandler<ResponseDto>)
			.catch(requestErrorHandler);
	return result;
};

// function  : 트렌드 게시물 좋아요 API 함수
export const putTrendBoardLikeRequest = async (trendBoardNumber : number | string, accessToken : string) => {
	const result = await axios.put(PUT_TREND_BOARD_LIKE_URL(trendBoardNumber), bearerAuthorization(accessToken))
	.then(requestHandler<ResponseDto>)
	.catch(requestErrorHandler);

	return result;
}

//function : 트렌드 게시물 조회수 증가 API 함수
export const patchTrendBoardIncreaseViewCountRequest = async (trendBoardNumber : number | string , accessToken : string) => {
	const result = await axios.patch(PATCH_TREND_BOARD_INCREASE_VIEW_COUNT_URL(trendBoardNumber), {}, bearerAuthorization(accessToken))
	.then(requestHandler<ResponseDto>)
	.catch(requestErrorHandler);
	
	return result;
}

