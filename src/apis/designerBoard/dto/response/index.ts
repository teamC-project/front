import ResponseDto from "src/apis/response.dto";
import { DesignerBoardListItem } from "src/types";

export interface GetDesignerBoardListResponseDto extends ResponseDto {
    designerBoardList: DesignerBoardListItem[];
}

export interface GetSearchDesignerBoardListResponseDto extends ResponseDto {
    designerBoardList: DesignerBoardListItem[];
}

export interface GetDesignerBoardResponseDto extends ResponseDto {
    designerBoardNumber: number;
    title: string;
    writerId: string;
    writeDatetime: string;
    viewCount: number;
    contents: string;
    comment: string | null; 
}