import React, { useEffect } from "react";
import "./App.css";

import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
import { AUNNOUNCEMENT_BOARD_DETAIL_PATH, AUNNOUNCEMENT_BOARD_PATH, AUNNOUNCEMENT_BOARD_UPDATE_PATH, AUNNOUNCEMENT_BOARD_WRITE_PATH, AUTH_PATH, CUSTOMER_BOARD_DETAIL_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, CUSTOMER_BOARD_PATH, CUSTOMER_BOARD_UPDATE_PATH, CUSTOMER_BOARD_WRITE_PATH, DESIGNER_BOARD_DETAIL_PATH, DESIGNER_BOARD_PATH, DESIGNER_BOARD_UPDATE_PATH, DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, DESIGNER_BOARD_WRITE_PATH, ID_FOUND_ABSOLUTE_PATH, ID_FOUND_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, QNA_BOARD_DETAIL_PATH, QNA_BOARD_PATH, QNA_BOARD_UPDATE_PATH, QNA_BOARD_WRITE_PATH, SERVICE_PATH, SIGN_IN_PATH, TREND_BOARD_DETAIL_PATH, TREND_BOARD_PATH, TREND_BOARD_UPDATE_PATH, TREND_BOARD_WRITE_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication from "./views/Authentication";
import Login from "./views/Login";
import Main from "./views/Main";
import IdFound from "./views/IdFound";
import TrendList from "./views/Service/Trend/TrendList";
import TrendWrite from "./views/Service/Trend/TrendWrite";
import TrendDetail from "./views/Service/Trend/TrendDetail";
import QnaList from "./views/Service/qna/qnaList";
import QnaWrite from "./views/Service/qna/qnaWrite";
import QnaDetail from "./views/Service/qna/qnaDetail";
import DesignerWrite from "./views/Service/Designer/DesignerWrite";
import DesignerUpdate from "./views/Service/Designer/DesignerUpdate";
import DesignerDetail from "./views/Service/Designer/DesignerDetail";
import DesignerList from "./views/Service/Designer/DesignerList";


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
      <Route index element={<Index />} />
      <Route path={ID_FOUND_ABSOLUTE_PATH} element={<IdFound />} />
      <Route path={SIGN_IN_PATH} element={<Login />} />

      <Route path={AUTH_PATH} >
        <Route index element={<Authentication />} />
      </Route>

      <Route path={MAIN_ON_PATH} element={<Main />} />
      <Route path={SERVICE_PATH} element={<ServiceContainer />} >

        {/* <Route path={AUNNOUNCEMENT_BOARD_PATH} > */}
          {/* <Route index element={<AnnouncementBoard />} /> */}
          {/* <Route path={AUNNOUNCEMENT_BOARD_WRITE_PATH} element={<AnnouncementBoardWrite />} /> */}
          {/* <Route path={AUNNOUNCEMENT_BOARD_DETAIL_PATH} element={<AnnouncementBoardDetail />} /> */}
          {/* <Route path={AUNNOUNCEMENT_BOARD_UPDATE_PATH} element={<AnnouncementBoardUpdate />} /> */}
        {/* </Route> */}

        <Route path={TREND_BOARD_PATH} >
          <Route index element={<TrendList />} />
          <Route path={TREND_BOARD_WRITE_PATH} element={<TrendWrite />} />
          <Route path={TREND_BOARD_DETAIL_PATH} element={<TrendDetail />} />
          {/* <Route path={TREND_BOARD_UPDATE_PATH} element={<TrendBoardUpdate />} /> */}
        </Route>

        <Route path={QNA_BOARD_PATH} >
          <Route index element={<QnaList />} />
          <Route path={QNA_BOARD_WRITE_PATH} element={<QnaWrite />} />
          <Route path={QNA_BOARD_DETAIL_PATH} element={<QnaDetail />} />
          {/* <Route path={QNA_BOARD_UPDATE_PATH} element={<QnaBoardUpdate />} /> */}
        </Route>

        {/* <Route path={CUSTOMER_BOARD_PATH} > */}
          {/* <Route index element={<CustomerList />} /> */}
          {/* <Route path={CUSTOMER_BOARD_WRITE_PATH} element={<CustomerBoardWrite />} /> */}
          {/* <Route path={CUSTOMER_BOARD_DETAIL_PATH} element={<CustomerBoardDetail />} /> */}
          {/* <Route path={CUSTOMER_BOARD_UPDATE_PATH} element={<CustomerBoardUpdate />} /> */}
        {/* </Route> */}

        <Route path={DESIGNER_BOARD_PATH} >
          <Route index element={<DesignerList />} />
          <Route path={DESIGNER_BOARD_WRITE_PATH} element={<DesignerWrite />} />
          <Route path={DESIGNER_BOARD_DETAIL_PATH} element={<DesignerDetail />} />
          <Route path={DESIGNER_BOARD_UPDATE_PATH} element={<DesignerUpdate />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;