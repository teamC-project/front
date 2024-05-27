import React, { useEffect } from "react";
import "./App.css";

import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, AUNNOUNCEMENT_BOARD_DETAIL_PATH, AUNNOUNCEMENT_BOARD_PATH, AUNNOUNCEMENT_BOARD_UPDATE_PATH, AUNNOUNCEMENT_BOARD_WRITE_PATH, AUTH_PATH, CUSTOMER_BOARD_DETAIL_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, CUSTOMER_BOARD_PATH, CUSTOMER_BOARD_UPDATE_PATH, CUSTOMER_BOARD_WRITE_PATH, CUSTOMER_PATH, CUSTOMER_SIGN_UP_URL, DESIGNER_BOARD_DETAIL_PATH, DESIGNER_BOARD_PATH, DESIGNER_BOARD_UPDATE_PATH, DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, DESIGNER_BOARD_WRITE_PATH, DESIGNER_PATH, DESIGNER_SIGN_UP_URL, ID_FOUND_PATH, MAIN_PATH,MY_PAGE_PATH,PASSWORD_FOUND_PATH, QNA_BOARD_DETAIL_PATH, QNA_BOARD_PATH, QNA_BOARD_UPDATE_PATH, QNA_BOARD_WRITE_PATH, SERVICE_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SIGN_UP_REQUEST_URL, TREND_BOARD_DETAIL_PATH, TREND_BOARD_PATH, TREND_BOARD_UPDATE_PATH, TREND_BOARD_WRITE_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication, { ChooseSingUp, CustomerSignUp, DesignerSignUp, Main, SignIn } from "./views/Authentication";

import IdFound from "./views/IdFound";
import PasswordFound from "./views/PasswordFound";
import MyPage from "./views/MyPage";

import TrendList from "./views/Service/Trend/TrendList";
import TrendWrite from "./views/Service/Trend/TrendWrite";
import TrendDetail from "./views/Service/Trend/TrendDetail";



import DesignerWrite from "./views/Service/Designer/DesignerWrite";
import DesignerUpdate from "./views/Service/Designer/DesignerUpdate";
import DesignerDetail from "./views/Service/Designer/DesignerDetail";
import DesignerList from "./views/Service/Designer/DesignerList";


import CustomerList from "./views/Service/Customer/CustomerList";
import CustomerWrite from "./views/Service/Customer/CustomerWrite";
import CustomerDetail from "./views/Service/Customer/CustomerDetail";
import CustomerUpdate from "./views/Service/Customer/CustomerUpdate";
import AnnouncementList from "./views/Service/Announcement/AnnouncementList";
import AnnouncementWrite from "./views/Service/Announcement/AnnouncementWrite";
import QnaList from "./views/Service/qna/qnaList";
import QnaWrite from "./views/Service/qna/qnaWrite";
import QnaDetail from "./views/Service/qna/qnaDetail";


//  component: root 경로 컴포넌트 //
function Index() {

  //                       state                    //
  const [cookies] = useCookies();

  //                    function                    //
  const navigator = useNavigate();

  //                    effect                    //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (accessToken) navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    else navigator(MAIN_PATH);
  }, []);

  //                    render                    //
  return <></>;
}

// component: Application 컴포넌트 //
function App() {
  return (
    <Routes >

      <Route index element={<Index />} />
      <Route path={MAIN_PATH} element={<Main />} />

      <Route path={AUTH_PATH} >
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route path={SIGN_UP_PATH}>
          <Route index element={<ChooseSingUp />} />
          <Route path={CUSTOMER_PATH} element={<CustomerSignUp />} />
          <Route path={DESIGNER_PATH} element={<DesignerSignUp />} />
        </Route>

        <Route path={ID_FOUND_PATH} element={<IdFound />} />
        <Route path={PASSWORD_FOUND_PATH} element={<PasswordFound />} />

      </Route>



      <Route path={MY_PAGE_PATH} element={<MyPage />} />



      <Route path={SERVICE_PATH} element={<ServiceContainer />} >


      <Route path={AUNNOUNCEMENT_BOARD_PATH} >
      <Route index element={<AnnouncementList />} />
      <Route path={AUNNOUNCEMENT_BOARD_WRITE_PATH} element={<AnnouncementWrite />} />
      {/* <Route path={AUNNOUNCEMENT_BOARD_DETAIL_PATH} element={<AnnouncementBoardDetail />} /> */}
      {/* <Route path={AUNNOUNCEMENT_BOARD_UPDATE_PATH} element={<AnnouncementBoardUpdate />} /> */}
      </Route>

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

      <Route path={CUSTOMER_BOARD_PATH} >
        <Route index element={<CustomerList />} />
        <Route path={CUSTOMER_BOARD_WRITE_PATH} element={<CustomerWrite />} />
        <Route path={CUSTOMER_BOARD_DETAIL_PATH} element={<CustomerDetail />} />
        <Route path={CUSTOMER_BOARD_UPDATE_PATH} element={<CustomerUpdate />} />
      </Route>

      <Route path={DESIGNER_BOARD_PATH} >
        <Route index element={<DesignerList />} />
        <Route path={DESIGNER_BOARD_WRITE_PATH} element={<DesignerWrite />} />
        <Route path={DESIGNER_BOARD_DETAIL_PATH} element={<DesignerDetail />} />
        <Route path={DESIGNER_BOARD_UPDATE_PATH} element={<DesignerUpdate />} />
      </Route>
    </Route>
  
    </Routes >
  );
}

export default App;
