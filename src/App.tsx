import React, { useEffect } from "react";

import "./App.css";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
import { AUTH_PATH, ID_FOUND_ABSOLUTE_PATH, ID_FOUND_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication from "./views/Authentication";
import Login from "./views/Login";
import Id_Found from "./views/IdFound";
import IdFound from "./views/IdFound";

//  component: root 경로 컴포넌트 //
function Index() {

//                       state                    //
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

  
// component: Application 컴포넌트 //
function App() {
  return (
    <Routes >
      <Route path={ID_FOUND_ABSOLUTE_PATH} element={<IdFound />} />
      {/* <Route path={SIGN_IN_PATH} element={<Login />} /> */}
      {/* <Route index element={<Index />} /> */}
    {/* <Route path={SERVICE_PATH} element={<ServiceContainer />} 
        
    <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/*  */}
      {/*  */}

      {/* </Route> */}
    </Routes>
  );
}

export default App;