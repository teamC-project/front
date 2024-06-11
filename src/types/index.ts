export interface QnaBoardListItem {
	qnaBoardNumber : number;
	qnaBoardStatus : boolean;
	qnaBoardTitle : string;
	qnaBoardWriterId : string;
	qnaBoardWriteDatetime : string;
	qnaBoardViewCount : number;
};

export interface QnaBoardCommentListItem {
	qnaBoardCommentNumber : number;
	qnaBoardCommentWriterId : string;
	qnaBoardCommentContents : string;
	qnaBoardCommentDatetime : string;
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
	secret: boolean;
}	
export interface CustomerBoardCommentListItem {
	customerBoardCommentNumber : number;
	customerBoardCommentWriterId : string;
	customerBoardCommentDatetime : string;
	customerBoardCommentContents : string;
	customerBoardParentCommentNumber?: number;
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
export interface AnnouncementBoardListItem {
	announcementBoardNumber: number;
	announcementBoardTitle: string;
	announcementBoardWriterId: string;
	announcementBoardWriteDatetime: string;
	announcementBoardViewCount: number;
}