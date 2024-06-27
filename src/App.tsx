  import { useEffect } from "react";
import "./App.css";

import { useCookies } from "react-cookie";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { ADVERTISEMENT_PATH, ANNOUNCEMENT_BOARD_DETAIL_PATH, ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, ANNOUNCEMENT_BOARD_PATH, ANNOUNCEMENT_BOARD_UPDATE_PATH, ANNOUNCEMENT_BOARD_WRITE_PATH, AUTH_PATH, CHANGE_PASSWORD_PATH, CUSTOMER_BOARD_DETAIL_PATH, CUSTOMER_BOARD_PATH, CUSTOMER_BOARD_UPDATE_PATH, CUSTOMER_BOARD_WRITE_PATH, CUSTOMER_PATH, DELETE_INFO_PATH, DESIGNER_BOARD_DETAIL_PATH, DESIGNER_BOARD_PATH, DESIGNER_BOARD_UPDATE_PATH, DESIGNER_BOARD_WRITE_PATH, DESIGNER_PATH, ID_FOUND_PATH, MAILCONTECT_PATH, MAIN_PATH, MY_PAGE_PATH, PASSOWORD_RESET_PATH, PASSWORD_FOUND_PATH, PERSONAL_INFO_PROCESSING_POLICY_PATH, QNA_BOARD_DETAIL_PATH, QNA_BOARD_PATH, QNA_BOARD_UPDATE_PATH, QNA_BOARD_WRITE_PATH, SERVICE_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SITE_DESCRIPTION_PATH, SNS_PATH, TEARMS_AND_CONDTIONS_PATH, TREND_BOARD_DETAIL_PATH, TREND_BOARD_PATH, TREND_BOARD_UPDATE_PATH, TREND_BOARD_WRITE_PATH, UPDATE_CUSTOMER_INFO_PATH, UPDATE_DESIGNER_INFO_PATH, YOUTH_PROTECTION_POLICY_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";

import { ChooseSingUp, CustomerSignUp, DesignerSignUp, Main, SignIn, Sns } from "./views/Authentication";

import IdFound from "./views/IdFound";
import PasswordFoundPage, { SettingPassword } from "./views/PasswordFound";
import MyPage from "./views/User/MyPage";

import TrendDetail from "./views/Service/Trend/TrendDetail";
import TrendList from "./views/Service/Trend/TrendList";
import TrendWrite from "./views/Service/Trend/TrendWrite";

import DesignerDetail from "./views/Service/Designer/DesignerDetail";
import DesignerList from "./views/Service/Designer/DesignerList";
import DesignerUpdate from "./views/Service/Designer/DesignerUpdate";
import DesignerWrite from "./views/Service/Designer/DesignerWrite";

import CustomerDetail from "./views/Service/Customer/CustomerDetail";
import CustomerList from "./views/Service/Customer/CustomerList";
import CustomerUpdate from "./views/Service/Customer/CustomerUpdate";
import CustomerWrite from "./views/Service/Customer/CustomerWrite";

import AnnouncementBoardDetail from "./views/Service/Announcement/AnnouncementDetail";
import AnnouncementBoardList from "./views/Service/Announcement/AnnouncementList";
import AnnouncementBoardWrite from "./views/Service/Announcement/AnnouncementWrite";

import Footer from "./layouts/Footer";
import NotFound from "./views/NotFound";
import QnaBoardDetail from "./views/Service/Qna/QnaDetail";
import QnaBoardList from "./views/Service/Qna/QnaList";
import QnaBoardUpdate from "./views/Service/Qna/QnaUpdate";
import QnaBoardWrite from "./views/Service/Qna/QnaWrite";
import InfoCustomer from "./views/User/InfoCustomer";
import InfoDesigner from "./views/User/InfoDesigner";

import Advertisement from "./views/FooterContents/Advertisement";
import MailContect from "./views/FooterContents/MailContect";
import PersonalInfoProcessingPolicy from "./views/FooterContents/PersonalInfoProcesssingPolicy";
import SiteDescription from "./views/FooterContents/SiteDescription";
import TermsAndConditions from "./views/FooterContents/TermsAndConditions";
import YouthProtectionPolicy from "./views/FooterContents/YouthProtectionPolicy";
import AnnouncementBoardUpdate from "./views/Service/Announcement/AnnouncementBoardUpdate";
import InfoDeleteUser from "./views/User/InfoDeleteUser";

import TrendUpdate from "./views/Service/Trend/TrendUpdate";
import PasswordChangePage from "./views/User/ChangePassword";


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

  const location = useLocation();

  return (
    <>
    <Routes >

      <Route index element={<Index />} />
      <Route path={MAIN_PATH} element={<Main />} />
      <Route path={SNS_PATH} element={<Sns />} />
      <Route path={AUTH_PATH} >
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route path={SIGN_UP_PATH}>
          <Route index element={<ChooseSingUp />} />
          <Route path={CUSTOMER_PATH} element={<CustomerSignUp />} />
          <Route path={DESIGNER_PATH} element={<DesignerSignUp />} />
        </Route>
        <Route path={ID_FOUND_PATH} element={<IdFound />} />
        <Route path={PASSWORD_FOUND_PATH} element={<PasswordFoundPage />} />
        <Route path={PASSOWORD_RESET_PATH} element={<SettingPassword />} />
      </Route>

      <Route path={SERVICE_PATH} element={<ServiceContainer />} >

        <Route path={MY_PAGE_PATH} >
          <Route index element={<MyPage />} />
          <Route path={UPDATE_CUSTOMER_INFO_PATH} element={<InfoCustomer />} />
          <Route path={UPDATE_DESIGNER_INFO_PATH} element={<InfoDesigner />} />
          <Route path={DELETE_INFO_PATH} element={<InfoDeleteUser />} />
          <Route path={CHANGE_PASSWORD_PATH} element={<PasswordChangePage />} />
        </Route>
      
        <Route path={ANNOUNCEMENT_BOARD_PATH} >
          <Route index element={<AnnouncementBoardList />} />
          <Route path={ANNOUNCEMENT_BOARD_WRITE_PATH} element={<AnnouncementBoardWrite />} />
          <Route path={ANNOUNCEMENT_BOARD_DETAIL_PATH} element={<AnnouncementBoardDetail />} />
          <Route path={ANNOUNCEMENT_BOARD_UPDATE_PATH} element={<AnnouncementBoardUpdate />} />
        </Route>

        <Route path={TREND_BOARD_PATH} >
          <Route index element={<TrendList />} />
          <Route path={TREND_BOARD_WRITE_PATH} element={<TrendWrite />} />
          <Route path={TREND_BOARD_DETAIL_PATH} element={<TrendDetail />} />
          <Route path={TREND_BOARD_UPDATE_PATH} element={<TrendUpdate />} />
        </Route>

        <Route path={QNA_BOARD_PATH} >
          <Route index element={<QnaBoardList  />} />
          <Route path={QNA_BOARD_WRITE_PATH} element={<QnaBoardWrite />} />
          <Route path={QNA_BOARD_DETAIL_PATH} element={<QnaBoardDetail />} />
          <Route path={QNA_BOARD_UPDATE_PATH} element={<QnaBoardUpdate />} />
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
      <Route path="*" element={<NotFound />} />
      <Route path = {MAILCONTECT_PATH}  element={<MailContect/>}/>{/* 메일 문의 */}
    <Route path ={TEARMS_AND_CONDTIONS_PATH}  element={<TermsAndConditions/>}/> {/*이용 약관 */}
    <Route path = {PERSONAL_INFO_PROCESSING_POLICY_PATH}  element={<PersonalInfoProcessingPolicy/>}/> {/* 개인정보 처리방침*/}
    <Route path={SITE_DESCRIPTION_PATH} element={<SiteDescription/>}/> {/*사이트 소개 */}
    <Route path= {YOUTH_PROTECTION_POLICY_PATH} element={<YouthProtectionPolicy/>} />{/*청소년 보호정책 */}
    <Route path={ADVERTISEMENT_PATH} element = {<Advertisement/>}/> {/*광고 및 제휴 */}
    </Routes>
    {location.pathname !== '*' && <Footer />}

  </>
  );
}

export default App;
