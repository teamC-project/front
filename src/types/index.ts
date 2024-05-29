export interface QnaBoardListItem {
	qnaBoardNumber : number;
	qnaBoardStatus : boolean;
	qnaBoardTitle : string;
	qnaBoardWriterId : string;
	qnaBoardWriteDatetime : string ;
	qnaBoardViewCount : number;
};

export interface DesignerBoardListItem {
	designerBoardNumber : number;
	designerBoardTitle : string;
	designerBoardWriterId : string;
	designerBoardWriteDatetime : string ;
	designerBoardViewCount : number;
};

export interface DesignerBoardCommentListItem {
	designerBoardCommentNumber : number;
	designerBoardCommentWriterId : string;
	designerBoardCommentDatetime : string;
};