import React from 'react';
import "./style.css";
import { Outlet } from 'react-router';

type Path = '공지사항' | '트렌드 게시판' | '고객 게시판' | '디자이너 게시판' | 'Q&A 게시판' | '';


export default function ServiceContainer() {
    //                    render                       //
    return (
        <div id='full'>
            <div className='top'>
                <div className='top-group'>
                    <div className='top-logo'>헤어 어드바이저</div>
                    <div className='top-bar-title'>path</div>
                    <div className='top-bar-service'>
                        <div className='top-bar-role'>내정보</div>
                        <div className='logout-button'>로그아웃</div>
                    </div>
                </div>
            </div>
            <div className='under'>
                <div className='left-bar'>
                    <div className='left-bar-container'>
                        <div className='left-bar-title'>공지사항</div>
                        <div className='left-bar-title'>트렌드 게시판</div>
                        <div className='left-bar-title'>고객 게시판</div>
                        <div className='left-bar-title'>디자이너 게시판</div>
                        <div className='left-bar-title'>Q&A  게시판</div>
                    </div>
                </div>
                <div className='center-bar'> <Outlet /></div>
                <div className='right-bar'>구현미정
                    <div className='customer-chat'>채팅
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
