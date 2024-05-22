import React, { useEffect } from "react";

import "./App.css";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
import { AUTH_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication from "./views/Authentication";
<<<<<<< HEAD
import Login from "./views/Login";
=======
import Main from "./views/Main";
>>>>>>> 6c38d87cef940fef634c6b22879c6bf33e48fd14

// // component: root 경로 컴포넌트 //
// function Index() {

//   //                    state                    //
//   const [cookies] = useCookies();

//   //                    function                    //
//   const navigator = useNavigate();

//   //                    effect                    //
//   useEffect(() => {
//     const accessToken = cookies.accessToken;
//     if (accessToken) navigator(MAIN_ON_PATH);
//     else navigator(MAIN_OFF_PATH);
//   }, []);

//   //                    render                    //
//   return <></>;
// }

function App() {
  return (
    <Routes >
<<<<<<< HEAD
      <Route path={SIGN_IN_PATH} element={<Login />} />
      <Route index element={<Index />} />
=======
      <Route path={MAIN_ON_PATH} element={<Main />} />
      {/* <Route index element={<Index />} /> */}
>>>>>>> 6c38d87cef940fef634c6b22879c6bf33e48fd14
      <Route path={AUTH_PATH} element={<Authentication />} />
      <Route path={SERVICE_PATH} element={<ServiceContainer />} >
        
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/*  */}
      {/*  */}

      </Route>
    </Routes>
  );
}

export default App;