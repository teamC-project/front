import React, { useEffect, useState } from "react";
import "./style.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import UseUserStore from "../stores/user.store";

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

  //                    render                    //
  return (
    <>
    
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
  const costomerClass = `side-navigation-item${
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


  //                    render                    //
  return (
    <div className="side-navigation-container">
      <div className={announcementClass}>
        <div className="side-navigation-icon"></div>
        <div className="side-navigation-title">공지 사항</div>
      </div>
      <div className={trendClass} >
        <div className="side-navigation-icon"></div>
        <div className="side-navigation-title">트렌드 게시판</div>
      </div>
      <div className={costomerClass} >
        <div className="side-navigation-icon"></div>
        <div className="side-navigation-title">소통 플랫폼</div>
      </div>
      <div className={designerClass} >
        <div className="side-navigation-icon"></div>
        <div className="side-navigation-title">디자이너 게시판</div>
      </div>
      <div className={qnaClass} >
        <div className="side-navigation-icon"></div>
        <div className="side-navigation-title">Q&A 게시판</div>
      </div>
    </div>
  );
}

//                    component                    //

  //                    state                    //

  //                    function                    //
  const navigator = useNavigate();



  //                    effect                    //


  //                    render                    //
  return (
    < div>

    </div>
  );
}
