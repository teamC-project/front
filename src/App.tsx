import React, { useEffect } from "react";
import "./App.css";

import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
import { AUTH_PATH, DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";

import Authentication from "./views/Authentication";
import Login from "./views/Login";
import ServiceContainer from "./layouts/ServiceContainer";
import DesignerWrite from "./views/Service/Designer/DesignerWrite";
import Main from "./views/Main";

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
        <Route path={MAIN_ON_PATH} element={<Main />} />
      </Route>

      <Route path={DESIGNER_BOARD_WRITE_ABSOLUTE_PATH} element={<DesignerWrite />} />
      <Route path={SIGN_IN_PATH} element={<Login />} />
      <Route index element={<Index />} />
      <Route path={AUTH_PATH} element={<Authentication />} />
    </Routes>
  );
}

export default App;