export interface PostCustomerBoardRequestDto {
  customerBoardTitle: string;
  customerBoardContents: string;
  isSecret: boolean;
}

export interface PostCustomerBoardCommentRequestDto {
	customerBoardCommentContents : string;
}

export interface PutCustomerBoardRequestDto {
	customerBoardTitle : string ;
	customerBoardContents : string;
  isSecret: boolean;
}

export interface PutCustomerBoardCommentRequestDto {
  customerBoardCommentContents : string;
}