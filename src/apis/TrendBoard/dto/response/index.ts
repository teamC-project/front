import ResponseDto from 'src/apis/response.dto';
import { TrendBoardListItem } from 'src/types';
	export interface GetTrendBoardListResponseDto extends ResponseDto {
		trendBoardList : TrendBoardListItem[];
	}

	export interface GetSearchTrendBoardListResponseDto extends ResponseDto {
		trendBoardList : TrendBoardListItem[];
	}

