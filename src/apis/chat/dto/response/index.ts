import ResponseDto from "src/apis/response.dto";
import { ChatMessageList, ChatroomList } from "src/types";

export interface GetChatroomListResponseDto extends ResponseDto {
    chatRoomList: ChatroomList[];
}

export interface GetChatMessageListResponseDto extends ResponseDto {
    chatMessageList: ChatMessageList[];
}

export interface GetChatroomResponseDto extends ResponseDto {
    chatRoomNumber: number;
    chatSenderId: string;
    chatReceiverId: string;
    chatMessages: string;
}
