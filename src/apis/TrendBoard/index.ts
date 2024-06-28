import axios from "axios";

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";

import {
	PostTrendBoardCommentRequestDto,
	PostTrendBoardRequestDto, 
	PutTrendBoardCommentRequestDto, 
	PutTrendBoardRequestDto } 
from "./dto/request";
import { 
	GetSearchTrendBoardListResponseDto, 
	GetTrendBoardCommentListResponseDto,
	GetTrendBoardListResponseDto, 
	GetTrendBoardResponseDto } 
from "./dto/response";
import ResponseDto from "../response.dto"

import { 
	DELETE_TREND_BOARD_COMMENT_DELETE_URL, 
	DELETE_TREND_BOARD_DELETE_URL, 
	DELETE_TREND_BOARD_LIKE_LIST_URL, 
	GET_SEARCH_SEARCH_TREND_BOARD_LIST_URL, 
	GET_TREND_BOARD_COMMENT_LIST_URL, 
	GET_TREND_BOARD_DETAIL_URL, 
	GET_TREND_BOARD_LIKE_LIST_URL, 
	GET_TREND_BOARD_LIST_URL, 
	PATCH_TREND_BOARD_INCREASE_VIEW_COUNT_URL, 
	POST_TREND_BOARD_COMMENT_WRITE_URL, 
	POST_TREND_BOARD_IMAGE_UPLOAD_URL, 
	POST_TREND_BOARD_WRITE_URL, 
	PUT_TREND_BOARD_COMMENT_PUT_URL, 
	PUT_TREND_BOARD_LIKE_URL, 
	PUT_TREND_BOARD_PUT_URL 
} from "src/constant";

export const postTrendBoardRequest = async (
	requestBody : PostTrendBoardRequestDto, accessToken : string ) => {
	const result = await axios
		.post(POST_TREND_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const postTrendBoardCommentRequest = async (
trendBoardNumber : number | string, requestBody : PostTrendBoardCommentRequestDto, accessToken: string ) => {
	const result = await axios.post(POST_TREND_BOARD_COMMENT_WRITE_URL(trendBoardNumber), requestBody, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const getTrendBoardListRequest = async(accessToken  : string) => {
	const result = await axios.get(GET_TREND_BOARD_LIST_URL, bearerAuthorization(accessToken))
		.then(requestHandler<GetTrendBoardListResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const getTrendBoardCommentByBoardNumberListRequest = async ( trendBoardNumber : number | string, accessToken : string) => {
	const result = await axios.get(GET_TREND_BOARD_COMMENT_LIST_URL(trendBoardNumber), bearerAuthorization(accessToken))
		.then(requestHandler<GetTrendBoardCommentListResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const getSearchTrendBoardListRequest =  async (word : string, accessToken : string) => {
	const config = {...bearerAuthorization(accessToken), params :  { word }};
	const result = await axios.get(GET_SEARCH_SEARCH_TREND_BOARD_LIST_URL, config)
		.then(requestHandler<GetSearchTrendBoardListResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const getTrendBoardRequest = async (trendBoardNumber  : number | string , accessToken : string) => {
	const result = await axios.get(GET_TREND_BOARD_DETAIL_URL(trendBoardNumber), bearerAuthorization(accessToken))
		.then(requestHandler<GetTrendBoardResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const putTrendBoardRequest = async (trendBoardNumber: number | string, requestBody: PutTrendBoardRequestDto, accessToken: string) => {
	const result = await axios.put(PUT_TREND_BOARD_PUT_URL(trendBoardNumber), requestBody, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const putTrendBoardCommentRequest = async (trendBoardCommentNumber: number | string, requestBody: PutTrendBoardCommentRequestDto, accessToken: string) => {
	const result = await axios.put(PUT_TREND_BOARD_COMMENT_PUT_URL(trendBoardCommentNumber), requestBody, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const deleteTrendBoardRequest = async (trendBoardNumber: number | string, accessToken: string) => {
	const result = await axios.delete(DELETE_TREND_BOARD_DELETE_URL(trendBoardNumber), bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const deleteTrendBoardCommentRequest = async (trendBoardCommentNumber: number | string, accessToken: string) => {
	const result = await axios.delete(DELETE_TREND_BOARD_COMMENT_DELETE_URL(trendBoardCommentNumber), bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const putTrendBoardLikeRequest = async (trendBoardNumber : number | string, accessToken : string) => {
	const result = await axios.put(PUT_TREND_BOARD_LIKE_URL(trendBoardNumber), {} , bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const patchTrendBoardIncreaseViewCountRequest = async (trendBoardNumber : number | string , accessToken : string) => {
	const result = await axios.patch(PATCH_TREND_BOARD_INCREASE_VIEW_COUNT_URL(trendBoardNumber), {}, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const getTrendBoardLikeListRequest = async(trendBoardNumber : number | string, accessToken :string) =>{
	const result = await axios.get(GET_TREND_BOARD_LIKE_LIST_URL(trendBoardNumber), bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const deleteTrendBoardLikeListRequest = async(trendBoardNumber : number | string , accessToken : string ) => {
	const result = await axios.delete(DELETE_TREND_BOARD_LIKE_LIST_URL(trendBoardNumber) ,bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const postTrendBoardImageUploadRequest = async(formdata  : FormData ) => {
	const result =  await axios.post(POST_TREND_BOARD_IMAGE_UPLOAD_URL, formdata, { headers: { 'Content-Type' : 'multipart/form-data' } } )
		.then(response => {
			return response.data;
		})
		.catch(() => '')
		return result;
};