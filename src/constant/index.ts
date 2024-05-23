// description : Navigation URL PATH
export const MAIN_PATH = "/main";
export const ON_PATH = "on";
export const OFF_PATH = "off"

export const AUTH_PATH = "/authentication";
export const SERVICE_PATH = "/service";

export const SIGN_IN_PATH = "sign_in";
export const EMAIL_AUTH_REQUEST_PATH = "email_auth";
export const EMAIL_AUTH_CHECK_REQUEST_PATH = "email_auth_check";
export const SIGN_UP_REQUEST_PATH = "sign_up;"
export const LOGOUT_REQUEST_PATH = "logout";
export const MY_PAGE_PATH = "my_page;"
export const UPDATE_REQUEST_PATH = "update";
export const USER_DELETE_PATH = "user_delete";

export const AUNNOUNCEMENT_BOARD_PATH = "aunnouncement_board";
export const AUNNOUNCEMENT_BOARD_WRITE_PATH  = "write";
export const AUNNOUNCEMENT_BOARD_DETAIL_PATH = ":aunnouncementBoardNumber";
export const AUNNOUNCEMENT_BOARD_UPDATE_PATH = "update/:aunnouncementBoardNumber";
export const AUNNOUNCEMENT_BOARD_DELETE_PATH = "delete/:aunnouncementBoardNumber";

export const TREND_BOARD_PATH = "trend_board"
export const TREND_BOARD_WRITE_PATH  = "write";
export const TREND_BOARD_DETAIL_PATH = ":trendBoardNumber";
export const TREND_BOARD_UPDATE_PATH = "update/:trendBoardNumber";
export const TREND_BOARD_DELETE_PATH = "delete/:trendBoardNumber";
export const TREND_BOARD_COMMENT_WRITE_PATH = "comment/write/:trendBoardNumber";
export const TREND_BOARD_COMMENT_UPDATE_PATH = "comment/update/:trendBoardNumber";
export const TREND_BOARD_COMMENT_DELETE_PATH = "comment/delete/:trendBoardNumber";

export const QNA_BOARD_PATH = 'qna_board'
export const QNA_BOARD_WRITE_PATH = "write";
export const QNA_BOARD_DETAIL_PATH = ":qnaBoardNumber";
export const QNA_BOARD_UPDATE_PATH = "update/:qnaBoardNumber";
export const QNA_BOARD_DELETE_PATH = "delete/:qnaBoardNumber";
export const QNA_BOARD_COMMENT_WRITE_PATH = "comment/write/:qnaBoardNumber";
export const QNA_BOARD_COMMENT_UPDATE_PATH = "comment/update/:qnaBoardNumber";
export const QNA_BOARD_COMMENT_DELETE_PATH = "comment/delete/:qnaBoardNumber";

export const CUSTOMER_BOARD_PATH = "customer_board"
export const CUSTOMER_BOARD_WRITE_PATH = "write";
export const CUSTOMER_BOARD_DETAIL_PATH = ":customerBoardNumber";
export const CUSTOMER_BOARD_UPDATE_PATH   = "update/:customerBoardNumber";
export const CUSTOMER_BOARD_DELETE_PATH   = "delete/:customerBoardNumber";
export const CUSTOMER_BOARD_COMMENT_WRITE_PATH = "comment/write/:customerBoardNumber";
export const CUSTOMER_BOARD_COMMENT_UPDATE_PATH = "comment/update/:customerBoardNumber";
export const CUSTOMER_BOARD_COMMENT_DELETE_PATH = "comment/delete/:customerBoardNumber";

export const DESIGNER_BOARD_PATH = "designer_board"
export const DESIGNER_BOARD_WRITE_PATH = "write";
export const DESIGNER_BOARD_DETAIL_PATH = ":designerBoardNumber";
export const DESIGNER_BOARD_UPDATE_PATH   = "update/:designerBoardNumber";
export const DESIGNER_BOARD_DELETE_PATH   = "delete/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_WRITE_PATH = "comment/write/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_UPDATE_PATH = "comment/update/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_DELETE_PATH = "comment/delete/:designerBoardNumber";

