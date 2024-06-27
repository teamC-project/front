import ResponseDto from "src/apis/response.dto";
import { ChatMessageList, ChatroomList } from "src/types";

export interface GetChatroomListResponseDto extends ResponseDto {
    chatRoomList: ChatroomList[];
}

export interface GetChatMessageListResponseDto extends ResponseDto {
    chatMessageList: ChatMessageList[];
}

export interface GetChatroomResponseDto extends ResponseDto {
    chatroomId: number;
    customerId: string;
    designerId: string;
    roomName: string;
}

export interface GetChatMessageResponseDto extends ResponseDto {
    chatroomId: number;
    senderId: string;
	messages: string;
}
