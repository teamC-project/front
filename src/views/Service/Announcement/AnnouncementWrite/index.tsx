import React,  { ChangeEvent,useEffect,useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { useUserStore } from 'src/stores';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH,  } from 'src/constant';

import ResponseDto from 'src/apis/response.dto';

import { PostAnnouncementBoardRequestDto } from 'src/apis/announcement/dto/request';
import { postAnnouncementBoardRequest } from 'src/apis/announcement';

import'./style.css'
import"../../../../App.css"

//							component							//
export default function AnnouncementBoardWrite() {

//							state							//
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [announcementBoardTitle, setAnnouncementBoardTitle] = useState<string>('');
    const [announcementBoardContents, setAnnouncementBoardContents] = useState<string>('');

//							function							//
    const navigator = useNavigate();

    const postAnnouncementBoardResponse =(result: ResponseDto | null) => {

        const message = 
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
			result.code === 'AF' ? '권한이 없습니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    };

//							event handler							//
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setAnnouncementBoardTitle(title);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const contents = event.target.value;
        if (contents.length > 1000) return;
        setAnnouncementBoardContents(contents);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };

    const onPostButtonClickHandler = () => {
        if (!announcementBoardTitle.trim() || !announcementBoardContents.trim()) {
			alert("제목과 내용 모두 입력해주세요.");
			return;
		}

        if (!cookies.accessToken) return;

        const requestBody: PostAnnouncementBoardRequestDto = { announcementBoardTitle, announcementBoardContents };
        postAnnouncementBoardRequest(requestBody, cookies.accessToken).then(postAnnouncementBoardResponse);
    };

//							effect							//
		useEffect(() => {
			if (!loginUserRole) return;
			if (loginUserRole !=="ROLE_ADMIN" ) {
				navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
				return;
			}
		}, [loginUserRole])

//							render							//
    return (
        <div id='announcement-board-write-wrapper'>
            <div className='announcement-board-write-top'>
                <div className='announcement-board-write-title-box'>
                    <div className='announcement-board-write-title'>제목</div>
                    <input 
					className='announcement-board-write-title-input' 
					placeholder='제목을 입력해주세요.'
					value={announcementBoardTitle} 
					onChange={onTitleChangeHandler}
					/>
                </div>
            </div>
			<div className='announcement-board-write-contents-box'>
				<textarea
				ref={contentsRef} 
				onChange={onContentsChangeHandler}
				name=""
				className='announcement-board-write-contents-textarea'
				id=""
				placeholder='내용을 입력해주세요.'
						/>
						</div>
            <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
        </div>
    );
}