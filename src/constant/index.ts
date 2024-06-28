// description : Navigation URL PATH
export const LOCALHOST = process.env.REACT_APP_BACK_URL + ":4200/api/v1/auth/oauth2/"
export const SNS_PATH = "/sns/:accessToken/:expires";
export const MAIN_PATH = "/main";
export const FOOTER_PATH = "footer";

export const AUTH_PATH = "/auth";
export const SIGN_IN_PATH = "sign-in";
export const SIGN_UP_PATH = "sign-up";
export const CUSTOMER_PATH = "customer";
export const DESIGNER_PATH = "designer";
export const ID_FOUND_PATH = "id-found";
export const PASSWORD_FOUND_PATH = "password-found";
export const PASSOWORD_RESET_PATH = "password-reset";

export const SERVICE_PATH = "/service";

export const LOGIN_LOG_PATH = "/login-log";

export const MY_PAGE_PATH = "my-page";
export const UPDATE_CUSTOMER_INFO_PATH = "info-customer";
export const UPDATE_DESIGNER_INFO_PATH = "info-designer";
export const UPDATE_PASSWORD_PATH = "update-user-password"
export const DELETE_INFO_PATH = "delete-user-info";
export const CHANGE_PASSWORD_PATH = "change-user-password";

export const ANNOUNCEMENT_BOARD_PATH = "announcement_board";
export const ANNOUNCEMENT_BOARD_WRITE_PATH  = "write";
export const ANNOUNCEMENT_BOARD_DETAIL_PATH = ":announcementBoardNumber";
export const ANNOUNCEMENT_BOARD_UPDATE_PATH = "update/:announcementBoardNumber";

export const TREND_BOARD_PATH = "trend_board";
export const TREND_BOARD_WRITE_PATH  = "write";
export const TREND_BOARD_DETAIL_PATH = ":trendBoardNumber";
export const TREND_BOARD_UPDATE_PATH = "update/:trendBoardNumber";
export const TREND_BOARD_COMMENT_WRITE_PATH = "comment/write/:trendBoardNumber";
export const TREND_BOARD_COMMENT_UPDATE_PATH = "comment/update/:trendBoardNumber";

export const QNA_BOARD_PATH = 'qna_board';
export const QNA_BOARD_WRITE_PATH = "write";
export const QNA_BOARD_DETAIL_PATH = ":qnaBoardNumber";
export const QNA_BOARD_UPDATE_PATH = "update/:qnaBoardNumber";
export const QNA_BOARD_COMMENT_WRITE_PATH = "comment/write/:qnaBoardNumber";
export const QNA_BOARD_COMMENT_UPDATE_PATH = "comment/update/:qnaBoardNumber";

export const CUSTOMER_BOARD_PATH = "customer_board";
export const CUSTOMER_BOARD_WRITE_PATH = "write";
export const CUSTOMER_BOARD_DETAIL_PATH = ":customerBoardNumber";
export const CUSTOMER_BOARD_UPDATE_PATH   = "update/:customerBoardNumber";
export const CUSTOMER_BOARD_COMMENT_WRITE_PATH = "comment/write/:customerBoardNumber";
export const CUSTOMER_BOARD_COMMENT_UPDATE_PATH = "comment/update/:customerBoardNumber";

export const DESIGNER_BOARD_PATH = "designer_board";
export const DESIGNER_BOARD_WRITE_PATH = "write";
export const DESIGNER_BOARD_DETAIL_PATH = ":designerBoardNumber";
export const DESIGNER_BOARD_UPDATE_PATH   = "update/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_WRITE_PATH = "comment/write/:designerBoardNumber";
export const DESIGNER_BOARD_COMMENT_UPDATE_PATH = "comment/update/:designerBoardNumber";

export const CHAT_PATH = "chat";
export const CHAT_ROOM_PATH = "room";
export const CHAT_ROOM_DETAIL_PATH = "roomId";
export const CHAT_ROOM_MESSAGE_PATH = "room/:roomId/message";

// description : Auth 절대 URL PATH
export const AUTH_ABSOLUTE_PATH = `${AUTH_PATH}`;
export const AUTH_SIGN_IN_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`;
export const AUTH_SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}`;
export const AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}/${CUSTOMER_PATH}`;
export const AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}/${DESIGNER_PATH}`;
export const ID_FOUND_ABSOLUTE_PATH = `${AUTH_PATH}/${ID_FOUND_PATH}`;
export const PASSWORD_FOUND_ABSOLUTE_PATH = `${AUTH_PATH}/${PASSWORD_FOUND_PATH}`;
export const AUTH_PASSOWORD_RESET_ABSOLUTE_PATH = `${AUTH_PATH}/${PASSOWORD_RESET_PATH}`;