// description: API URL PATH
export const SERVER_DOMAIN_URL = "http://localhost:4200";
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;
export const SERVER_ANNOUNCEMENT_BOARD_MODULE_URL = `${SERVER_API_URL}/announcement_board`;
export const SERVER_TREND_BOARD_MODULE_URL = `${SERVER_API_URL}/trend_board`;
export const SERVER_QNA_BOARD_MODULE_URL = `${SERVER_API_URL}/qna_board`
export const SERVER_CUSTOMER_BOARD_MODULE_URL = `${SERVER_API_URL}/customer_board`;
export const SERVER_DESIGNER_BOARD_MODULE_URL = `${SERVER_API_URL}/designer_board`;

// description : Main 절대 URL PATH
export const MAIN_ON_PATH = `${MAIN_PATH}/${ON_PATH}`
export const MAIN_OFF_PATH = `${MAIN_PATH}/${OFF_PATH}`

// description : Auth 절대 URL PATH
export const AUTH_ABSOLUTE_PATH = `${AUTH_PATH}`;
export const SIGN_IN_REQUEST_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`
export const EMAIL_AUTH_REQUEST_ABSOLUTE_PATH = `${AUTH_PATH}/${EMAIL_AUTH_REQUEST_PATH}`;
export const EMAIL_AUTH_CHECK_REQUEST_ABSOLUTE_PATH = `${AUTH_PATH}/${EMAIL_AUTH_CHECK_REQUEST_PATH}`;
export const SIGN_UP_REQUEST_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_REQUEST_PATH}`;
export const LOGOUT_REQUEST_ABSOLUTE_PATH = `${AUTH_PATH}/${LOGOUT_REQUEST_PATH}`;
export const MY_PAGE_ABSOLUTE_PATH = `${AUTH_PATH}/${UPDATE_REQUEST_PATH}`;
export const USER_DELETE_ABSOLUTE_PATH = `${AUTH_PATH}/${USER_DELETE_PATH}`;

// description : 공지사항 절대 URL PATH
export const ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${AUNNOUNCEMENT_BOARD_PATH}`
export const ANNOUNCEMENT_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${AUNNOUNCEMENT_BOARD_PATH}/${AUNNOUNCEMENT_BOARD_WRITE_PATH}`;
export const ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH =(announcementBoardNumber : number | string) => 
	`${SERVICE_PATH}/${AUNNOUNCEMENT_BOARD_PATH}/${announcementBoardNumber}`;
export const ANNOUNCEMENT_BOARD_UPDATE_ABSOLUTE_PATH = (announcementBoardNumber : number | string) =>
	`${SERVICE_PATH}/${AUNNOUNCEMENT_BOARD_PATH}/update/${announcementBoardNumber}`
export const ANNOUNCEMENT_BOARD_DELETE_ABSOLUTE_PATH =  (announcementBoardNumber: number | string) => `${SERVICE_PATH}/${AUNNOUNCEMENT_BOARD_PATH}/delete${announcementBoardNumber}`;

// description : 트렌드 절대 URL PATH
export const TREND_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${TREND_BOARD_PATH}`
export const TREND_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${TREND_BOARD_PATH}/${TREND_BOARD_WRITE_PATH}`;
export const TREND_BOARD_DETAIL_ABSOLUTE_PATH =(trendBoardNumber : number | string) => 
	`${SERVICE_PATH}/${TREND_BOARD_PATH}/${trendBoardNumber}`;
export const TREND_BOARD_UPDATE_ABSOLUTE_PATH = (trendBoardNumber : number | string) =>
	`${SERVICE_PATH}/${TREND_BOARD_PATH}/update/${trendBoardNumber}`
