import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { useUserStore } from 'src/stores';

import { GetQnaBoardResponseDto } from 'src/apis/QnaBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';

import { QNA_BOARD_DETAIL_ABSOLUTE_PATH, QNA_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PutQnaBoardRequestDto } from 'src/apis/QnaBoard/dto/request';
import { getQnaBoardRequest, putQnaBoardRequest } from 'src/apis/QnaBoard';

import './style.css';
import'../../../../App.css';
//							component							//
export default function QnaBoardUpdate() {

//							state							//
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const { qnaBoardNumber } = useParams<{ qnaBoardNumber: string }>();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');

//							function							//
    const navigator = useNavigate();

    const getQnaBoardResponse = (result: GetQnaBoardResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
                result.code === 'AF' ? '인증에 실패 했습니다.' :
                result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
        if  (!result || result.code !== 'SU') {
            alert(message);
            navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    
        const { qnaBoardTitle, qnaBoardContents } = result as GetQnaBoardResponseDto;
        setTitle(qnaBoardTitle);
        setContents(qnaBoardContents);
    };

    const putQnaBoardResponse = (result: ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해 주세요.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!qnaBoardNumber) return;
        navigator(QNA_BOARD_DETAIL_ABSOLUTE_PATH(qnaBoardNumber));

    };

//							event handler							//
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

    const onUpdateButtonClickHandler = () => {
        if (!cookies.accessToken || !qnaBoardNumber) return;
        if (!title.trim() || !contents.trim())  {
					alert("제목과 내용 모두 입력해주세요.");
					return;
				}

        const requestBody: PutQnaBoardRequestDto = { qnaBoardTitle: title, qnaBoardContents: contents };
        putQnaBoardRequest(parseInt(qnaBoardNumber), requestBody, cookies.accessToken)
            .then(result => putQnaBoardResponse(result as ResponseDto));
    };

//							effect							//
    let effectFlag = false;
    useEffect(() => {
        if (!qnaBoardNumber || !cookies.accessToken || !loginUserRole || effectFlag) return;
        effectFlag = true;
        getQnaBoardRequest(parseInt(qnaBoardNumber), cookies.accessToken).then(result => {
            if (loginUserRole === 'ROLE_ADMIN') {
                alert('권한이 없습니다.');
                navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
                return;
            }
            getQnaBoardResponse(result);
        });
    }, [qnaBoardNumber, cookies.accessToken, loginUserRole]);

//							render							//
    return (
        <div id='qna-write-wrapper'>
            <div className='qna-write-top'>
                <div className='qna-write-title-box'>
                    <div className='qna-write-title'>제목</div>
                    <input className='qna-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}></input>
                </div>
            </div>
            <div className='qna-write-contents-box'>
                <textarea 
				ref={contentsRef}
				className='qna-write-contents-textarea' 
				placeholder='내용을 입력해주세요. / 1000자' 
				maxLength={1000} 
				value={contents} 
				onChange={onContentsChangeHandler}
				/>
            </div>
            <div className='primary-button' onClick={onUpdateButtonClickHandler}>수정</div>
        </div>
    );
}