// description : MYPAGE 절대 URL PATH
export const MY_PAGE_ABSOLUTE_PATH = `${SERVICE_PATH}/${MY_PAGE_PATH}`;
export const UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH = `${SERVICE_PATH}/${MY_PAGE_PATH}/${UPDATE_CUSTOMER_INFO_PATH}`;
export const UPDATE_DESIGNER_INFO_ABSOLUTE_PATH = `${SERVICE_PATH}/${MY_PAGE_PATH}/${UPDATE_DESIGNER_INFO_PATH}`;
export const CHANGE_PASSWORD_ABSOLUTE_PATH = `${SERVICE_PATH}/${MY_PAGE_PATH}/${CHANGE_PASSWORD_PATH}`;
export const DELETE_INFO_ABSOLUTE_PATH = `${SERVICE_PATH}/${MY_PAGE_PATH}/${DELETE_INFO_PATH}`;

// description : 공지사항 절대 URL PATH
export const ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${ANNOUNCEMENT_BOARD_PATH}`;
export const ANNOUNCEMENT_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${ANNOUNCEMENT_BOARD_PATH}/${ANNOUNCEMENT_BOARD_WRITE_PATH}`;
export const ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH =(announcementBoardNumber : number | string) => 
`${SERVICE_PATH}/${ANNOUNCEMENT_BOARD_PATH}/${announcementBoardNumber}`;
export const ANNOUNCEMENT_BOARD_UPDATE_ABSOLUTE_PATH = (announcementBoardNumber : number | string) =>
`${SERVICE_PATH}/${ANNOUNCEMENT_BOARD_PATH}/update/${announcementBoardNumber}`;

// description : 트렌드 절대 URL PATH
export const TREND_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${TREND_BOARD_PATH}`
export const TREND_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${TREND_BOARD_PATH}/${TREND_BOARD_WRITE_PATH}`;
export const TREND_BOARD_DETAIL_ABSOLUTE_PATH =(trendBoardNumber : number | string) => 
`${SERVICE_PATH}/${TREND_BOARD_PATH}/${trendBoardNumber}`;
export const TREND_BOARD_UPDATE_ABSOLUTE_PATH = (trendBoardNumber : number | string) =>
`${SERVICE_PATH}/${TREND_BOARD_PATH}/update/${trendBoardNumber}`;
export const TREND_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (trendBoardNumber: number | string) => `${SERVICE_PATH}/${TREND_BOARD_PATH}/comment${trendBoardNumber}`;
export const TREND_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (trendBoardNumber: number | string) => `${SERVICE_PATH}/${TREND_BOARD_PATH}/comment/update${trendBoardNumber}`;

// description : QNA 절대 URL PATH
export const QNA_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_BOARD_PATH}`
export const QNA_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_BOARD_PATH}/${QNA_BOARD_WRITE_PATH}`;
export const QNA_BOARD_DETAIL_ABSOLUTE_PATH =(qnaBoardNumber : number | string) => 
`${SERVICE_PATH}/${QNA_BOARD_PATH}/${qnaBoardNumber}`;
export const QNA_BOARD_UPDATE_ABSOLUTE_PATH = (qnaBoardNumber : number | string) =>
`${SERVICE_PATH}/${QNA_BOARD_PATH}/update/${qnaBoardNumber}`;
export const QNA_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (qnaBoardNumber: number | string) => `${SERVICE_PATH}/${QNA_BOARD_PATH}/comment${qnaBoardNumber}`;
export const QNA_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (qnaBoardNumber: number | string) => `${SERVICE_PATH}/${QNA_BOARD_PATH}/comment/update${qnaBoardNumber}`;