export const TREND_BOARD_DELETE_ABSOLUTE_PATH =  (trendBoardNumber: number | string) => `${SERVICE_PATH}/${TREND_BOARD_PATH}/delete${trendBoardNumber}`;
export const TREND_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (trendBoardNumber: number | string) => `${SERVICE_PATH}/${TREND_BOARD_PATH}/comment${trendBoardNumber}`;
export const TREND_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (trendBoardNumber: number | string) => `${SERVICE_PATH}/${TREND_BOARD_PATH}/comment/update${trendBoardNumber}`;


// description : QNA 절대 URL PATH
export const QNA_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_BOARD_PATH}`
export const QNA_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_BOARD_PATH}/${QNA_BOARD_WRITE_PATH}`;
export const QNA_BOARD_DETAIL_ABSOLUTE_PATH =(qnaBoardNumber : number | string) => 
`${SERVICE_PATH}/${QNA_BOARD_PATH}/${qnaBoardNumber}`;
export const QNA_BOARD_UPDATE_ABSOLUTE_PATH = (qnaBoardNumber : number | string) =>
	`${SERVICE_PATH}/${QNA_BOARD_PATH}/update/${qnaBoardNumber}`
export const QNA_BOARD_DELETE_ABSOLUTE_PATH =  (qnaBoardNumber: number | string) => `${SERVICE_PATH}/${QNA_BOARD_PATH}/delete${qnaBoardNumber}`;
export const QNA_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (qnaBoardNumber: number | string) => `${SERVICE_PATH}/${QNA_BOARD_PATH}/comment${qnaBoardNumber}`;
export const QNA_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (qnaBoardNumber: number | string) => `${SERVICE_PATH}/${QNA_BOARD_PATH}/comment/update${qnaBoardNumber}`;
export const QNA_BOARD_COMMENT_DELETE_ABSOLUTE_PATH =  (qnaBoardNumber: number | string) => `${SERVICE_PATH}/${QNA_BOARD_PATH}/comment/delete${qnaBoardNumber}`;

// description : 소통 플랫폼 절대 URL PATH
export const CUSTOMER_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}`;
export const CUSTOMER_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}/${DESIGNER_BOARD_WRITE_PATH}`;
export const CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/${customerBoardNumber}`;
export const CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/update${customerBoardNumber}`;
export const CUSTOMER_BOARD_DELETE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/delete${customerBoardNumber}`;
export const CUSTOMER_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/comment${customerBoardNumber}`;
export const CUSTOMER_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/comment/update${customerBoardNumber}`;
export const CUSTOMER_BOARD_COMMENT_DELETE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/comment/delete${customerBoardNumber}`;

// description : 디자이너 절대 URL PATH
export const DESIGNER_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}`;
export const DESIGNER_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/${DESIGNER_BOARD_WRITE_PATH}`;
export const DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/${designerBoardNumber}`;
export const DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/update${designerBoardNumber}`;
export const DESIGNER_BOARD_DELETE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/delete${designerBoardNumber}`;
export const DESIGNER_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/comment${designerBoardNumber}`;
export const DESIGNER_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/comment/update${designerBoardNumber}`;

// description : AUTH API URL PATH 
export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign_in`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email_auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email_auth_check`;
export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign_up`;
export const LOGOUT_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/logout`;
export const MY_PAGE_URL = `${SERVER_AUTH_MODULE_URL}/my_page`;
export const UPDATE_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/update`;
export const USER_DELETE_URL = `${SERVER_AUTH_MODULE_URL}/user_delete`;

// description: ANNOUNCEMENT API URL PATH
export const POST_ANNOUNCEMENT_BOARD_WRITE_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/`;
export const GET_ANNOUNCEMENT_BOARD_LIST_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list`;
export const GET_ANNOUNCEMENT_BOARD_SEARCH_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list/search`;
export const GET_ANNOUNCEMENT_BOARD_DETAIL_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL =  (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}/increase_announcement_view_count`;
export const DELETE_ANNOUCEMENT_BOARD_DELETE_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PUT_ANNOUNCEMENT_BOARD_PUT_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;

