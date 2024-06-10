<<<<<<< HEAD
import React, { useEffect, ChangeEvent, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { GetAnnouncementBoardResponseDto } from 'src/apis/announcementBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, ANNOUNCEMENT_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getAnnouncementBoardRequest, increaseViewCountRequest } from 'src/apis/announcementBoard';
import { useUserStore } from 'src/stores';


interface Props {
    contents: string;
}
=======
import React, { ChangeEvent, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';


import { GetAnnouncementBoardListResponseDto, GetAnnouncementBoardResponseDto } from 'src/apis/announcement/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c


//                    component                    //
export default function AnnouncementDetail() {

    //              state               //
    const { loginUserId, loginUserRole } = useUserStore();
    const { announcementBoardNumber } = useParams();
<<<<<<< HEAD
    const [cookies] = useCookies();
=======
    const { announcementBoardCommentNumber = '' } = useParams<{ announcementBoardCommentNumber: string }>();
    const [cookies] = useCookies();

>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
<<<<<<< HEAD

    //                  function                    //
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
  
=======
    const [comment, setComment] = useState<string | null>(null);

    //                  function                    //
    const navigate = useNavigate();

>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
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
<<<<<<< HEAD
                navigator(MAIN_PATH);
                return;
            }
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { announcementBoardTitle: title,
          announcementBoardWriterId: writerId,
          announcementBoardWriteDatetime: writeDatetime,
          announcementBoardViewCount: viewCount,
          announcementBoardContents: contents
          } = result as GetAnnouncementBoardResponseDto;

          

=======
                navigate(MAIN_PATH);
                return;
            }
            navigate(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { title, writerId, writeDatetime, viewCount, contents, comment } = result as GetAnnouncementBoardResponseDto;
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
<<<<<<< HEAD
    };

    const postAnnouncementBoardCommentResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!announcementBoardNumber || !cookies.accessToken) return;
        getAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken)
            .then(getAnnouncementBoardResponse);
            
=======
        setComment(comment);
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
    };

    //                   event handler                    //
    const handleGoToList = () => {
<<<<<<< HEAD
        navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
=======
        navigate(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
    };
    
    const onUpdateClickHandler = () => {
        if (!announcementBoardNumber || loginUserId !== writerId) return;
<<<<<<< HEAD
        navigator(ANNOUNCEMENT_BOARD_UPDATE_ABSOLUTE_PATH(announcementBoardNumber));
    };

    

    //                   effect                        //
    useEffect(() => {
      if (!cookies.accessToken || !announcementBoardNumber) return;
      increaseViewCountRequest(announcementBoardNumber, cookies.accessToken)
        .then(increaseViewCountResponse);
      getAnnouncementBoardRequest(announcementBoardNumber, cookies.accessToken)
        .then(getAnnouncementBoardResponse);
    }, [cookies.accessToken, announcementBoardNumber]);


    //              render              //
    return (
    <div className="announcement-detail">
      <div className="announcement-detail-title">{title}</div>
      <div className="announcement-detail-container">
        <div className="announcement-detail-information">
          <div className="announcement-detail-information1">작성자: {writerId}</div>
          <div className="announcement-detail-information2">작성일: {writeDate}</div>
          <div className="announcement-detail-information3">조회수: {viewCount}</div>
          {/* 작성자와 로그인한 사용자가 같은 경우에만 수정/삭제 버튼 표시 */}
        {loginUserRole === 'ROLE_ADMIN' && (
          <>
            <div className="announcement-detail-information4">삭제</div>
            <div className="announcement-detail-information5" onClick={onUpdateClickHandler}>
              수정
            </div>
          </>
        )}
        </div>
      </div>
      <div className="announcement-detail-view">
        {/* 내용 표시 */}
        {contents}
      </div>
      
      <div className="announcement-detail-go-to-announcementList" onClick={handleGoToList}>
        목록으로
      </div>
=======
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
>>>>>>> 1ffb19c7cdb3b8ed522bd625652bd6ab819fcf3c
    </div>
    );
}
