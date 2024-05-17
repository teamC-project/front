// description : Navigation URL PATH
// export const AUTH_PATH = "/authentication";
export const TREND_BOARD_PATH = "trend_board"
export const TREND_BOARD_WRITE_PATH  = "write";
export const TREND_BOARD_DETAIL_PATH = ":trendBoardNumber";
export const TREND_BOARD_UPDATE_PATH = "update/:trendBoardNumber";

// description: Navigation 절대 URL PATH
// export const AUTH_ABSOLUTE_PATH = AUTH_PATH;

// description: API URL PATH
export const SERVER_DOMAIN_URL = "http://localhost:4200";
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;
export const SERVICE_URL = '/service';
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

// description : 트렌드 절대 URL PATH
export const TREND_BOARD_ABSOLUTE_PATH = `${SERVICE_URL}/ ${SERVER_TREND_BOARD_MODULE_URL}`;
export const TREND_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_URL}/${TREND_BOARD_PATH}`
export const TREND_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_URL}/${TREND_BOARD_PATH}/${TREND_BOARD_WRITE_PATH}`;
export const TREND_BOARD_DETAIL_ABSOLUTE_PATH =(trendBoardNumber : number | string) => 
	`${SERVICE_URL}/${TREND_BOARD_PATH}/${trendBoardNumber}`;
export const TREND_BOARD_UPDATE_ABSOLUTE_PATH = (trendBoardNumber : number | string) =>
	`${SERVICE_URL}/${TREND_BOARD_PATH}/update/${trendBoardNumber}`


// description: Navigation 절대 URL PATH
// export const AUTH_ABSOLUTE_PATH = AUTH_PATH;


// description : 트렌드 API URL PATH 
export const TREND_BOARD_MODULE_URL = `${SERVER_API_URL}/trend_board`;
export const POST_TREND_BOARD_WRITE_URL = `${SERVER_TREND_BOARD_MODULE_URL}/`;
export const GET_TREND_BOARD_LIST_URL = `${SERVER_TREND_BOARD_MODULE_URL}/list`
export const GET_TREND_BOARD_SEARCH_URL = `${SERVER_TREND_BOARD_MODULE_URL}/list/search`;
export const GET_TREND_BOARD_DETAIL_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}`;
export const PATCH_TREND_BOARD_LIKE_COUNT_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}/like_count`
export const DELETE_TREND_BOARD_DELETE_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}`;
export const PUT_TREND_BOARD_PUT_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}/${trendBoardNumber}`;





// description: 공지사항 API URL PATH
export const SERVER_ANNOUNCEMENT_BOARD_MODULE_URL = `${SERVER_API_URL}/announcement_board`;
export const POST_ANNOUNCEMENT_BOARD_WRITE_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/`;
export const GET_ANNONOUNCEMENT_BOARD_LIST_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list`;
export const GET_ANNOUNCEMENT_BOARD_SEARCH_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list/search`;
export const GET_ANNONOUNCEMENT_BOARD_DETAIL_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL =  (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}/increase_announcement_view_count`;
export const DELETE_ANNOUCEMENT_BOARD_DELETE_URL = 
(announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PUT_ANNOUNCEMENT_BOARD_PUT_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;

// description : 디자이너 API URL PATH
export const SERVER_DESIGNER_BOARD_MODULE_URL = `${SERVER_API_URL}/designer_board`;
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
