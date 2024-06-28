import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { useUserStore } from 'src/stores';

import ResponseDto from 'src/apis/response.dto';
import {  QNA_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

import { postQnaBoardRequest } from 'src/apis/QnaBoard';
import { PostQnaBoardRequestDto } from 'src/apis/QnaBoard/dto/request';

import './style.css';
import '../../../../App.css'

//							component							//
export default function QnaBoardWrite() {

//							state							//
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [qnaBoardTitle, setQnaBoardTitle] = useState<string>('');
    const [qnaBoardContents, setQnaBoardContents] = useState<string>('');

//							function							//
    const navigator = useNavigate();

    const postQnaBoardResponse =(result: ResponseDto | null) => {

        const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
    };

//							event handler							//
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const qnaBoardTitle = event.target.value;
        setQnaBoardTitle(qnaBoardTitle);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const qnaBoardContents = event.target.value;
        if (qnaBoardContents.length > 1000) return;
        setQnaBoardContents(qnaBoardContents);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };

    const onPostButtonClickHandler = () => {
        if (!qnaBoardTitle.trim() || !qnaBoardContents.trim()) {
				alert("제목과 내용 모두 입력해주세요.");
				return;
		}
        if (!cookies.accessToken) return;
        const requestBody: PostQnaBoardRequestDto = { qnaBoardTitle ,qnaBoardContents };
        postQnaBoardRequest(requestBody, cookies.accessToken).then(postQnaBoardResponse);
    };

//							effect							//
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
            navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole]);

//							render							//
    return (
        <div id='qna-board-write-wrapper'>
            <div className='qna-board-write-top'>
                <div className='qna-board-write-title-box'>
                    <div className='qna-board-write-title'>제목</div>
                    <input 
					className='qna-board-write-title-input' 
					placeholder='제목을 입력해주세요.' 
					value={qnaBoardTitle} 
					onChange={onTitleChangeHandler}/>
                </div>
            </div>
			<div className='qna-board-write-contents-box'>
			<textarea
				ref={contentsRef}
				className="qna-board-write-contents-textarea"
				placeholder="내용을 입력해주세요. / 1000자" 
				maxLength={1000}
				value={qnaBoardContents}
				onChange={onContentsChangeHandler}
			/>
			</div>
            <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
        </div>
    );
}
