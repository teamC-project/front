export interface QnaBoardListItem {
	qnaBoardNumber : number;
	qnaBoardStatus : boolean;
	qnaBoardTitle : string;
	qnaBoardWriterId : string;
	qnaBoardWriteDatetime : string;
	qnaBoardViewCount : number;
};

export interface TrendBoardListItem {
	trendBoardNumber : number ;
	trendBoardTitle : string;
	trendBoardWriterId : string;
	trendBoardWriteDatetime : string;
	trendBoardLikeCount : number;
	trendBoardThumbNailImage : string;
}

export interface CustomerBoardListItem {
	customerBoardNumber : number;
	customerBoardStatus : boolean;
	customerBoardTitle : string;
	customerBoardWriterId : string;
	customerBoardWriteDatetime : string ;
	customerBoardViewCount : number;
	customerBoardIsSecret: boolean;
}	
export interface CustomerBoardCommentListItem {
	customerBoardCommentNumber : number;
	customerBoardCommentWriterId : string;
	customerBoardCommentDatetime : string;
	customerBoardCommentContents : string;
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
	designerBoardCommentContents : string;
	designerBoardCommentDatetime : string;
};