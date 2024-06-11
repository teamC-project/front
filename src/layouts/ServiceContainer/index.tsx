import React, { useEffect, useState } from 'react';
import "./style.css";
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH, MY_PAGE_ABSOLUTE_PATH, QNA_BOARD_LIST_ABSOLUTE_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { GetSignInUserResponseDto } from 'src/apis/user/dto/response';
import { getSignInUserRequest } from 'src/apis/user';
import useUserStore from "src/stores/use.store";
import ResponseDto from 'src/apis/response.dto';
import { getTotalVisitorsRequest, getVisitorsTodayRequest } from 'src/apis/loginLog';
import { VisitorCountDto } from 'src/apis/loginLog/dto/response';

//                   component                   //
function VisitorCount() {
  function VisitorCount() {
    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    const [visitorsToday, setVisitorsToday] = useState<number>(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const totalResult = await getTotalVisitorsRequest(totalVisitors);
          const todayResult = await getVisitorsTodayRequest(visitorsToday);
            setTotalVisitors(totalResult);
            setVisitorsToday(todayResult);
        } 
      };
  
      fetchData();
    }, []);
  
    return (
      <>
        <div>총 방문자 수: {totalVisitors}</div>
        <div>오늘 방문자 수: {visitorsToday}</div>
      </>
    );
  }

  

type Path = '공지사항' | '트렌드 게시판' | '고객 게시판' | '디자이너 게시판' | 'Q&A 게시판' | '';

//                    interface                    //
interface Props {
    path: Path;
}

//                    component                    //
function Top({ path }: Props) {

    //                    state                    //
    const { loginUserRole, loginUserId } = useUserStore();
    const [cookies, setCookie, removeCookie] = useCookies();

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onMyPageClickHandler = () => {
      navigator(MY_PAGE_ABSOLUTE_PATH);
  };

    const onMainPageClickHandler = () => {
      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
  };

    const onLogoutClickHandler = () => {
        removeCookie('accessToken', { path: '/' });
        navigator(MAIN_PATH);
    };

  //                    render                       //
  return (
    <div className='top-group'>
      <div className='top-logo' onClick={onMainPageClickHandler}></div>
      <div className='top-bar-title'>{ path }</div>
      <div className='top-bar-service'>
        <div className='third-button' >{loginUserId} 님 환영합니다. </div>
        <div className='second-button' onClick={onMyPageClickHandler}>내정보</div>
        <div className='second-button' onClick={onLogoutClickHandler}>로그아웃</div>
      </div>
    </div>
  ); 
}

//                    component                    //
function LeftBar({ path }: Props) {

    const announcementClass =  `left-bar-title${path === '공지사항' ? ' active' : ''}`;
    const trendClass =  `left-bar-title${path === '트렌드 게시판' ? ' active' : ''}`;
    const customerClass =  `left-bar-title${path === '고객 게시판' ? ' active' : ''}`;
    const designerClass =  `left-bar-title${path === '디자이너 게시판' ? ' active' : ''}`;
    const qnaClass =  `left-bar-title${path === 'Q&A 게시판' ? ' active' : ''}`;


    //                    state                    //
    const { pathname } = useLocation();

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onAnnouncementClickHandler = () => navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    const onTrendClickHandler = () => navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
    const onCustomerClickHandler = () => {
        if (pathname === CUSTOMER_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
        else navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
    };
    const onDesignerClickHandler = () =>{ 
        if (pathname === DESIGNER_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
        else navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };
    const onQnaClickHandler = () =>{ 
        if (pathname === QNA_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
        else navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
    };

    //                    render                    //
  return (
    <div className='left-bar-container'>
      <button className={announcementClass} onClick={onAnnouncementClickHandler} >
        공지사항
      </button>
      <button className={trendClass} onClick={onTrendClickHandler}>
        트렌드 게시판
      </button>
      <button className={customerClass} onClick={onCustomerClickHandler}>
        고객 게시판
      </button>
      <button className={designerClass} onClick={onDesignerClickHandler}>
        디자이너 게시판
      </button>
      <button className={qnaClass} onClick={onQnaClickHandler}>
        Q&A 게시판
      </button>
    </div>
  );
}



//                    component                    //
export default function ServiceContainer() {

    //                    state                    //
    const { pathname } = useLocation();
    const { setLoginUserId, setLoginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [path, setPath] = useState<Path>('');
    // const [totalCount, setTotalCount] = useState<number>(0);
    // const [todayCount], setTodayCount] = useState<number>(0);
  
    

    //                    function                    //
    const navigator = useNavigate();

    const getSignInUserResponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {

        const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { userId, userRole } = result as GetSignInUserResponseDto;
        setLoginUserId(userId);
        setLoginUserRole(userRole);

    };

    //                    effect                    //
    useEffect(() => {
        const path = 
            pathname === ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH ? '공지사항' :
            pathname === TREND_BOARD_LIST_ABSOLUTE_PATH ? '트렌드 게시판' :
            pathname === CUSTOMER_BOARD_LIST_ABSOLUTE_PATH ? '고객 게시판' :
            pathname === DESIGNER_BOARD_LIST_ABSOLUTE_PATH ? '디자이너 게시판' :
            pathname === QNA_BOARD_LIST_ABSOLUTE_PATH ? 'Q&A 게시판' : '';

        setPath(path);
    }, [pathname]);

    useEffect(() => {

        if (!cookies.accessToken) {
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);

    }, [cookies.accessToken]);

  //                    render                       //
  return (
    <div id='full'>
      <Top path={path} />

      <div className='service-unber-box'>
        <LeftBar path={path} />
        <div className='center-bar'>
          <Outlet />
        </div>
        <div className='right-bar'>
          <div className='footer-total-user-box'>
            <VisitorCount />
          </div>
          <div className='customer-chat'>
            <div className=''>채팅 미구현 </div>
          </div>
        </div>
      </div>
    </div>
  );
}
