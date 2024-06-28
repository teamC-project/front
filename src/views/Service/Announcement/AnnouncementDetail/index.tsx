import  { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';

import { useUserStore } from 'src/stores';

import { 
	ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH,
	ANNOUNCEMENT_BOARD_UPDATE_ABSOLUTE_PATH, 
	MAIN_PATH } 
from 'src/constant';
import { 
	getAnnouncementBoardRequest, 
	increaseAnnouncementBoardViewCountRequest, 
	deleteAnnouncementBoardRequest,  
} from 'src/apis/announcement';

import { GetAnnouncementBoardResponseDto } from 'src/apis/announcement/dto/response';
import ResponseDto from 'src/apis/response.dto';

import './style.css';
import '../../../../App.css'

//							component							//
export default function AnnouncementBoardDetail() {

//							state							//
    const { loginUserId } = useUserStore();
    const { announcementBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');


 //							function							//
    const navigator = useNavigate();

    const increaseViewCountResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_PATH);
                return;
            }
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        if (!cookies.accessToken || !announcementBoardNumber) return;
        getAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken)
            .then(getAnnouncementBoardResponse);
    };

    const getAnnouncementBoardResponse = (result: GetAnnouncementBoardResponseDto | ResponseDto | null) => {
        const message = 
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'VF' ? '잘못된 접수 번호입니다.' :
			result.code === 'AF' ? '인증에 실패 했습니다.' :
			result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_PATH);
                return;
            }
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const {
            announcementBoardTitle,
            announcementBoardWriterId,
            announcementBoardWriteDatetime,
            announcementBoardViewCount,
            announcementBoardContents,
        } = result as GetAnnouncementBoardResponseDto;

        setTitle(announcementBoardTitle);
        setWriterId(announcementBoardWriterId);
        setWriteDate(announcementBoardWriteDatetime);
        setViewCount(announcementBoardViewCount);
        setContents(announcementBoardContents);
    };

    const deleteAnnouncementBoardResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    };

//							event handler							//
    const handleGoToList = () => {
        navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    };
    
    const onUpdateClickHandler = () => {
        if (!announcementBoardNumber || loginUserId !== writerId) return;
        navigator(ANNOUNCEMENT_BOARD_UPDATE_ABSOLUTE_PATH(announcementBoardNumber));
    };

    const onDeleteButtonClickHandler = () => {
        if (!announcementBoardNumber || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken)
            .then(deleteAnnouncementBoardResponse)
            .catch(() => {
                alert('게시물 삭제 중 오류가 발생했습니다.');
            });
    };

//							effect							//
    useEffect(() => {
        if (!cookies.accessToken || !announcementBoardNumber) return;
        increaseAnnouncementBoardViewCountRequest(announcementBoardNumber, cookies.accessToken)
            .then(increaseViewCountResponse);
            getAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken)
            .then(getAnnouncementBoardResponse);
    }, [cookies.accessToken, announcementBoardNumber]);

//							render							//
    return (
        <div className="announcement-board-detail">
            <div className="announcement-board-detail-title">{title}</div>
            <div className="announcement-board-detail-container">
                <div className="announcement-board-detail-information">
                    <div className="announcement-board-detail-information1">작성자: {writerId}</div>
                    <div className="announcement-board-detail-information2">작성일: {writeDate}</div>
                    <div className="announcement-board-detail-information3">조회수: {viewCount}</div>
                    {loginUserId === writerId && (
                    <>
                        <div className="announcement-board-detail-information4" onClick={onDeleteButtonClickHandler}>삭제</div>
                        <div className="announcement-board-detail-information5" onClick={onUpdateClickHandler}>
                        수정
                        </div>
                    </>
                    )}
                </div>
            </div>
            <div className="announcement-board-detail-view">
                {contents}
            </div>
            <div className="announcement-board-detail-go-to-announcementList" onClick={handleGoToList}>
                목록으로
            </div>
        </div>
    );
}
