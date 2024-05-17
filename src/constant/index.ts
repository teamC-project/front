// description : Navigation URL PATH
// export const AUTH_PATH = "/authentication";
export const TREND_BOARD_PATH = "trend_board"
export const TREND_BOARD_WRITE_PATH  = "write";
export const TREND_BOARD_DETAIL_PATH = ":trendBoardNumber";
export const TREND_BOARD_UPDATE_PATH = "update/:trendBoardNumber";
export const TREND_BOARD_DELETE_PATH = "delete/:trendBoardNumber";
// description: API URL PATH
export const SERVER_DOMAIN_URL = "http://localhost:4200";
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;
export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign_in`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email_auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email_auth_check`;
export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign_up`;
export const SERVER_TREND_BOARD_MODULE_URL = `${SERVER_API_URL}/trend_board`;

// description : 트렌드 절대 URL PATH
export const TREND_BOARD_ABSOLUTE_PATH = `${SERVER_API_URL}/ ${SERVER_TREND_BOARD_MODULE_URL}`;
export const TREND_BOARD_LIST_ABSOLUTE_PATH = `${SERVER_API_URL}/${TREND_BOARD_PATH}`
export const TREND_BOARD_WRITE_ABSOLUTE_PATH = `${SERVER_API_URL}/${TREND_BOARD_PATH}/${TREND_BOARD_WRITE_PATH}`;
export const TREND_BOARD_DETAIL_ABSOLUTE_PATH =(trendBoardNumber : number | string) => 
	`${SERVER_API_URL}/${TREND_BOARD_PATH}/${trendBoardNumber}`;
export const TREND_BOARD_UPDATE_ABSOLUTE_PATH = (trendBoardNumber : number | string) =>
	`${SERVER_API_URL}/${TREND_BOARD_PATH}/update${trendBoardNumber}`


// description: Navigation 절대 URL PATH
// export const AUTH_ABSOLUTE_PATH = AUTH_PATH;




// description: 게시물 상수

