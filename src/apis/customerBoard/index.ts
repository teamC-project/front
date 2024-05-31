import { GET_CUSTOMER_BOARD_DETAIL_URL, GET_CUSTOMER_BOARD_LIST_URL, GET_SEARCH_CUSTOMER_BOARD_LIST_URL, POST_CUSTOMER_BOARD_COMMENT_WRITE_URL, POST_CUSTOMER_BOARD_WRITE_URL, PUT_CUSTOMER_BOARD_PUT_URL } from "src/constant";
import { PostCustomerBoardCommentRequestDto, PostCustomerBoardRequestDto, PutCustomerBoardRequestDto } from "./dto/request";
import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetCustomerBoardListResponseDto, GetCustomerBoardResponseDto, GetSearchCustomerBoardListResponseDto } from "./dto/response";

// function: CustomerBoard 작성 API 함수 
export const postCustomerBoardRequest = async (requestBody: PostCustomerBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_CUSTOMER_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: CustomerBoard 답글 작성 API 함수 
export const postCustomerBoardCommentRequest = async (customerBoardNumber: number | string, requestBody: PostCustomerBoardCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_CUSTOMER_BOARD_COMMENT_WRITE_URL(customerBoardNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: CustomerBoard 전체 리스트 불러오기 API 함수 
export const getCustomerBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_CUSTOMER_BOARD_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetCustomerBoardListResponseDto>)
        .catch(requestErrorHandler);
        return result;
};

// function: CustomerBoard 검색 리스트 불러오기 API 함수 
export const getSearchCustomerBoardListRequest = async (word: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios.get(GET_SEARCH_CUSTOMER_BOARD_LIST_URL, config)
        .then(requestHandler<GetSearchCustomerBoardListResponseDto>)
        .catch(requestErrorHandler);
        return result;
};

// function: CustomerBoard 게시물 불러오기 API 함수 
export const getCustomerBoardRequest = async (customerBoardNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_CUSTOMER_BOARD_DETAIL_URL(customerBoardNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetCustomerBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: CustomerBoard 게시물 수정 API 함수 
export const putCustomerBoardRequest = async (customerBoardNumber: number | string, requestBody: PutCustomerBoardRequestDto, accessToken: string) => {
    const result = await axios.put(PUT_CUSTOMER_BOARD_PUT_URL(customerBoardNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};


// function :  CustomerBoard 검색 리스트 불러오기 API 함수