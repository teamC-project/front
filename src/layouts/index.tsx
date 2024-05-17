import React, { useEffect, useState } from "react";
import "./style.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import UseUserStore from "../stores/user.store";

type Path = "지역 평균" | "비율 계산" | "Q&A 게시판" | "";

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

  //                    render                    //
  return (
    <>
    
    </>
  );
}

//                    component                    //
function SideNavigation({ path }: Props) {
  const localClass = `side-navigation-item${
    path === "지역 평균" ? " active" : ""
  }`;
  const ratioClass = `side-navigation-item${
    path === "비율 계산" ? " active" : ""
  }`;
  const qnaClass = `side-navigation-item${
    path === "Q&A 게시판" ? " active" : ""
  }`;

  //                       state                      //
  const { pathname } = useLocation(); 

  //                    function                    //
  const navigator = useNavigate();

  //                    event handler                    //


  //                    render                    //
  return (
    <div className="side-navigation-container">
      <div className={localClass}>
        <div className="side-navigation-icon chart"></div>
        <div className="side-navigation-title">지역 평균</div>
      </div>
      <div className={ratioClass} >
        <div className="side-navigation-icon pie"></div>
        <div className="side-navigation-title">비율 계산</div>
      </div>
      <div className={qnaClass} >
        <div className="side-navigation-icon edit"></div>
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



  //                    effect                    //


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
