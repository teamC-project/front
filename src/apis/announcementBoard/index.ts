import axios from "axios"
import { GET_ANNOUNCEMENT_BOARD_DETAIL_URL, GET_ANNOUNCEMENT_BOARD_LIST_URL, GET_SEARCH_ANNOUNCEMENT_BOARD_LIST_URL, PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL, POST_ANNOUNCEMENT_BOARD_WRITE_URL, PUT_ANNOUNCEMENT_BOARD_PUT_URL } from "src/constant"
import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetAnnouncementBoardListResponseDto, GetAnnouncementBoardResponseDto, GetSearchAnnouncementBoardListResponseDto } from "./dto/response"
import { PostAnnouncementBoardRequestDto, PutAnnouncementBoardRequestDto } from "./dto/request"
import ResponseDto from "../response.dto"

// function : Announcement 작성 API 함수
export const postAnnouncementBoardRequest = async (requestBody: PostAnnouncementBoardRequestDto, accessToken : string ) => {
	const result = await axios.post(POST_ANNOUNCEMENT_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
	.then(requestHandler<ResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function :  Announcement 전체 리스트 불러오기 API 함수
export const getAnnouncementBoardListRequest  = async (accessToken : string) => {
	const result = await axios
	.get(GET_ANNOUNCEMENT_BOARD_LIST_URL, bearerAuthorization(accessToken))
	.then(requestHandler<GetAnnouncementBoardListResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function : Announcement 검색 리스트 불러오기 API 함수
export const getSearchAnnouncementBoardListRequest = async (
  announcementBoardSearchWord: string,
  accessToken: string
): Promise<GetSearchAnnouncementBoardListResponseDto | ResponseDto | null> => {
  const config = { ...bearerAuthorization(accessToken), params: { announcementBoardSearchWord } };
  const result = await axios
    .get(GET_SEARCH_ANNOUNCEMENT_BOARD_LIST_URL, config)
    .then(requestHandler<GetSearchAnnouncementBoardListResponseDto>)
    .catch(requestErrorHandler);
  return result;
};

// function : Announcement 게시물 불러오기 API 함수
export const getAnnouncementBoardRequest =  async(announcementBoardNumber : number | string, accessToken : string) => {
	const result = await axios.get(GET_ANNOUNCEMENT_BOARD_DETAIL_URL(announcementBoardNumber), bearerAuthorization(accessToken))
	.then(requestHandler<GetAnnouncementBoardResponseDto>)
	.catch(requestErrorHandler);
	return result;
}

// function : Announcement 게시물 수정 API 함수
export const putAnnouncementBoardRequest = async(announcementBoardNumber : number | string, requestBody : PutAnnouncementBoardRequestDto, accessToken : string) => {
	const result = await axios.put(PUT_ANNOUNCEMENT_BOARD_PUT_URL(announcementBoardNumber), requestBody, bearerAuthorization(accessToken))
	.then(requestHandler<ResponseDto>)
	.catch(requestHandler);
	return result;
}

// function: AnnouncementBoard 게시물 조회수 증가 API 함수 
export const increaseViewCountRequest = async (announcementBoardNumber: number | string, accessToken: string) => {
	const result = await axios.patch(PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL(announcementBoardNumber), {}, bearerAuthorization(accessToken))
			.then(requestHandler<ResponseDto>)
			.catch(requestErrorHandler);
	return result;
};