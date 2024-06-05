import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "./style.css";
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { CUSTOMER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostCustomerBoardRequestDto } from 'src/apis/customerBoard/dto/request';
import { postCustomerBoardRequest } from 'src/apis/customerBoard';
import ToastEditor from 'src/components/ToastEditor';
import Editor from '@toast-ui/editor';

//              component               //
export default function CustomerWrite() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selection, setSelection] = useState<Range | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const editorRef = useRef<Editor|null>(null);
    const [isSecret, setIsSecret] = useState<boolean>(false);

    //              function               //
    const navigator = useNavigate();

    const postCustomerBoardResponse =(result: ResponseDto | null) => {

        const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
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

    const onSecretChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIsSecret(event.target.checked);
    };
    
    const onPostButtonClickHandler = () => {
        if (!title.trim() || !contents.trim()) return;
        if (!cookies.accessToken) return;
    
        const requestBody: PostCustomerBoardRequestDto = { 
            customerBoardTitle: title, 
            customerBoardContents: contents, 
            isSecret: isSecret
        };
    
        postCustomerBoardRequest(requestBody, cookies.accessToken)
            .then(postCustomerBoardResponse);
    };

    //             effect               //
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
            navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole]);

    //                    render                    //
    return (
        <div id='customer-write-wrapper'>
            <div className='customer-write-top'>
                <div className='customer-write-title-box'>
                    <div className='customer-write-title'>제목</div>
                    <input className='customer-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}></input>
                </div>
                <div className='customer-write-secret'>
                    <label>
                        <input type='checkbox' checked={isSecret} onChange={onSecretChangeHandler} />
                        비밀글
                    </label>
                </div>
            </div>


            {/* <ToastEditor ref={editorRef} body={trendBoardContents} setBody={onTrendBoardContentsChangeHandler} /> */}

            <div className='customer-write-contents-box'>
                <textarea
                    className='customer-write-contents-textarea'
                    placeholder='내용을 입력해주세요.'
                    value={contents}
                    onChange={onContentsChangeHandler}
                ></textarea>
            </div>
            <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
        </div>
    );
}
