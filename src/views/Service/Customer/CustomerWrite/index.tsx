import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { Editor } from '@toast-ui/react-editor';

import { useUserStore } from 'src/stores';
import { postCustomerBoardRequest } from 'src/apis/customerBoard';
import { PostCustomerBoardRequestDto } from 'src/apis/customerBoard/dto/request';
import ResponseDto from 'src/apis/response.dto';

import { CUSTOMER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import ToastEditor from 'src/components/ToastEditor';

import "./style.css";

//                          component                           //
export default function CustomerWrite() {

//                          state                           //
    const [urlList, setUrlList] = useState<{ base64: string; url: string }[]>([]);
    const [isSecret, setIsSecret] = useState<boolean>(false);
    const [contents, setContents] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const editorRef = useRef<Editor | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();

//                          function                            //
    const navigator = useNavigate();

    const postCustomerBoardResponse = (result: ResponseDto | null) => {

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

//                          event handler                           //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title);
    };

    const onContentsChangeHandler = (contents: string) => {
        setContents(contents);
    }

    const onSecretChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIsSecret(event.target.checked);
    };

    const onImageChangeHandler = (imageList: { base64: string; url: string }[]) => {
        setUrlList(imageList);
    }

    const onPostButtonClickHandler = () => {
        if (!cookies.accessToken) return;

        const requestBody: PostCustomerBoardRequestDto = {
            customerBoardTitle: title.trim(),
            customerBoardContents: contents.trim(),
            secret: isSecret
        };

        const isBlank = requestBody.customerBoardContents.replaceAll('<p><br></p>', '');

        if (!requestBody.customerBoardTitle && !requestBody.customerBoardContents && !isBlank) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        else if (!requestBody.customerBoardTitle) {
            alert("제목을 입력해주세요.");
            return;
        }

        else if (!requestBody.customerBoardContents || !isBlank) {
            alert("내용을 입력해주세요.");
            return;
        }

        postCustomerBoardRequest(requestBody, cookies.accessToken)
            .then(postCustomerBoardResponse);
    };

//                          effect                          //
    useEffect(() => {
        if (!loginUserRole) return;
        if (loginUserRole !== 'ROLE_CUSTOMER') {
            navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole]);

//                          render                          //
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
            <div className='customer-write-contents-box'>
                <ToastEditor
                    ref={editorRef}
                    body={contents}
                    setBody={onContentsChangeHandler}
                    imageList={urlList}
                    setImageList={onImageChangeHandler}
                />
            </div>
            <div className='customer-write-button'>
                <button className='customer-write-click-button' onClick={onPostButtonClickHandler}>
                    올리기
                </button>
            </div>
        </div>
    );
}   