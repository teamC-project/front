import React, { useEffect, useState } from "react";
import "./style.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import UseUserStore from "src/stores/user.store";
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH, MAIN_OFF_PATH, MY_PAGE_ABSOLUTE_PATH, QNA_BOARD_LIST_ABSOLUTE_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH } from "src/constant";


type Path = "공지 사항" | "트렌드 게시판" | "소통 플랫폼" | "디자이너 게시판" | "Q&A 게시판" | "";

//                    interface                    //
interface Props {
  path: Path;
}

//                    component                    //
function TopBar({ path }: Props) {
  //                    state                    //
  const { loginUserRole } = UseUserStore();
  const [cookies, setCookie, removeCookie] = useCookies();

  //                    function                    //
  const navigator = useNavigate();

  //                    event handler                    //
  const onMyPageClickHandler = () => {
    removeCookie("accessToken", { path: "/" });
    navigator(MY_PAGE_ABSOLUTE_PATH);
  };

  const onLogoutClickHandler = () => {
    removeCookie("accessToken", { path: "/" });
    navigator(MAIN_OFF_PATH);
  };

  //                    render                    //
  return (
    <>
      <div id="top-bar-container">
        <div className="top-bar-title">헤어어드바</div>
        <div >
          <div className="logo-container ">{path}</div>
            <div className="second-button" onClick={onMyPageClickHandler}>내 정보</div>
            <div className="second-button" onClick={onLogoutClickHandler}>로그아웃</div>
          </div>
        </div>
    </>
  );
}

//                    component                    //
function SideNavigation({ path }: Props) {
  const announcementClass = `side-navigation-item${
    path === "공지 사항" ? " active" : ""
  }`;
  const trendClass = `side-navigation-item${
    path === "트렌드 게시판" ? " active" : ""
  }`;
  const customerClass = `side-navigation-item${
    path === "소통 플랫폼" ? " active" : ""
  }`;
  const designerClass = `side-navigation-item${
    path === "디자이너 게시판" ? " active" : ""
  }`;
  const qnaClass = `side-navigation-item${
    path === "Q&A 게시판" ? " active" : ""
  }`;

  //                       state                      //
  const { pathname } = useLocation(); 

  //                    function                    //
  const navigator = useNavigate();

  //                    event handler                    //
  const onAnnouncementBoardClickHandler = () => {
    if (pathname === ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
    else navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
  };

  const onTrendBoardClickHandler = () => {
    if (pathname === TREND_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
    else navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
  };

  const onCustomerBoardClickHandler = () => {
    if (pathname === CUSTOMER_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
    else navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
  };

  const onDesignerBoardClickHandler = () => {
    if (pathname === DESIGNER_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
    else navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
  };

  const onQnaBoardClickHandler = () => {
    if (pathname === QNA_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
    else navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
  };

  //                    render                    //
  return (
    <div className="side-navigation-container">
      <div className={announcementClass} onClick={onAnnouncementBoardClickHandler}>
        <div className="side-navigation-title">공지 사항</div>
      </div>
      <div className={trendClass} onClick={onTrendBoardClickHandler}>
        <div className="side-navigation-title">트렌드 게시판</div>
      </div>
      <div className={customerClass} onClick={onCustomerBoardClickHandler}>
        <div className="side-navigation-title">소통 플랫폼</div>
      </div>
      <div className={designerClass} onClick={onDesignerBoardClickHandler}>
        <div className="side-navigation-title">디자이너 게시판</div>
      </div>
      <div className={qnaClass} onClick={onQnaBoardClickHandler}>
        <div className="side-navigation-title">Q&A 게시판</div>
      </div>
    </div>
  );
}

//                    component                    //
export default function ServiceContainer() {
  //                    state                    //
  const { pathname } = useLocation();
  const { setLoginUserId, setLoginUserRole } = UseUserStore();
  const [cookies] = useCookies();
  const [path, setPath] = useState<Path>("");

  //                    function                    //
  const navigator = useNavigate();

  const getSignInUserResponse = (
    result: GetSignInUserResponseDto | ResponseDto | null
  ) => {
    const message = !result
      ? "서버에 문제가 있습니다."
      : result.code === "AF"
      ? "인증에 실패했습니다."
      : result.code === "DBE"
      ? "서버에 문제가 있습니다."
      : "";

    if (!result || result.code !== "SU") {
      alert(message);
      navigator(MAIN_OFF_PATH);
      return;
    }

    const { userId, userRole } = result as GetSignInUserResponseDto;
    setLoginUserId(userId);
    setLoginUserRole(userRole);
  };

  //                    effect                    //
  useEffect(() => {
    const path =
      pathname === ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH
        ? "공지 사항"
        : pathname === TREND_BOARD_LIST_ABSOLUTE_PATH
        ? "트렌드 게시판"
        : pathname.startsWith(QNA_BOARD_LIST_ABSOLUTE_PATH)
        ? "소통 플랫폼"
        : pathname.startsWith(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH)
        ? "디자이너 게시판"
        : pathname.startsWith(DESIGNER_BOARD_LIST_ABSOLUTE_PATH)
        ? "Q&A 게시판"
        : "";

    setPath(path);
  }, [pathname]);

  // useEffect(() => {
  //   if (!cookies.accessToken) {
  //     navigator(MAIN_OFF_PATH);
  //     return;
  //   }


  //   getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  // }, [cookies.accessToken]);

  //                    render                    //
  return (
    <div id="wrapper">
      <TopBar path={path} />
      <SideNavigation path={path} />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}