// description : TREND API URL PATH 
export const POST_TREND_BOARD_WRITE_URL = `${SERVER_TREND_BOARD_MODULE_URL}/`;
export const GET_TREND_BOARD_LIST_URL = `${SERVER_TREND_BOARD_MODULE_URL}/list`
export const GET_TREND_BOARD_SEARCH_URL = `${SERVER_TREND_BOARD_MODULE_URL}/list/search`;
export const GET_TREND_BOARD_DETAIL_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}`;
export const PATCH_TREND_BOARD_LIKE_COUNT_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}/like_count`
export const DELETE_TREND_BOARD_DELETE_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}`;
export const PUT_TREND_BOARD_PUT_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}`;

export const POST_TREND_BOARD_COMMENT_WRITE_URL =(trendBoardNumber: number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}/comment`;
export const PUT_TREND_BOARD_COMMENT_PUT_URL = (trendBoardNumber: number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}/comment`;
export const DELETE_TREND_BOARD_COMMENT_DELETE_URL = (trendBoardNumber: number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}/comment`;

// description : Q&A API URL PATH
export const POST_QNA_BOARD_WRITE_URL = `${SERVER_QNA_BOARD_MODULE_URL}/`;
export const GET_QNA_BOARD_LIST_URL = `${SERVER_QNA_BOARD_MODULE_URL}/list`;
export const GET_SEARCH_QNA_BOARD_LIST_URL = `${SERVER_QNA_BOARD_MODULE_URL}/list/search`;
export const GET_QNA_BOARD_DETAIL_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}`;
export const PUT_QNA_BOARD_PUT_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}`;
export const DELETE_QNA_BOARD_DELETE_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}`;
export const PATCH_QNA_BOARD_INCREASE_VIEW_COUNT_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/increase-view-count`;
export const POST_QNA_BOARD_COMMENT_WRITE_URL =(qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/comment`;
export const  PUT_QNA_BOARD_COMMENT_PUT_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/comment`;
export const DELETE_QNA_BOARD_COMMENT_DELETE_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/comment`;

// description : 소통 플랫폼 API URL PATH
export const POST_CUSTOMER_BOARD_WRITE_URL = `${SERVER_CUSTOMER_BOARD_MODULE_URL}/`;
export const GET_CUSTOMER_BOARD_LIST_URL = `${SERVER_CUSTOMER_BOARD_MODULE_URL}/list`;
export const GET_SEARCH_CUSTOMER_BOARD_LIST_URL = `${SERVER_CUSTOMER_BOARD_MODULE_URL}/list/search`;
export const GET_CUSTOMER_BOARD_DETAIL_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}`;
export const PUT_CUSTOMER_BOARD_PUT_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}`;
export const DELETE_CUSTOMER_BOARD_DELETE_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}`;
export const PATCH_CUSTOMER_BOARD_INCREASE_VIEW_COUNT_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/increase-view-count`;
export const POST_CUSTOMER_BOARD_COMMENT_WRITE_REQUEST_URL =(customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/comment`;
export const  PUT_CUSTOMER_BOARD_COMMENT_PUT_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/comment`;
export const DELETE_CUSTOMER_BOARD_COMMENT_DELETE_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/comment`;

// description : DESIGNER API URL PATH
export const POST_DESIGNER_BOARD_WRITE_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/`;
export const GET_DESIGNER_BOARD_LIST_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/list`;
export const GET_SEARCH_DESIGNER_BOARD_LIST_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/list/search`;
export const GET_DESIGNER_BOARD_DETAIL_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const PUT_DESIGNER_BOARD_PUT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const DELETE_DESIGNER_BOARD_DELETE_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const PATCH_DESIGNER_BOARD_INCREASE_VIEW_COUNT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/increase-view-count`;
export const POST_DESIGNER_BOARD_COMMENT_WRITE_URL =(designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
export const  PUT_DESIGNER_BOARD_COMMENT_PUT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
export const DELETE_DESIGNER_BOARD_COMMENT_DELETE_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;