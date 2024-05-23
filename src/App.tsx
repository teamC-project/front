import React, { useEffect } from "react";

import "./App.css";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
<<<<<<< HEAD
import { AUTH_PATH, ID_FOUND_ABSOLUTE_PATH, ID_FOUND_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication from "./views/Authentication";
import Login from "./views/Login";
import Id_Found from "./views/Id_Found";

<<<<<<< HEAD
import { AUTH_PATH, DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, DESIGNER_BOARD_WRITE_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH, TREND_BOARD_WRITE_ABSOLUTE_PATH } from "./constant";
=======
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
=======

import { AUTH_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, CUSTOMER_BOARD_PATH, DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, DESIGNER_BOARD_WRITE_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";
>>>>>>> 1d865d86e7a05b4ec0413a3dc9adcc2c56aa98c6

import Authentication from "./views/Authentication";
import Login from "./views/Login";
import ServiceContainer from "./layouts/ServiceContainer";
import DesignerWrite from "./views/Service/Designer/DesignerWrite";
<<<<<<< HEAD
import Main from "./views/Main";
import TrendBoardList from "./views/Service/TrendBoard/TrendBoardList";
import TrendBoard from "./views/Service/TrendBoard/TrendBoard";
=======




import Main from "./views/Main";
import CustomerList from "./views/Service/Customer/CustomerList";
>>>>>>> 1d865d86e7a05b4ec0413a3dc9adcc2c56aa98c6

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
>>>>>>> 356d313eaa6d2d9d2fb03c07a181c857b5ca1012

  
// component: Application 컴포넌트 //
function App() {
  return (
    <Routes >
<<<<<<< HEAD
      <Route path={ID_FOUND_ABSOLUTE_PATH} element={<Id_Found />} />
      {/* <Route path={SIGN_IN_PATH} element={<Login />} /> */}
      {/* <Route index element={<Index />} /> */}
    {/* <Route path={SERVICE_PATH} element={<ServiceContainer />} 
        
    <Route path={AUTH_PATH} element={<Authentication />} /> */}
=======
      <Route path={SERVICE_PATH} element={<ServiceContainer />} >
      <Route path={DESIGNER_BOARD_WRITE_ABSOLUTE_PATH} element={<DesignerWrite />} />
      <Route path={CUSTOMER_BOARD_LIST_ABSOLUTE_PATH} element={<CustomerList />} />
      </Route>
      <Route path={SIGN_IN_PATH} element={<Login />} />
      <Route index element={<Index />} />
      <Route path={AUTH_PATH} element={<Authentication />} />
      <Route path={MAIN_ON_PATH} element={<Main />} />
      <Route path={SIGN_IN_PATH} element={<Login />} />
<<<<<<< HEAD

      {/* <Route index element={<Index />} /> */}
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
			  {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      <Route path={SERVICE_PATH} element={<ServiceContainer />} > 
			<Route path={TREND_BOARD_LIST_ABSOLUTE_PATH} element={<TrendBoardList />} />
			<Route path={TREND_BOARD_WRITE_ABSOLUTE_PATH} element={<TrendBoard />} />
    </Route> 
=======
      
      {/* <Route index element={<Index />} /> */}
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/* <Route path={SERVICE_PATH} element={<ServiceContainer />} > */}
        
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
>>>>>>> 356d313eaa6d2d9d2fb03c07a181c857b5ca1012
      {/*  */}
      {/*  */}

      {/* </Route> */}
>>>>>>> 1d865d86e7a05b4ec0413a3dc9adcc2c56aa98c6
    </Routes>
  );
}

export default App;