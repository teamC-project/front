export interface PostTrendBoardRequestDto {
	trendBoardTitle : string;
	trendBoardContents : string;
	trendBoardThumbNailImage : string;
}

export interface PostTrendBoardCommentRequestDto {
	trendBoardCommentContents : string;
}

export interface PutTrendBoardRequestDto {
	trendBoardTitle :string;
	trendBoardContents : string;
	trendBoardUrlList : string;
}

export interface PutTrendBoardCommentRequestDto {
	trendBoardCommentContents : string;
}