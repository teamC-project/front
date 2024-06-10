import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import {  GetAnnouncementBoardResponseDto } from 'src/apis/announcement/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH,  DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { deleteAnnouncementBoardRequest, getAnnouncementBoardRequest, increaseAnnouncementBoardViewCountRequest } from 'src/apis/announcement';


//                    component                    //
export default function AnnouncementBoardDetail() {

    //              state               //
    const { loginUserId, loginUserRole } = useUserStore();
    const { announcementBoardNumber } = useParams();
    const [cookies] = useCookies();

    const [announcementBoardTitle, setAnnouncementBoardTitle] = useState<string>('');
    const [announcementBoardWriterId, setAnnouncementBoardWriterId] = useState<string>('');
    const [announcementBoardWriteDatetime, setAnnouncementBoardWriteDatetime] = useState<string>('');
    const [announcementBoardViewCount, setAnnouncementBoardViewCount] = useState<number>(0);
    const [announcementBoardContents, setAnnouncementBoardContents] = useState<string>('');

    //                  function                    //
    const navigate = useNavigate();

		const increaseAnnouncementBoardViewCountResponse = (result : ResponseDto | null) => {
			const message  = !result
			? "서버에 문제가 있습니다."
			: result.code === "VF"
			? "잘못된 게시물 번호 입니다."
			: result.code === "AF"
			? "인증에 실패했습니다."
			: result.code === "NB"
			? "존재하지 않는 게시물 입니다."
			: result.code === "DBE" 
			? "서버에 문제가 있습니다"
			: "";

			if(!result || result.code !== "SU") {
				alert(message);
				if(result?.code === 'AF') navigate
				(AUTH_ABSOLUTE_PATH);
				return;
			}
		}

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
            navigate(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { announcementBoardTitle, announcementBoardWriterId, announcementBoardWriteDatetime, announcementBoardViewCount, announcementBoardContents, } = result as GetAnnouncementBoardResponseDto;
        setAnnouncementBoardTitle(announcementBoardTitle);
        setAnnouncementBoardWriterId(announcementBoardWriterId);
        setAnnouncementBoardWriteDatetime(announcementBoardWriteDatetime);
        setAnnouncementBoardViewCount(announcementBoardViewCount);
        setAnnouncementBoardContents(announcementBoardContents);


    };

		const deleteAnnouncementBoardResponse = (result : ResponseDto | null) => {
			const message = !result
			? "서버에 문제가 있습니다."
			: result.code === "AF"
			? "권한이 없습니다."
			: result.code === "VF"
			? "올바르지 않은 게시물 번호 입니다."
			: result.code === "NB"
			? "존재하지 않은 게시물 번호 입니다."
			: result.code === "DBE"
			? "서버에 문제가 있습니다."
			: "";

			if(!result || result.code !== "SU") {
				alert(message);
				return;
			}

			navigate(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
		}

    //                   event handler                    //
    const handleGoToList = () => {
        navigate(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    };
    
    const onUpdateClickHandler = () => {
        if (!announcementBoardNumber || loginUserId !== announcementBoardWriterId) return;
        navigate(DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH(announcementBoardNumber));
    };

		const onDeleteClickHandler = () => {
			if (!announcementBoardNumber || loginUserId !== announcementBoardWriterId || !cookies.accessToken)
				return;
			const isConfirm = window.confirm('정말로 삭제 하시겠습니까?');
			if(!isConfirm) return;

			deleteAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken).then(
				deleteAnnouncementBoardResponse
			)
		}

		// 										effect 										//
			useEffect(() => {
				if(!cookies.accessToken || !announcementBoardNumber) return;
				increaseAnnouncementBoardViewCountRequest(announcementBoardNumber, cookies.accessToken)
				.then(increaseAnnouncementBoardViewCountResponse)
				getAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken).then(getAnnouncementBoardResponse)
			}, [cookies.accessToken, announcementBoardNumber]);
    //              render              //
		const coverdWriterId = 
		announcementBoardWriterId !== "" && announcementBoardWriterId[0] + "*".repeat(announcementBoardWriterId.length-1)
    return (
    <div className="announcement-detail">
        <div className="announcement-detail-title">제목{announcementBoardTitle}</div>
        <div className="announcement-detail-container">
            <div className="announcement-detail-information">
                <div className="announcement-detail-information1">작성자{coverdWriterId}</div>
                <div className="announcement-detail-information2">작성일{announcementBoardWriteDatetime}</div>
                <div className="announcement-detail-information3">조회수{announcementBoardViewCount}</div>
                <div className="announcement-detail-information4">삭제</div>
                <div className="announcement-detail-information5" onClick={onUpdateClickHandler}>수정</div>
								<div className='error-button' onClick={onDeleteClickHandler}>삭제</div>
            </div>
        </div>
        <div className="announcement-detail-view">
        </div>
				{announcementBoardContents}
        <div className="announcement-detail-go-to-announcementList" onClick={handleGoToList}>
        목록으로
        </div>
    </div>
    );
}