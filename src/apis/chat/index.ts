import axios from "axios";
import { PostChatmessageRequestDto, PostChatroomRequestDto } from "./dto/request";
import { CHAT_ROOM_MESSAGES_ABSOLUTE_PATH, DELETE_CHATROOM_URL, DELETE_CHAT_MESSAGE_URL, GET_CHATROOM_DETAIL_URL, GET_CHATROOM_LIST_URL, POST_CHATROOM_WRITE_URL, POST_CHAT_MESSAGE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetChatroomListResponseDto, GetChatroomResponseDto, GetChatMessageListResponseDto } from "./dto/response";

// function: 채팅방 생성 API 함수
export const postChatRoomRequest = async (requestBody: PostChatroomRequestDto, accessToken: string) => {
    const result = await axios.post<ResponseDto>(POST_CHATROOM_WRITE_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 채팅 메시지 전송 API 함수
export const postChatMessageRequest = async (roomId: number | string, requestBody: PostChatmessageRequestDto, accessToken: string) => {
    const result = await axios.post<ResponseDto>(POST_CHAT_MESSAGE_URL(roomId), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 채팅 메시지 목록 불러오기 API 함수
export const getChatMessagesRequest = async (roomId: number | string, accessToken: string) => {
    const result = await axios.get<GetChatMessageListResponseDto>(CHAT_ROOM_MESSAGES_ABSOLUTE_PATH(roomId), bearerAuthorization(accessToken))
        .then(requestHandler<GetChatMessageListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 채팅방 목록 불러오기 API 함수
export const getChatroomListRequest = async (accessToken: string) => {
    const result = await axios.get<GetChatroomListResponseDto>(GET_CHATROOM_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetChatroomListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 특정 채팅방 정보 불러오기 API 함수
export const getChatroomRequest = async (roomId: number | string, accessToken: string) => {
    const result = await axios.get<GetChatroomResponseDto>(GET_CHATROOM_DETAIL_URL(roomId), bearerAuthorization(accessToken))
        .then(requestHandler<GetChatroomResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 채팅방 삭제 API 함수
export const deleteChatroomRequest = async (roomId: number | string, accessToken: string) => {
    const result = await axios.delete<ResponseDto>(DELETE_CHATROOM_URL(roomId), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 특정 채팅 메시지 삭제 API 함수
export const deleteChatMessageRequest = async (roomId: number | string, messageId: number | string, accessToken: string) => {
    const result = await axios.delete<ResponseDto>(DELETE_CHAT_MESSAGE_URL(roomId, messageId), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
