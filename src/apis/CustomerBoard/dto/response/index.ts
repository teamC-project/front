import ResponseDto from "src/apis/response.dto";
import { CustomerBoardListItem } from "src/types";

export interface GetSearchCustomerBoardListResponseDto extends ResponseDto {
	customerBoardList : CustomerBoardListItem[];
}

export interface GetCustomerBoardListResponseDto extends ResponseDto {
	customerBoardList : CustomerBoardListItem[];
}

export interface GetCustomerBoardResponseDto extends ResponseDto {
	customerBoardNumber  : number;
	customerBoardStatus  : boolean;
	customerBoardTitle : string;
	customerBoardWriterId  : string;
	customerBoardContents : string;
	customerBoardViewCount : number;
	customerBoardComment : string | null;
}