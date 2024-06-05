export interface PostTrendBoardRequestDto {
	trendBoardTitle : string;
	trendBoardContents : string;
	trendBoardThumbNailImage : string;
}

export interface PostTrendBoardCommentRequestDto {
	comment : string;
}

export interface PutTrendBoardRequestDto {
	trendBoardTitle :string;
	trendBoardContents : string;
	trendBoardUrlList : string;
}