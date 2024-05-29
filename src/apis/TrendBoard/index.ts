import axios from "axios";
import { PostTrendBoardRequestDto } from "./dto/request";
import { POST_TREND_BOARD_WRITE_URL } from "src/constant";
import { bearerAuthorization, requestHandler } from "..";
import ResponseDto from "../response.dto";

// function : 트렌드 작성 API 함수
export const postTrendBoardRequest = async (
	requestBody : PostTrendBoardRequestDto,
	accessToken : string 
) => {
		const result = axios.post(POST_TREND_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestHandler);
		return result;
}