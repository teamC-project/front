import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "./style.css";
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
<<<<<<< HEAD
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostAnnouncementBoardRequestDto } from 'src/apis/announcementBoard/dto/request';
import { postAnnouncementBoardRequest } from 'src/apis/announcementBoard';
import ToastEditor from 'src/components/ToastEditor';
import Editor from '@toast-ui/editor';

=======
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostAnnouncementBoardRequestDto } from 'src/apis/announcement/dto/request';
import { postAnnnouncementBoardRequest } from 'src/apis/announcement';


>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
//              component               //
export default function AnnouncementWrite() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
<<<<<<< HEAD
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selection, setSelection] = useState<Range | null>(null);
=======
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
<<<<<<< HEAD
    const editorRef = useRef<Editor|null>(null);
=======

>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c

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

<<<<<<< HEAD
    const restoreSelection = () => {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        if (selection) {
            sel?.addRange(selection);
        }
    };

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            setSelection(sel.getRangeAt(0));
        }
    };
=======
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c

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

<<<<<<< HEAD
	const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target?.result as string;
            
            restoreSelection();
            if (selection) {
                selection.deleteContents();
                selection.insertNode(img);
            }
            saveSelection();
            };
            reader.readAsDataURL(file);
        }
    };
=======



>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c

    const onPostButtonClickHandler = () => {
        if (!title.trim() || !contents.trim()) return;
        if (!cookies.accessToken) return;
<<<<<<< HEAD
    
        const requestBody: PostAnnouncementBoardRequestDto = { 
            announcementBoardTitle: title, 
            announcementBoardContents: contents, 
        };
    
        postAnnouncementBoardRequest(requestBody, cookies.accessToken)
            .then(postAnnouncementBoardResponse);
=======

        const requestBody: PostAnnouncementBoardRequestDto = { title, contents };

        postAnnnouncementBoardRequest(requestBody, cookies.accessToken).then(postAnnouncementBoardResponse);
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
    };

    //             effect               //
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
<<<<<<< HEAD
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
=======
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
            return;
        }
    }, [loginUserRole]);

<<<<<<< HEAD
    //                    render                    //
=======
    //                    render                    //\
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
    return (
        <div id='announcement-write-wrapper'>
            <div className='announcement-write-top'>
                <div className='announcement-write-title-box'>
                    <div className='announcement-write-title'>제목</div>
                    <input className='announcement-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}></input>
                </div>
            </div>


            {/* <ToastEditor ref={editorRef} body={trendBoardContents} setBody={onTrendBoardContentsChangeHandler} /> */}

<<<<<<< HEAD
            <div className='announcement-write-contents-box'>
                <textarea
                    className='announcement-write-contents-textarea'
                    placeholder='내용을 입력해주세요.'
                    value={contents}
                    onChange={onContentsChangeHandler}
                ></textarea>
            </div>
=======
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
            <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
        </div>
    );
}