// description : 소통 플랫폼 절대 URL PATH
export const CUSTOMER_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}`;
export const CUSTOMER_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}/${CUSTOMER_BOARD_WRITE_PATH}`;
export const CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}/${customerBoardNumber}`;
export const CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}/update/${customerBoardNumber}`;
export const CUSTOMER_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}/comment/${customerBoardNumber}`;
export const CUSTOMER_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (customerBoardNumber: number | string) => `${SERVICE_PATH}/${CUSTOMER_BOARD_PATH}/comment/update/${customerBoardNumber}`;

// description : 디자이너 절대 URL PATH
export const DESIGNER_BOARD_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}`;
export const DESIGNER_BOARD_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/${DESIGNER_BOARD_WRITE_PATH}`;
export const DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/${designerBoardNumber}`;
export const DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/update/${designerBoardNumber}`;
export const DESIGNER_BOARD_COMMENT_WRITE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/comment/${designerBoardNumber}`;
export const DESIGNER_BOARD_COMMENT_UPDATE_ABSOLUTE_PATH =  (designerBoardNumber: number | string) => `${SERVICE_PATH}/${DESIGNER_BOARD_PATH}/comment/update/${designerBoardNumber}`;

// description : 채팅 절대 URL PATH
export const CHAT_ABSOLUTE_PATH = `${CHAT_PATH}`;
export const CHAT_ROOM_ABSOLUTE_PATH = `${CHAT_ABSOLUTE_PATH}/${CHAT_ROOM_PATH}`;
export const CHAT_ROOM_DETAIL_ABSOLUTE_PATH = (roomId: number | string) => `${CHAT_ABSOLUTE_PATH}/${roomId}`;
export const CHAT_ROOM_MESSAGES_ABSOLUTE_PATH = (roomId: number | string) => `${CHAT_ABSOLUTE_PATH}/${roomId}/messages`;

// description: API URL PATH
export const SERVER_DOMAIN_URL = process.env.REACT_APP_BACK_URL + ":4200";
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;
export const CHAT_DOMAIN_URL = process.env.REACT_APP_BACK_URL + ":4200";

// description: LOGIN_LOG API URL PATH
export const LOGIN_LOG_URL = `${SERVER_API_URL}/login-log`;
export const TOTAL_VISITORS_URL = `${LOGIN_LOG_URL}/total-visitors`;
export const VISITORS_TODAY_URL = `${LOGIN_LOG_URL}/visitors-today`;

// description : AUTH API URL PATH 
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;
export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
export const ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
export const CUSTOMER_SIGN_UP_URL = `${SERVER_AUTH_MODULE_URL}/sign-up/customer`;
export const DESIGNER_SIGN_UP_URL = `${SERVER_AUTH_MODULE_URL}/sign-up/designer`;

export const FOUND_ID_EMAIL_AUTH_URL = `${SERVER_AUTH_MODULE_URL}/id-found-email-auth`;
export const FOUND_ID_URL = `${SERVER_AUTH_MODULE_URL}/id-found`;
export const FOUND_PASSWORD_ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/password-found-id-check`;
export const FOUND_PASSWORD_EMAIL_AUTH_URL = `${SERVER_AUTH_MODULE_URL}/password-found-email-auth`;
export const FOUND_PASSWORD_PATH = `${SERVER_AUTH_MODULE_URL}/password-found`;
export const RESET_PASSOWORD_PATH = `${SERVER_AUTH_MODULE_URL}/password-reset`;

// description : Footer  PATH
export const ADVERTISEMENT_PATH ="/advertisement"
export const MAILCONTECT_PATH = "/mailcontect"
export const PERSONAL_INFO_PROCESSING_POLICY_PATH = "/personal-info-policy"
export const SITE_DESCRIPTION_PATH = "/site-description"
export const TEARMS_AND_CONDTIONS_PATH ="/terms-and-conditions"
export const YOUTH_PROTECTION_POLICY_PATH = "/youth-protection-policy"

// description : USER API URL PATH 
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;
export const GET_SIGN_IN_USER_REQUEST_URL =`${SERVER_USER_MODULE_URL}/`;
export const MY_PAGE_URL = `${SERVER_USER_MODULE_URL}/my-page`;
export const UPDATE_REQUEST_URL = `${SERVER_USER_MODULE_URL}/update`;
export const USER_DELETE_URL = `${SERVER_USER_MODULE_URL}/user-delete`;
export const INFO_CUSTOMER_UPDATE_URL = `${SERVER_USER_MODULE_URL}/customer-update`;
export const INFO_DESIGNER_UPDATE_URL = `${SERVER_USER_MODULE_URL}/designer-update`;
export const PASSWORD_CHANGE_URL = `${SERVER_USER_MODULE_URL}/change-user-password`;
export const GET_USER_ROLE_URL = (userId : string) => `${SERVER_USER_MODULE_URL}/role/${userId}`;

// description: ANNOUNCEMENT API URL PATH
export const SERVER_ANNOUNCEMENT_BOARD_MODULE_URL = `${SERVER_API_URL}/service/announcement_board`;
export const POST_ANNOUNCEMENT_BOARD_WRITE_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${ANNOUNCEMENT_BOARD_WRITE_PATH}`;
export const GET_ANNOUNCEMENT_BOARD_LIST_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/`;
export const GET_SEARCH_ANNOUNCEMENT_BOARD_LIST_URL = `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/search`;
export const GET_ANNOUNCEMENT_BOARD_DETAIL_URL = (announcementBoardNumber: number | string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PUT_ANNOUNCEMENT_BOARD_PUT_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const DELETE_ANNOUCEMENT_BOARD_DELETE_URL = (announcementBoardNumber: number| string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}`;
export const PATCH_ANNOUNCEMENT_BOARD_INCREASE_VIEW_COUNT_URL =   (announcementBoardNumber: number | string) => `${SERVER_ANNOUNCEMENT_BOARD_MODULE_URL}/${announcementBoardNumber}/increase_view_count`;

