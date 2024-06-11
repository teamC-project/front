import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { QnaBoardCommentListItem, QnaBoardListItem } from 'src/types';
import { GetQnaBoardResponseDto } from 'src/apis/QnaBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { QNA_BOARD_LIST_ABSOLUTE_PATH, QNA_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getQnaBoardRequest, postQnaBoardCommentRequest, increaseViewCountRequest, deleteQnaBoardRequest, getQnaBoardListRequest } from 'src/apis/QnaBoard';
import { useUserStore } from 'src/stores';

//                    component                    //
export default function QnaBoardDetail() {

    //              state               //
    const { loginUserId, loginUserRole } = useUserStore();
    const { qnaBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
		const [status, setStatus] = useState<boolean>(false);
    const [writerId, setWriterId] = useState<string>('');
    const [writeDatetime, setWriteDatetime] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string | null>(null);
    const [commentList, setCommentList] = useState<QnaBoardCommentListItem[]>([]);
    const [commentRows, setCommentRows] = useState<number>(1);

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
            navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        if (!cookies.accessToken || !qnaBoardNumber) return;
        getQnaBoardRequest(qnaBoardNumber, cookies.accessToken)
            .then(getQnaBoardResponse);
    };
  
    const getQnaBoardResponse = (result: GetQnaBoardResponseDto | ResponseDto | null) => {
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
            navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const {
            qnaBoardTitle,
						qnaBoardStatus,
            qnaBoardWriterId,
            qnaBoardWriteDatetime,
            qnaBoardViewCount,
            qnaBoardContents,
            qnaBoardComment,
        } = result as GetQnaBoardResponseDto;

        setTitle(qnaBoardTitle);
				setStatus(qnaBoardStatus)
        setWriterId(qnaBoardWriterId);
        setWriteDatetime(qnaBoardWriteDatetime);
        setViewCount(qnaBoardViewCount);
        setContents(qnaBoardContents);
        setComment(qnaBoardComment);
    };

    const postQnaBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!qnaBoardNumber || !cookies.accessToken) return;
        getQnaBoardRequest(qnaBoardNumber, cookies.accessToken)
            .then(getQnaBoardResponse);
    };

    const deleteQnaBoardResponse = (result: ResponseDto | null) => {
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

        navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
    };

    //                   event handler                    //
    const handleGoToList = () => {
        navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
    };
    
    const onUpdateClickHandler = () => {
        if (!qnaBoardNumber || loginUserId !== writerId) return;
        navigator(QNA_BOARD_UPDATE_ABSOLUTE_PATH(qnaBoardNumber));
    };

    const onDeleteButtonClickHandler = () => {
        if (!qnaBoardNumber || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteQnaBoardRequest(qnaBoardNumber, cookies.accessToken)
            .then(deleteQnaBoardResponse)
            .catch(() => {
                alert('게시물 삭제 중 오류가 발생했습니다.');
            });
    };

    //                   effect                        //
    useEffect(() => {
        if (!cookies.accessToken || !qnaBoardNumber) return;
        increaseViewCountRequest(qnaBoardNumber, cookies.accessToken)
            .then(increaseViewCountResponse);
            getQnaBoardRequest(qnaBoardNumber, cookies.accessToken)
            .then(getQnaBoardResponse);
    }, [cookies.accessToken, qnaBoardNumber]);

    //              render              //
    return (
        <div className="qna-detail">
            <div className="qna-detail-title">{title}</div>
            <div className="qna-detail-container">
                <div className="qna-detail-information">
                    <div className="qna-detail-information1">작성자 {writerId}</div>
										<div className="qna-detail-information2">접수 상태 {status}</div>
                    <div className="qna-detail-information3">작성일 {writeDatetime}</div>
                    <div className="qna-detail-information4">조회수 {viewCount}</div>
										{loginUserId === writerId && (
                    <>
                        <div className="qna-detail-information4" onClick={onDeleteButtonClickHandler}>삭제</div>
                        <div className="qna-detail-information5" onClick={onUpdateClickHandler}>
                        수정
                        </div>
                    </>
                    )}
                </div>
            </div>
            <div className="qna-detail-view">
                {contents}
            </div>
            <div className="qna-detail-go-to-qnaList" onClick={handleGoToList}>
                목록으로
            </div>
        </div>
    );
}
