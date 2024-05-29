import ResponseDto from "src/apis/response.dto";
import { CustomerBoardListItem } from "src/types";

export interface GetSearchCustomerBoardResponseDto extends ResponseDto {
	customerBoardList : CustomerBoardListItem[];
}

export interface GetCustomerBoardListResponseDto extends ResponseDto {
	customerBoardList : CustomerBoardListItem[];
}

export interface GetCustomerBoardResponseDto extends ResponseDto {
  customerBoardNumber: number;
  customerBoardTitle: string;
  customerBoardWriterId: string;
  customerBoardContents: string;
  customerBoardViewCount: number;
  customerBoardWriteDatetime: string;
}