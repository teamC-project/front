export interface GetChatroomListResponseDto {
    code: string;
    chatroomList: {
        roomId: string;
        roomName: string;
    }[];
}

export interface GetChatroomResponseDto {
    code: string;
    roomId: string;
    roomName: string;
}

export interface GetChatMessageListResponseDto {
    code: string;
    messages: {
        messageId: string;
        sender: string;
        message: string;
        timestamp: string;
    }[];
}