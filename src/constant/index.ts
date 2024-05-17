// description : Navigation URL PATH
// export const AUTH_PATH = "/authentication";
export const AUNNOUNCEMENT_BOARD_PATH = "/aunnouncement_board";

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


export const SERVER_ANNOUNCEMENT_BOARD_MODULE_URL = `${SERVER_API_URL}/announcement_board`;
export const POST_ANNOUNCEMENT_BOARD_WRITE_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/`;
export const GET_ANNONOUNCEMENT_BOARD_LIST_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list`;
export const GET_ANNOUNCEMENT_BOARD_SEARCH_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/list/search`;
export const GET_ANNONOUNCEMENT_BOARD_DETAIL_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL =  (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}/increase_announcement_view_count`;
export const DELETE_ANNOUCEMENT_BOARD_DELETE_URL = 
(announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const POST_ANNOUNCEMENT_BOARD_PUT_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;

// description: 게시물 상수

