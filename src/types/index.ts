export interface QnaBoardListItem {
	qnaBoardNumber: number;
	qnaBoardStatus: boolean;
	qnaBoardTitle: string;
	qnaBoardWriterId: string;
	qnaBoardWriteDatetime: string;
	qnaBoardViewCount: number;
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
	trendBoardThumbnailImage : string;
}

export interface TrendBoardCommentListItem {
	trendBoardCommentNumber : number;
	trendBoardCommentWriterId : string;
	trendBoardCommentContents : string;
	trendBoardCommentDatetime : string;
}

export interface CustomerBoardListItem {
	customerBoardNumber : number;
	customerBoardStatus : boolean;
	customerBoardTitle : string;
	customerBoardWriterId : string;
	customerBoardWriteDatetime : string ;
	customerBoardViewCount : number;
  // customerBoardCommentCount : number;
	secret: boolean;
}	
export interface CustomerBoardCommentListItem {
	customerBoardCommentNumber : number;
	customerBoardCommentWriterId : string;
	customerBoardCommentWriteDatetime : string;
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

export interface ChatroomList {
	roomId: number;
	customerId: string;
	designerId: string;
	roomName: string;
}

export interface ChatMessageList {
	chatSenderId: string;
	chatReceiverId: string;
	chatMessages: string;
}