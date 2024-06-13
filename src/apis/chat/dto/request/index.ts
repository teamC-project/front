export interface PostChatroomRequestDto {
    designerId: string;
}

export interface PostChatmessageRequestDto {
    roomId: number;
    message: string;
}