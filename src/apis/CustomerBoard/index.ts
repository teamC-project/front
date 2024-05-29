import axios from "axios"
import { PostCustomerBoardRequestDto, PostCustomerBoardCommentRequestDto, PutCustomerBoardRequestDto } from './dto/request';

import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetCustomerBoardListResponseDto } from "./dto/response"
import { GET_CUSTOMER_BOARD_LIST_URL } from "src/constant";

// function :  Customer 검색 리스트 불러오기 API 함수
export const getCustomerBoardListRequest  = async (accessToken : string) => {
	const result = await axios
	.get(GET_CUSTOMER_BOARD_LIST_URL, bearerAuthorization(accessToken))
	.then(requestHandler<GetCustomerBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}