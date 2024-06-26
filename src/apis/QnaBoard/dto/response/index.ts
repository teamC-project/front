import ResponseDto from "src/apis/response.dto";
import { QnaBoardListItem } from "src/types";

export interface GetSearchQnaBoardListResponseDto extends ResponseDto {
	qnaBoardList : QnaBoardListItem[];
}

export interface GetQnaBoardListResponseDto extends ResponseDto {
	qnaBoardList : QnaBoardListItem[];
}

export interface GetQnaBoardResponseDto extends ResponseDto {
	qnaBoardNumber  : number;
	qnaBoardStatus  : boolean;
	qnaBoardTitle : string;
	qnaBoardWriterId  : string;
	qnaBoardWriteDatetime : string;
	qnaBoardContents : string;
	qnaBoardViewCount : number;
	qnaBoardComment : string | null;
}