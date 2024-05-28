import { GET_DESIGNER_BOARD_DETAIL_URL, GET_DESIGNER_BOARD_LIST_URL, GET_SEARCH_DESIGNER_BOARD_LIST_URL, POST_DESIGNER_BOARD_WRITE_URL, PUT_DESIGNER_BOARD_PUT_URL } from "src/constant";
import { PostDesignerBoardRequestDto, PutDesignerBoardRequestDto } from "./dto/request";
import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetDesignerBoardListResponseDto, GetDesignerBoardResponseDto, GetSearchDesignerBoardListResponseDto } from "./dto/response";

// function: DesignerBoard 작성 API 함수 
export const postDesignerBoardRequest = async (requestBody: PostDesignerBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_DESIGNER_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: DesignerBoard 전체 리스트 불러오기 API 함수 
export const getDesignerBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_DESIGNER_BOARD_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetDesignerBoardListResponseDto>)
        .catch(requestErrorHandler);
        return result;
};

// function: DesignerBoard 검색 리스트 불러오기 API 함수 
export const getSearchDesignerBoardListRequest = async (word: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios.get(GET_SEARCH_DESIGNER_BOARD_LIST_URL, config)
        .then(requestHandler<GetSearchDesignerBoardListResponseDto>)
        .catch(requestErrorHandler);
        return result;
};

// function: DesignerBoard 게시물 불러오기 API 함수 
export const getDesignerBoardRequest = async (designerBoardNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_DESIGNER_BOARD_DETAIL_URL(designerBoardNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetDesignerBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: DesignerBoard 게시물 수정 API 함수 
export const putDesignerBoardRequest = async (designerBoardNumber: number | string, requestBody: PutDesignerBoardRequestDto, accessToken: string) => {
    const result = await axios.put(PUT_DESIGNER_BOARD_PUT_URL(designerBoardNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};


// function :  DesignerBoard 검색 리스트 불러오기 API 함수