import { DELETE_DESIGNER_BOARD_COMMENT_DELETE_URL, DELETE_DESIGNER_BOARD_DELETE_URL, GET_DESIGNER_BOARD_COMMENT_LIST_URL, GET_DESIGNER_BOARD_DETAIL_URL, GET_DESIGNER_BOARD_LIST_URL, GET_SEARCH_DESIGNER_BOARD_LIST_URL, PATCH_DESIGNER_BOARD_INCREASE_VIEW_COUNT_URL, POST_DESIGNER_BOARD_COMMENT_WRITE_URL, POST_DESIGNER_BOARD_WRITE_URL, PUT_DESIGNER_BOARD_COMMENT_PUT_URL, PUT_DESIGNER_BOARD_PUT_URL } from "src/constant";
import { PostDesignerBoardCommentRequestDto, PostDesignerBoardRequestDto, PutDesignerBoardCommentRequestDto, PutDesignerBoardRequestDto } from "./dto/request";
import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetDesignerBoardCommentListResponseDto, GetDesignerBoardListResponseDto, GetDesignerBoardResponseDto, GetSearchDesignerBoardListResponseDto } from "./dto/response";

// function: DesignerBoard 작성 API 함수 
export const postDesignerBoardRequest = async (requestBody: PostDesignerBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_DESIGNER_BOARD_WRITE_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: DesignerBoard 답글 작성 API 함수 
export const postDesignerBoardCommentRequest = async (designerBoardNumber: number | string, requestBody: PostDesignerBoardCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_DESIGNER_BOARD_COMMENT_WRITE_URL(designerBoardNumber), requestBody, bearerAuthorization(accessToken))
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

// function: DesignerBoard 게시물의 Comment 전체 리스트 불러오기 API 함수 
export const getDesignerBoardCommentsByBoardNumberRequest = async (designerBoardNumber: number | string, accessToken: string) => {
  const result = await axios.get(GET_DESIGNER_BOARD_COMMENT_LIST_URL(designerBoardNumber), bearerAuthorization(accessToken))
      .then(requestHandler<GetDesignerBoardCommentListResponseDto>)
      .catch(requestErrorHandler);
  return result;
}  

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

// function: DesignerBoard 게시물 답글 수정 API 함수 
export const putDesignerBoardCommentRequest = async (designerBoardCommentNumber: number | string, requestBody: PutDesignerBoardCommentRequestDto, accessToken: string) => {
    const result = await axios.put(PUT_DESIGNER_BOARD_COMMENT_PUT_URL(designerBoardCommentNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: DesignerBoard 게시물 삭제 API 함수 
export const deleteDesignerBoardRequest = async (designerBoardNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_DESIGNER_BOARD_DELETE_URL(designerBoardNumber), {
      ...bearerAuthorization(accessToken),
      data: { userRole: 'ROLE_ADMIN' } // 추가: 사용자 역할 정보 전달
    })
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: DesignerBoard 답글 삭제 API 함수 
export const deleteDesignerBoardCommentRequest = async (designerBoardCommentNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_DESIGNER_BOARD_COMMENT_DELETE_URL(designerBoardCommentNumber), {
      ...bearerAuthorization(accessToken),
      data: { userRole: 'ROLE_ADMIN' } // 추가: 사용자 역할 정보 전달
    })
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: DesignerBoard 게시물 조회수 증가 API 함수 
export const increaseViewCountRequest = async (designerBoardNumber: number | string, accessToken: string) => {
    const result = await axios.patch(PATCH_DESIGNER_BOARD_INCREASE_VIEW_COUNT_URL(designerBoardNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};