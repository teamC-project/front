export interface PostCustomerBoardRequestDto {
  title: string;
  contents: string;
  isSecret: boolean;
}

export interface PostCustomerBoardCommentRequestDto {
	comment : string;
}

export interface PutCustomerBoardRequestDto {
	title : string ;
	contents : string;
}