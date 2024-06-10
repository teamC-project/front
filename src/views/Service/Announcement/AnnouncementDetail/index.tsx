import React, { ChangeEvent, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';


import { GetAnnouncementBoardListResponseDto, GetAnnouncementBoardResponseDto } from 'src/apis/announcement/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';


//                    component                    //
export default function AnnouncementBoardDetail() {

    //              state               //
    const { loginUserId, loginUserRole } = useUserStore();
    const { announcementBoardNumber } = useParams();
    const { announcementBoardCommentNumber = '' } = useParams<{ announcementBoardCommentNumber: string }>();
    const [cookies] = useCookies();

    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string | null>(null);

    //                  function                    //
    const navigate = useNavigate();

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
                navigate(MAIN_PATH);
                return;
            }
            navigate(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { title, writerId, writeDatetime, viewCount, contents, comment } = result as GetAnnouncementBoardResponseDto;
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
        setComment(comment);
    };

    //                   event handler                    //
    const handleGoToList = () => {
        navigate(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };
    
    const onUpdateClickHandler = () => {
        if (!announcementBoardNumber || loginUserId !== writerId) return;
        navigate(DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH(announcementBoardNumber));
    };

    //              render              //
    return (
    <div className="announcement-detail">
        <div className="announcement-detail-title">제목{title}</div>
        <div className="announcement-detail-container">
            <div className="announcement-detail-information">
                <div className="announcement-detail-information1">작성자{writerId}</div>
                <div className="announcement-detail-information2">작성일{writeDate}</div>
                <div className="announcement-detail-information3">조회{viewCount}</div>
                <div className="announcement-detail-information4">삭제</div>
                <div className="announcement-detail-information5" onClick={onUpdateClickHandler}>수정</div>
            </div>
        </div>
        <div className="announcement-detail-view">
        </div>

        <div className="announcement-detail-go-to-announcementList" onClick={handleGoToList}>
        목록으로
        </div>
    </div>
    );
}