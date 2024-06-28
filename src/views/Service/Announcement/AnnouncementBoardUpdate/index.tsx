import {
	ChangeEvent, 
	useEffect, 
	useRef, 
	useState } 
from 'react';
import { useNavigate, useParams } from 'react-router';

import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';

import { PutAnnouncementBoardRequestDto } from 'src/apis/announcement/dto/request';
import { GetAnnouncementBoardResponseDto } from 'src/apis/announcement/dto/response';
import { getAnnouncementBoardRequest, putAnnouncementBoardRequest } from 'src/apis/announcement';
import ResponseDto from 'src/apis/response.dto';

import { ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH, ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

import "./style.css";

//							component							//
export default function AnnouncementBoardUpdate() {

//							state							//
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserId, loginUserRole } = useUserStore();
    const { announcementBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');

//							function							//
    const navigator = useNavigate();

    const getAnnouncementBoardResponse = (result: GetAnnouncementBoardResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'AF' ? '인증에 실패 했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if  (!result || result.code !== 'SU') {
            alert(message);
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { announcementBoardWriterId, announcementBoardTitle, announcementBoardContents } = result as GetAnnouncementBoardResponseDto;
        if (announcementBoardWriterId !== loginUserId) {
            alert('권한이 없습니다.');
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
        
        setTitle(announcementBoardTitle);
        setContents(announcementBoardContents);
	};

    const putAnnouncementBoardResponse = (result: ResponseDto | null) => {
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
        if (!announcementBoardNumber) return;
        navigator(ANNOUNCEMENT_BOARD_DETAIL_ABSOLUTE_PATH(announcementBoardNumber));
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

    const onUpdateButtonClickHandler = () => {
        if (!cookies.accessToken || !announcementBoardNumber) return;
        if (!title.trim() || !contents.trim())  {
			alert("제목과 내용 모두 입력해주세요.");
			return;
		}
        const requestBody: PutAnnouncementBoardRequestDto = { announcementBoardTitle: title, announcementBoardContents: contents };
        putAnnouncementBoardRequest(announcementBoardNumber, requestBody, cookies.accessToken).then(putAnnouncementBoardResponse);
    };

//							effect							//
    let effectFlag = false;
    useEffect(() => {
        if (!announcementBoardNumber || !cookies.accessToken || !loginUserRole || effectFlag) return;

        effectFlag = true;
        if (loginUserRole !== "ROLE_ADMIN") {
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
        getAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken).then(getAnnouncementBoardResponse);
    }, [loginUserRole]);

//							render							//
    return (
        <div id='announcement-board-update-wrapper'>
            <div className='announcement-board-update-top'>
                <div className='announcement-board-update-title-box'>
                    <div className='announcement-board-update-title'>제목</div>
                    <input 
					className='announcement-board-update-title-input' 
					placeholder='제목을 입력해주세요.' 
					value={title} 
					onChange={onTitleChangeHandler}
					/>
                </div>
            </div>
            <div className='announcement-board-update-contents-box'>
                <textarea 
				ref={contentsRef} 
				className='announcement-board-update-contents-textarea' 
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
