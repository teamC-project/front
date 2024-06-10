import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "./style.css";
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostAnnouncementBoardRequestDto } from 'src/apis/announcement/dto/request';
import { postAnnnouncementBoardRequest } from 'src/apis/announcement';


//              component               //
export default function AnnouncementBoardWrite() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');


    //              function               //
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


    //              event handler               //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const contents = event.target.value;
        if (contents.length > 1000) return;
        setContents(contents);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };





    const onPostButtonClickHandler = () => {
        if (!title.trim() || !contents.trim()) return;
        if (!cookies.accessToken) return;

        const requestBody: PostAnnouncementBoardRequestDto = { title, contents };

        postAnnnouncementBoardRequest(requestBody, cookies.accessToken).then(postAnnouncementBoardResponse);
    };

    //             effect               //
    // useEffect(() => {
    //     if (loginUserRole !== 'ROLE_ADMIN') {
    //         navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    //         return;
    //     }
    // }, [loginUserRole]);

    //                    render                    //\
    return (
        <div id='announcement-write-wrapper'>
            <div className='announcement-write-top'>
                <div className='announcement-write-title-box'>
                    <div className='announcement-write-title'>제목</div>
                    <input className='announcement-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}></input>
                </div>
            </div>
						<textarea
						ref={contentsRef} 
						name=""
						id=""
						placeholder='내용을 입력해주세요.'
						/>

            <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
        </div>
    );
}
