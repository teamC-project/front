import React, { useEffect } from "react";

import "./App.css";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
<<<<<<< HEAD
import { MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH, TREND_BOARD_WRITE_ABSOLUTE_PATH } from "./constant";
=======

import { AUTH_PATH, DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, DESIGNER_BOARD_WRITE_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";

import Authentication from "./views/Authentication";
import Login from "./views/Login";
import ServiceContainer from "./layouts/ServiceContainer";
import DesignerWrite from "./views/Service/Designer/DesignerWrite";

import { MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";
>>>>>>> d7329a5c82b76ed591a1e5d4be928b223a67f25d
import ServiceContainer from "./layouts/ServiceContainer";
import Login from "./views/Login";
import Main from "./views/Main";
import TrendBoardList from "./views/Service/TrendBoard/TrendBoardList";
import TrendBoard from "./views/Service/TrendBoard/TrendBoard";

// component: root 경로 컴포넌트 //
function Index() {

  //                    state                    //
  const [cookies] = useCookies();

  //                    function                    //
  const navigator = useNavigate();

  //                    effect                    //
  useEffect(() => {   
    const accessToken = cookies.accessToken;
    if (accessToken) navigator(MAIN_ON_PATH);
    else navigator(MAIN_OFF_PATH);
  }, []);

  //                    render                    //
  return <></>;
}

function App() {
  return (
    <Routes >
      <Route path={SERVICE_PATH} element={<ServiceContainer />} >
      <Route path={DESIGNER_BOARD_WRITE_ABSOLUTE_PATH} element={<DesignerWrite />} />
      </Route>
      <Route path={SIGN_IN_PATH} element={<Login />} />
      <Route index element={<Index />} />
      <Route path={AUTH_PATH} element={<Authentication />} />
      <Route path={MAIN_ON_PATH} element={<Main />} />
      <Route path={SIGN_IN_PATH} element={<Login />} />
			<Route path={TREND_BOARD_LIST_ABSOLUTE_PATH} element={<TrendBoardList />} />
			<Route path={TREND_BOARD_WRITE_ABSOLUTE_PATH} element={<TrendBoard />} />
      {/* <Route index element={<Index />} /> */}
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/* <Route path={SERVICE_PATH} element={<ServiceContainer />} > */}
        
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/*  */}
      {/*  */}

      {/* </Route> */}
    </Routes>
  );
}

export default App;