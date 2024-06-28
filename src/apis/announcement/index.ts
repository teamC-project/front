import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { PostAnnouncementBoardRequestDto, PutAnnouncementBoardRequestDto } from "./dto/request";
import { 
	GetAnnouncementBoardListResponseDto, 
	GetAnnouncementBoardResponseDto, 
	GetSearchAnnouncementBoardListResponseDto 
} from "./dto/response";
import { 
	DELETE_ANNOUCEMENT_BOARD_DELETE_URL, 
	GET_ANNOUNCEMENT_BOARD_DETAIL_URL, 
	GET_ANNOUNCEMENT_BOARD_LIST_URL, 
	GET_SEARCH_ANNOUNCEMENT_BOARD_LIST_URL, 
	PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL, 
	POST_ANNOUNCEMENT_BOARD_WRITE_URL, 
	PUT_ANNOUNCEMENT_BOARD_PUT_URL 
	} from "src/constant";

export const postAnnouncementBoardRequest = async (requestBody: PostAnnouncementBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_ANNOUNCEMENT_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const putAnnouncementBoardRequest = async(announcementBoardNumber : number | string, requestBody : PutAnnouncementBoardRequestDto, accessToken : string ) => {
	const result  = await axios.put(PUT_ANNOUNCEMENT_BOARD_PUT_URL(announcementBoardNumber) , requestBody, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const getAnnouncementBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_ANNOUNCEMENT_BOARD_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetAnnouncementBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getSearchAnnouncementBoardListRequest = async (word: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios.get(GET_SEARCH_ANNOUNCEMENT_BOARD_LIST_URL, config)
        .then(requestHandler<GetSearchAnnouncementBoardListResponseDto>)
		.catch(requestErrorHandler);
    return result;
};

export const getAnnouncementBoardRequest = async (announcementBoardNumber : number | string, accessToken : string) => {
	const result = await axios.get(GET_ANNOUNCEMENT_BOARD_DETAIL_URL(announcementBoardNumber), bearerAuthorization(accessToken))
		.then(requestHandler<GetAnnouncementBoardResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const increaseAnnouncementBoardViewCountRequest = async(announcementBoardNumber : number | string, accessToken : string) => {
	const result = await axios.patch(PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL(announcementBoardNumber), {}, bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

export const deleteAnnouncementBoardRequest = async(announcementBoardNumber : number | string, accessToken : string) => {
	const result = await axios.delete(DELETE_ANNOUCEMENT_BOARD_DELETE_URL(announcementBoardNumber), bearerAuthorization(accessToken))
		.then(requestHandler<ResponseDto>)
		.catch(requestErrorHandler);
	return result;
};

