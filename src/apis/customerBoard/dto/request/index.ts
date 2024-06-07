export interface PostCustomerBoardRequestDto {
  customerBoardTitle: string;
  customerBoardContents: string;
  isSecret: boolean;
}

export interface PostCustomerBoardCommentRequestDto {
	customerBoardComment : string;
}

export interface PutCustomerBoardRequestDto {
	customerBoardTitle : string ;
	customerBoardContents : string;
  isSecret: boolean;
}

export interface PutCustomerBoardCommentRequestDto {
  customerBoardComment : string;
}