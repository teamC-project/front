export interface PostTrendBoardRequestDto {
	trendBoardTitle : string;
	trendBoardContents : string;
	trendBoardThumbnailImage : string;
}

export interface PostTrendBoardCommentRequestDto {
	trendBoardCommentContents : string;
}

export interface PutTrendBoardRequestDto {
	trendBoardTitle :string;
	trendBoardContents : string;
	trendBoardThumbnailImage : string;
}

export interface PutTrendBoardCommentRequestDto {
	trendBoardCommentContents : string;
}