// description : TREND API URL PATH 
export const SERVER_TREND_BOARD_MODULE_URL = `${SERVER_API_URL}${SERVICE_PATH}/trend_board/`;
export const POST_TREND_BOARD_WRITE_URL = `${SERVER_TREND_BOARD_MODULE_URL}write`;
export const GET_TREND_BOARD_LIST_URL = `${SERVER_TREND_BOARD_MODULE_URL}`;
export const GET_SEARCH_SEARCH_TREND_BOARD_LIST_URL = `${SERVER_TREND_BOARD_MODULE_URL}search`;
export const GET_TREND_BOARD_DETAIL_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}`;
export const PUT_TREND_BOARD_PUT_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}`;
export const DELETE_TREND_BOARD_DELETE_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}`;
export const POST_TREND_BOARD_COMMENT_WRITE_URL =(trendBoardNumber: number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}/comment`;
export const GET_TREND_BOARD_COMMENT_LIST_URL =  (trendBoardCommentNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardCommentNumber}/comment/list`
export const PUT_TREND_BOARD_COMMENT_PUT_URL = (trendBoardNumber: number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}/comment`;
export const DELETE_TREND_BOARD_COMMENT_DELETE_URL = (trendBoardNumber: number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}/comment`;
export const GET_TREND_BOARD_COMMENT_URL = (trendBoardCommentNumber: number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardCommentNumber}/comment`;
export const PUT_TREND_BOARD_LIKE_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}/like`
export const PATCH_TREND_BOARD_INCREASE_VIEW_COUNT_URL = (trendBoardNumber : number | string) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}/increase_view_count`
export const GET_TREND_BOARD_LIKE_LIST_URL = (trendBoardNumber : number | string ) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}/like_list`
export const DELETE_TREND_BOARD_LIKE_LIST_URL = (trendBoardNumber : number | string ) => `${SERVER_TREND_BOARD_MODULE_URL}${trendBoardNumber}/like_list`
export const POST_TREND_BOARD_IMAGE_UPLOAD_URL = process.env.REACT_APP_BACK_URL + ':4200/upload'

// description : Q&A API URL PATH
export const SERVER_QNA_BOARD_MODULE_URL = `${SERVER_API_URL}/qna_board`;
export const POST_QNA_BOARD_WRITE_URL = `${SERVER_QNA_BOARD_MODULE_URL}/write`;
export const GET_QNA_BOARD_LIST_URL = `${SERVER_QNA_BOARD_MODULE_URL}/`;
export const GET_SEARCH_QNA_BOARD_LIST_URL = `${SERVER_QNA_BOARD_MODULE_URL}/search`;
export const GET_QNA_BOARD_DETAIL_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}`;
export const PUT_QNA_BOARD_PUT_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}`;
export const DELETE_QNA_BOARD_DELETE_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}`;
export const PATCH_QNA_BOARD_INCREASE_VIEW_COUNT_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/increase_view_count`;
export const POST_QNA_BOARD_COMMENT_WRITE_URL =(qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/comment`;
export const PUT_QNA_BOARD_COMMENT_PUT_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/comment`;
export const DELETE_QNA_BOARD_COMMENT_DELETE_URL = (qnaBoardNumber: number | string) => `${SERVER_QNA_BOARD_MODULE_URL}/${qnaBoardNumber}/comment`;

// description : 소통 플랫폼 API URL PATH
export const SERVER_CUSTOMER_BOARD_MODULE_URL = `${SERVER_API_URL}/customer_board`;
export const POST_CUSTOMER_BOARD_WRITE_URL = `${SERVER_CUSTOMER_BOARD_MODULE_URL}/`;
export const GET_CUSTOMER_BOARD_LIST_URL = `${SERVER_CUSTOMER_BOARD_MODULE_URL}/list`;
export const GET_SEARCH_CUSTOMER_BOARD_LIST_URL = `${SERVER_CUSTOMER_BOARD_MODULE_URL}/list/search`;
export const GET_CUSTOMER_BOARD_DETAIL_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}`;
export const PUT_CUSTOMER_BOARD_PUT_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}`;
export const DELETE_CUSTOMER_BOARD_DELETE_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}`;
export const PATCH_CUSTOMER_BOARD_INCREASE_VIEW_COUNT_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/increase-view-count`;
export const POST_CUSTOMER_BOARD_COMMENT_WRITE_URL =(customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/comment`;
export const PUT_CUSTOMER_BOARD_COMMENT_PUT_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/comment`;
export const DELETE_CUSTOMER_BOARD_COMMENT_DELETE_URL = (customerBoardNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardNumber}/comment`;
export const GET_CUSTOMER_BOARD_COMMENT_LIST_URL = (customerBoardCommentNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardCommentNumber}/comment/list`;
export const GET_CUSTOMERR_BOARD_COMMENT_URL = (customerBoardCommentNumber: number | string) => `${SERVER_CUSTOMER_BOARD_MODULE_URL}/${customerBoardCommentNumber}/comment`;

// description : DESIGNER API URL PATH
export const SERVER_DESIGNER_BOARD_MODULE_URL = `${SERVER_API_URL}/designer_board`;
export const POST_DESIGNER_BOARD_WRITE_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/`;
export const GET_DESIGNER_BOARD_LIST_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/list`;
export const GET_SEARCH_DESIGNER_BOARD_LIST_URL = `${SERVER_DESIGNER_BOARD_MODULE_URL}/list/search`;
export const GET_DESIGNER_BOARD_DETAIL_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const PUT_DESIGNER_BOARD_PUT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const DELETE_DESIGNER_BOARD_DELETE_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}`;
export const PATCH_DESIGNER_BOARD_INCREASE_VIEW_COUNT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/increase-view-count`;
export const POST_DESIGNER_BOARD_COMMENT_WRITE_URL =(designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
export const PUT_DESIGNER_BOARD_COMMENT_PUT_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
export const DELETE_DESIGNER_BOARD_COMMENT_DELETE_URL = (designerBoardNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardNumber}/comment`;
export const GET_DESIGNER_BOARD_COMMENT_LIST_URL = (designerBoardCommentNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardCommentNumber}/comment/list`;
export const GET_DESIGNER_BOARD_COMMENT_URL = (designerBoardCommentNumber: number | string) => `${SERVER_DESIGNER_BOARD_MODULE_URL}/${designerBoardCommentNumber}/comment`;

// description : CHAT API URL PATH
export const SERVER_CHAT_MODULE_URL = `${CHAT_DOMAIN_URL}/api/v1/chat`;
export const POST_CHATROOM_URL = `${SERVER_CHAT_MODULE_URL}/room`;
export const GET_CHATROOM_LIST_URL = `${SERVER_CHAT_MODULE_URL}/rooms`;
export const GET_CHATROOM_DETAIL_URL = (roomId: number | string) => `${SERVER_CHAT_MODULE_URL}/${roomId}`;
export const GET_CHAT_MESSAGE_LIST_URL = (roomId: number | string) => `${SERVER_CHAT_MODULE_URL}/${roomId}/messages`;
export const DELETE_CHATROOM_URL = (roomId: number | string) => `${SERVER_CHAT_MODULE_URL}/${roomId}`;

// description: 게시물 상수
export const COUNT_PER_PAGE = 10;
export const COUNT_PER_SECTION = 10;

// description: 트렌드 게시판 게시물 상수
export const TREND_BOARD_COUNT_PER_PAGE = 5;
export const TREND_BOARD_COUNT_PER_SECTION = 10;

export const EMAILPATTERN = /^([-.]?[a-zA-Z0-9])*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
export const PASSWORDPATTERN = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/