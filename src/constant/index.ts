// description : Navigation URL PATH
// export const AUTH_PATH = "/authentication";
export const TREND_BOARD_PATH = "trend_board"
export const TREND_BOARD_WRITE_PATH  = "write";
export const TREND_BOARD_DETAIL_PATH = ":trendBoardNumber";
export const TREND_BOARD_UPDATE_PATH = "update/:trendBoardNumber";
export const TREND_BOARD_DELETE_PATH = "delete/:trendBoardNumber";
export const DESIGNER_BOARD_PATH = "designer_board"
export const DESIGNER_BOARD_WRITE_PATH = "write";
export const DESIGNER_BOARD_DETAIL_PATH = ":designerBoardNumber";
export const DESIGNER_BOARD_UPDATE_PATH   = "update/:designerBoardNumber";
export const DESIGNER_BOARD_DELETE_PATH   = "delete/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_WRITE_PATH = "commentWrite/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_UPDATE_PATH = "comment/update/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_DELETE_PATH = "comment/delete/:designerBoardNumber";

// description: Navigation 절대 URL PATH
// export const AUTH_ABSOLUTE_PATH = AUTH_PATH;

// description: API URL PATH
export const SERVER_DOMAIN_URL = "http://localhost:4200";
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;

export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;
export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign_in`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email_auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email_auth_check`;
export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign_up`;
export const LOGOUT_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/logout`;
export const MY_PAGE_MODULE_URL = `${SERVER_AUTH_MODULE_URL}/my_page`;
export const UPDATE_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/update`;
export const USER_DELETE_URL = `${SERVER_AUTH_MODULE_URL}/user_delete`;
export const SERVER_TREND_BOARD_MODULE_URL = `${SERVER_API_URL}/trend_board`;
export const SERVER_DESIGNER_BOARD_MODULE_URL = `${SERVER_API_URL}/designer_board`;

// description : 트렌드 절대 URL PATH
export const TREND_BOARD_ABSOLUTE_PATH = `${SERVER_API_URL}/ ${SERVER_TREND_BOARD_MODULE_URL}`;
export const TREND_BOARD_LIST_ABSOLUTE_PATH = `${SERVER_API_URL}/${TREND_BOARD_PATH}`
export const TREND_BOARD_WRITE_ABSOLUTE_PATH = `${SERVER_API_URL}/${TREND_BOARD_PATH}/${TREND_BOARD_WRITE_PATH}`;
export const TREND_BOARD_DETAIL_ABSOLUTE_PATH =(trendBoardNumber : number | string) => 
	`${SERVER_API_URL}/${TREND_BOARD_PATH}/${trendBoardNumber}`;
export const TREND_BOARD_UPDATE_ABSOLUTE_PATH = (trendBoardNumber : number | string) =>
	`${SERVER_API_URL}/${TREND_BOARD_PATH}/update${trendBoardNumber}`

// description : 디자이너 절대 URL PATH
export const DESIGNER_BOARD_ABSOLUTE_PATH = `${SERVER_API_URL}/${SERVER_DESIGNER_BOARD_MODULE_URL}`;
export const DESIGNER_BOARD_LIST_ABSOLUTE_PATH = `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}`;
export const DESIGNER_BOARD_WRITE_ABSOLUTE_PATH = `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}/${DESIGNER_BOARD_WRITE_PATH}`;
export const DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}/${designerBoardNumber}`;
export const DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}/update${designerBoardNumber}`;
export const DESIGNER_BOARD_DELETE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}/delete${designerBoardNumber}`;
export const DESIGNER_BOARD_COMMENT_WIRTE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}/comment${designerBoardNumber}`;
export const DESIGNER_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}/comment/update${designerBoardNumber}`;
export const DESIGNER_BOARD_COMMENT_DELETE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVER_API_URL}/${DESIGNER_BOARD_PATH}/comment/delete${designerBoardNumber}`;

// description: Navigation 절대 URL PATH
// export const AUTH_ABSOLUTE_PATH = AUTH_PATH;




// description: 공지사항 API URL PATH
export const SERVER_ANNOUNCEMENT_BOARD_MODULE_URL = `${SERVER_API_URL}/announcement_board`;
export const POST_ANNOUNCEMENT_BOARD_WRITE_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/`;
export const GET_ANNOUNCEMENT_BOARD_LIST_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list`;
export const GET_ANNOUNCEMENT_BOARD_SEARCH_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list/search`;
export const GET_ANNONOUNCEMENT_BOARD_DETAIL_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL =  (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}/increase_announcement_view_count`;
export const DELETE_ANNOUCEMENT_BOARD_DELETE_URL = 
(announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const POST_ANNOUNCEMENT_BOARD_PUT_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;

// description : 디자이너 API URL PATH
export const POST_DESIGNER_BOARD_WRITE_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/`;
export const PUT_DESIGNER_BOARD_PUT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const DELETE_DESIGNER_BOARD_DELETE_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const GET_DESIGNER_BOARD_LIST_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/list`;
export const GET_SEARCH_DESIGNER_BOARD_LIST_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/list/search`;
export const GET_DESIGNER_BOARD_DETAIL_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const PATCH_DESIGNER_BOARD_INCREASE_VIEW_COUNT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/increase-view-count`;
export const POST_DESIGNER_BOARD_COMMENT_WRITE_REQUEST_URL =(designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
export const  PUT_DESIGNER_BOARD_COMMENT_PUT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
export const DELETE_DESIGNER_BOARD_COMMENT_DELETE_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
