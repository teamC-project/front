import ResponseDto from 'src/apis/response.dto';
<<<<<<< HEAD
import { TrendBoardCommentListItem, TrendBoardListItem } from 'src/types';
	export interface GetTrendBoardListResponseDto extends ResponseDto {
		trendBoardList : TrendBoardListItem[];
	}
=======
import { TrendBoardCommentListItem, TrendBoardLikeListItem, TrendBoardListItem } from 'src/types';
export interface GetTrendBoardListResponseDto extends ResponseDto {
	trendBoardList : TrendBoardListItem[];
}
>>>>>>> aff6534144249353720ee354fca2b746b02530af

export interface GetSearchTrendBoardListResponseDto extends ResponseDto {
	trendBoardList : TrendBoardListItem[];
}

export interface GetTrendBoardLikeListResponseDto extends ResponseDto {
	likeList : string[];
}

export interface GetTrendBoardCommentListResponseDto extends ResponseDto {
	trendBoardCommentList : TrendBoardCommentListItem[];
}

export interface GetTrendBoardResponseDto extends ResponseDto {
	trendBoardNumber : number;
	trendBoardTitle : string;
	trendBoardContents : string;
	trendBoardWriterId  : string;
	trendBoardWriteDateTime : string;
	trendBoardLikeCount : number;
	trendBoardViewCount : number;
}

export interface GetTrendBoardLikeResponseDto extends ResponseDto {
	userId : string;
}

