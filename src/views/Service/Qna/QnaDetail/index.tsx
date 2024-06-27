import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';

import { useUserStore } from 'src/stores';
import ResponseDto from 'src/apis/response.dto';
import { PostQnaBoardCommentRequestDto } from 'src/apis/QnaBoard/dto/request';
import { 
	getQnaBoardRequest, 
	postQnaBoardCommentRequest, 
	increaseViewCountRequest, 
	deleteQnaBoardRequest } 
from 'src/apis/QnaBoard';

import { GetQnaBoardResponseDto } from 'src/apis/QnaBoard/dto/response';
import { 
	QNA_BOARD_LIST_ABSOLUTE_PATH, 
	QNA_BOARD_UPDATE_ABSOLUTE_PATH, 
	MAIN_PATH } 
from 'src/constant';

import './style.css';
import'../../../../App.css'

//							component							//
export default function QnaBoardDetail() {

//							state							//
    const { loginUserId, loginUserRole } = useUserStore();
    const { qnaBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
	const [status, setStatus] = useState<boolean>(false);
    const [writerId, setWriterId] = useState<string>('');
    const [writeDatetime, setWriteDatetime] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [qnaBoardComment, setComment] = useState<string | null>(null);

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
		const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
			if (status || loginUserRole !== "ROLE_ADMIN") return;
			const qnaBoardComment = event.target.value;
			setComment(qnaBoardComment);
	
		};
    const handleGoToList = () => {
        navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
    };

		const onCommentSubmitClickHandler = () => {
			if (!qnaBoardComment || !qnaBoardComment.trim()) return;
			if (
				!qnaBoardNumber ||
				loginUserRole !== "ROLE_ADMIN" ||
				!cookies.accessToken
			)
				return;
	
			const requestBody: PostQnaBoardCommentRequestDto = { qnaBoardComment };
			postQnaBoardCommentRequest(qnaBoardNumber, requestBody, cookies.accessToken).then(
				postQnaBoardCommentResponse
			);
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

//							effect							//
    useEffect(() => {
        if (!cookies.accessToken || !qnaBoardNumber) return;
        increaseViewCountRequest(qnaBoardNumber, cookies.accessToken)
            .then(increaseViewCountResponse);
            getQnaBoardRequest(qnaBoardNumber, cookies.accessToken)
            .then(getQnaBoardResponse);
    }, [cookies.accessToken, qnaBoardNumber]);

//							render							//
    return (
        <div className="qna-board-detail">
            <div className="qna-board-detail-title">{title}</div>
            <div className="qna-board-detail-container">
                <div className="qna-board-detail-information">
                    <div className="qna-board-detail-information1">작성자 {writerId}</div>
                    <div className="qna-board-detail-information3">작성일 {writeDatetime}</div>
                    <div className="qna-board-detail-information4">조회수 {viewCount}</div>
					{loginUserId === writerId && (
					<>
				{!status && (
					<div className="qna-board-detail-information5" onClick={onUpdateClickHandler}>수정</div>
				)}
				<div className="qna-board-detail-information6" onClick={onDeleteButtonClickHandler}>삭제</div>
				</>
			)}
                </div>
            </div>
            <div className="qna-board-detail-view">
                {contents}
            </div>
						{loginUserRole === "ROLE_ADMIN" && !status && (
						<div className='qna-board-detail-comment-write-box'>
							<div className='qna-board-detail-comment-textarea-box'>
								<textarea 
									className='qna-board-detail-comment-textarea'
									placeholder='답글을 작성 해주세요.'
									value = {qnaBoardComment === null ? "" : qnaBoardComment}
									onChange={onCommentChangeHandler}
								/>
							</div>
							<div className='primary-button' onClick = {onCommentSubmitClickHandler}>답글달기</div>
						</div>
					)}
				{status && (
        <div className="qna-board-detail-comment-box">
			<div className="primary-bedge">답변</div>
			<div className="qna-board-detail-comment">{qnaBoardComment}</div>
        </div>
		)}
            <div className="primary-button" onClick={handleGoToList}>
                목록으로
            </div>
        </div>
    );
}
