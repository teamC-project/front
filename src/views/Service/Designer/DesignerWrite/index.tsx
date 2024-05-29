import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "./style.css";
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostDesignerBoardRequestDto } from 'src/apis/designerBoard/dto/request';
import { postDesignerBoardRequest } from 'src/apis/designerBoard';
import ToastEditor from 'src/components/ToastEditor';
import Editor from '@toast-ui/editor';

//              component               //
export default function DesignerWrite() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selection, setSelection] = useState<Range | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const editorRef = useRef<Editor|null>(null);

    //              function               //
    const navigator = useNavigate();

    const postDesignerBoardResponse =(result: ResponseDto | null) => {

        const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };

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

    const onPostButtonClickHandler = () => {
        if (!title.trim() || !contents.trim()) return;
        if (!cookies.accessToken) return;

        const requestBody: PostDesignerBoardRequestDto = { title, contents };

        postDesignerBoardRequest(requestBody, cookies.accessToken).then(postDesignerBoardResponse);
    };

    //             effect               //
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole]);

    //                    render                    //
    return (
        <div id='designer-write-wrapper'>
            <div className='designer-write-top'>
                <div className='designer-write-title-box'>
                    <div className='designer-write-title'>제목</div>
                    <input className='designer-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}></input>
                </div>
            </div>


            {/* <ToastEditor ref={editorRef} body={trendBoardContents} setBody={onTrendBoardContentsChangeHandler} /> */}

            <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
        </div>
    );
}
