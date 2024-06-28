import axios from "axios";

import { 
    bearerAuthorization, 
    requestErrorHandler, 
    requestHandler 
} from "..";

import ResponseDto from "../response.dto";
import { 
    GetChatroomListResponseDto, 
    GetChatroomResponseDto, 
    GetChatMessageListResponseDto 
} from "./dto/response";
import { PostChatroomRequestDto } from "./dto/request";

import {  
    DELETE_CHATROOM_URL,  
    GET_CHATROOM_DETAIL_URL, 
    GET_CHATROOM_LIST_URL, 
    GET_CHAT_MESSAGE_LIST_URL, 
    POST_CHATROOM_URL
} from "src/constant";

export const postChatRoomRequest = async (requestBody: PostChatroomRequestDto, accessToken: string) => {
    const result = await axios.post(POST_CHATROOM_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getChatMessagesRequest = async (roomId: number | string, accessToken: string) => {
    const result = await axios.get(GET_CHAT_MESSAGE_LIST_URL(roomId), bearerAuthorization(accessToken))
        .then(requestHandler<GetChatMessageListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getChatroomListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_CHATROOM_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetChatroomListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getChatroomRequest = async (roomId: number | string, accessToken: string) => {
    const result = await axios.get(GET_CHATROOM_DETAIL_URL(roomId), bearerAuthorization(accessToken))
        .then(requestHandler<GetChatroomResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteChatroomRequest = async (roomId: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_CHATROOM_URL(roomId), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};