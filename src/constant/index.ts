// description : Navigation URL PATH
// export const AUTH_PATH = "/authentication";

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


// description: 게시물 상수