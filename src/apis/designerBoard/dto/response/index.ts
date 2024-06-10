import ResponseDto from "src/apis/response.dto";
import { DesignerBoardCommentListItem, DesignerBoardListItem } from "src/types";

export interface GetDesignerBoardListResponseDto extends ResponseDto {
    designerBoardList: DesignerBoardListItem[];
}

export interface GetDesignerBoardCommentListResponseDto extends ResponseDto {
    designerBoardCommentList: DesignerBoardCommentListItem[];
}

export interface GetSearchDesignerBoardListResponseDto extends ResponseDto {
    designerBoardList: DesignerBoardListItem[];
}

export interface GetDesignerBoardResponseDto extends ResponseDto {
    designerBoardNumber: number;
    designerBoardTitle: string;
    designerBoardWriterId: string;
    designerBoardWriteDatetime: string;
    designerBoardViewCount: number;
    designerBoardContents: string;
    designerBoardComment: string | null; 
}