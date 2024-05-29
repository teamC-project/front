import axios from "axios"
import { GET_CUSTOMER_BOARD_LIST_URL } from "src/constant"
import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetCustomerBoardListResponseDto } from "./dto/response"

// function :  Customer 검색 리스트 불러오기 API 함수
export const getBoardListRequest  = async (accessToken : string) => {
	const result = await axios
	.get(GET_CUSTOMER_BOARD_LIST_URL, bearerAuthorization(accessToken))
	.then(requestHandler<GetCustomerBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}