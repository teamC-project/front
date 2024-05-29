export interface PostTrendBoardRequestDto {
	trendBoardTitle : string;
	trendBoardContents : string;
}

export interface PostTrendBoardCommentRequestDto {
	comment : string;
}

export interface PutTrendBoardRequestDto {
	title :string;
	contents : string;
}