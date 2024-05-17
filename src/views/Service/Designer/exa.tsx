import React, { useState } from 'react';
import './service.css'; 
import { Outlet } from 'react-router';

type Path = '공지사항' | '트렌드 게시판' | '소통 플랫폼' | '디자이너 게시판' | 'Q&A 게시판' | '';

interface Props {
    path: Path;
}

function TopBar({ path }: Props)  {
    return (
        <>
        <div className='logo'>헤어어드바</div>
        <div className="top-bar-container">
            <div className="top-bar-title">{ path }</div>
            <div className="top-bar-right">
                <div className="top-bar-role">내정보</div>
                <div>로그아웃</div>
            </div>
        </div>
        </>
    );
}

function SideNavigation({ path }: Props) {

    const announcementClass = `side-navigation-item${path === '공지사항' ? ' active' : ''}`;
    const trendClass = `side-navigation-item${path === '트렌드 게시판' ? ' active' : ''}`;
    const communicationClass = `side-navigation-item${path === '소통 플랫폼' ? ' active' : ''}`;
    const designerClass = `side-navigation-item${path === '디자이너 게시판' ? ' active' : ''}`;
    const qnaClass = `side-navigation-item${path === 'Q&A 게시판' ? ' active' : ''}`;

    return (
        <div className="side-navigation-container">
            <div className={announcementClass} >
                <div className="side-navigation-title">공지사항</div>
            </div>
            <div className={trendClass} >
                <div className="side-navigation-title">트렌드 게시판</div>
            </div>
            <div className={communicationClass} >
                <div className="side-navigation-title">소통 플랫폼</div>
            </div>
            <div className={designerClass} >
                <div className="side-navigation-title">디자이너 게시판</div>
            </div>
            <div className={qnaClass}>
                <div className="side-navigation-title">Q&A 게시판</div>
            </div>
        </div>
    );
}


export default function Exa() {


    const [path, setPath] = useState<Path>('');

    return (
        <div id="wrapper">
            <TopBar path={path} />
            <SideNavigation path={path} />
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    );
}
