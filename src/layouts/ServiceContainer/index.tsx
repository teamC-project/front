import React from 'react'
import "./style.css";
import { useLocation, useNavigate } from 'react-router';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH, QNA_BOARD_LIST_ABSOLUTE_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

type Path = '공지사항' | '트렌드 게시판' | '고객 게시판' | '디자이너 게시판' | 'Q&A 게시판' | '';

//                    interface                    //
interface Props {
    path: Path;
}

//                    component                    //
function Topbar({ path }: Props) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
        const onLogoutClickHandler = () => {
        
    };

        //                    render                       //
    return (
        <>
        <div className='logo-container'>헤어 어드바이저</div>
        <div className='top-bar-container'>
            <div className='top-bar-title'></div>
            <div className='top-bar-right'>
                <div className="top-bar-role">내정보</div>
                <div className='logout-button' onClick={onLogoutClickHandler}>로그아웃</div>
            </div>
        </div>
        </>
    );
}

//                    component                    //
function SideNavigation({ path }: Props) {

    const announcementClass =  `side-navigation-item${path === '공지사항' ? ' active' : ''}`;
    const trendClass =  `side-navigation-item${path === '트렌드 게시판' ? ' active' : ''}`;
    const customerClass =  `side-navigation-item${path === '고객 게시판' ? ' active' : ''}`;
    const designerClass =  `side-navigation-item${path === '디자이너 게시판' ? ' active' : ''}`;
    const qnaClass =  `side-navigation-item${path === 'Q&A 게시판' ? ' active' : ''}`;

    //                    state                    //
    const { pathname } = useLocation();

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onAnnouncementClickHandler = () => navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    const onTrendClickHandler = () => navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
    const onCustomerClickHandler = () => navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
    const onDesignerClickHandler = () => navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    const onQnaClickHandler = () => navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);

    //                    render                    //
    return (
        <div className='side-navigatioin-container'>
            <div className={announcementClass} onClick={onAnnouncementClickHandler}>
                <div className='side-navigation-title'>공지사항</div>
            </div>
            <div className={trendClass} onClick={onTrendClickHandler}>
                <div className='side-navigation-title'>트렌드 게시판</div>
            </div>
            <div className={customerClass} onClick={onCustomerClickHandler}>
                <div className='side-navigation-title'>고객 게시판</div>
            </div>
            <div className={designerClass} onClick={onDesignerClickHandler}>
                <div className='side-navigation-title'>디자이너 게시판</div>
            </div>
            <div className={qnaClass} onClick={onQnaClickHandler}>
                <div className='side-navigation-title'>Q&A 게시판</div>
            </div>
        </div>
    );
}


//                    component                    //
export default function ServiceContainer() {
//                     state                       //

//                    function                     //

//                    effect                       //



//                    render                       //
    return (
    <div id='wrapper'>1
    {/* <TopBar path={path} /> */}
        <div className='Topbar'>2</div>   
        <div className='under-bar'>3
        {/* <SideNavigation path={path} /> */}
            <div className='left-bar'>4</div>
            <div className='center-bar'>5</div>
            <div className='right-bar'>6</div>
        </div>
    </div>
    );
}
