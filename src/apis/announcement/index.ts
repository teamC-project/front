import axios from "axios";
import { GET_ANNOUNCEMENT_BOARD_LIST_URL, GET_SEARCH_ANNOUNCEMENT_BOARD_LIST_URL, POST_ANNOUNCEMENT_BOARD_WRITE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { PostAnnouncementBoardRequestDto } from "./dto/request";
import { GetAnnouncementBoardListResponseDto, GetSearchAnnouncementBoardListResponseDto } from "./dto/response";

// function : 공지사항 작성 API 함수
export const postAnnnouncementBoardRequest = async (requestBody: PostAnnouncementBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_ANNOUNCEMENT_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

    // function: 공지사항 전체 리스트 불러오기 API 함수 
export const getAnnouncementBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_ANNOUNCEMENT_BOARD_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetAnnouncementBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
// function : 공지사항 검색 리스트 불러오기
export const getSearchAnnouncementBoardListRequest = async (word: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios.get(GET_SEARCH_ANNOUNCEMENT_BOARD_LIST_URL, config)
        .then(requestHandler<GetSearchAnnouncementBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};