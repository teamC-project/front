export interface PostDesignerBoardRequestDto {
    designerBoardTitle : string;
    designerBoardContents : string;
}

export interface PostDesignerBoardCommentRequestDto {
    designerBoardCommentContents : string;
    designerBoardParentCommentNumber?: number;
}

export interface PutDesignerBoardRequestDto {
    designerBoardTitle : string;
    designerBoardContents : string;
}

export interface PutDesignerBoardCommentRequestDto {
    designerBoardCommentContents : string;
    designerBoardCommentNumber: number;
}