export interface PostCustomerBoardRequestDto {
    customerBoardTitle: string;
    customerBoardContents: string;
    secret: boolean;
}

export interface PostCustomerBoardCommentRequestDto {
	customerBoardCommentContents : string;
    customerBoardParentCommentNumber?: number;
}

export interface PutCustomerBoardRequestDto {
	customerBoardTitle: string;
	customerBoardContents: string;
    secret: boolean;
}

export interface PutCustomerBoardCommentRequestDto {
    customerBoardCommentContents : string;
    customerBoardCommentNumber: number;
}