import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteQnaBoardCommentRequest,  getQnaBoardCommentsByBoardNumberRequest,  getQnaBoardRequest, postQnaBoardCommentRequest, putQnaBoardCommentRequest } from 'src/apis/qnaBoard';
import { PostQnaBoardCommentRequestDto, PutQnaBoardCommentRequestDto } from 'src/apis/qnaBoard/dto/request';
import { GetQnaBoardCommentListResponseDto, GetQnaBoardResponseDto } from 'src/apis/qnaBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { QNA_BOARD_DETAIL_ABSOLUTE_PATH, QNA_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { QnaBoardCommentListItem } from 'src/types';

interface Props {
    comment: string;
}



//                    component                    //
export default function QnaBoardComment() {

    //                    state                    //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserId, loginUserRole } = useUserStore();
    const { qnaBoardNumber } = useParams();
    // const { qnaBoardCommentNumber } = useParams();
    const [qnaBoardCommentNumber, setQnaBoardCommentNumber] = useState<number>(1);
    const [qnaBoardCommentList, setQnaBoardCommentList] = useState<QnaBoardCommentListItem[]>([]);
    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [cookies] = useCookies();
    const [commentRows, setCommentRows] = useState<number>(1);
    const [viewList, setViewList] = useState<QnaBoardCommentListItem[]>([]);

    //                  function                    //
    const navigator = useNavigate();

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

        const { title, writerId, writeDatetime, viewCount, contents, comment } = result as GetQnaBoardResponseDto;
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
        if (comment !== null){
            setComment(comment);
        }
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
        getQnaBoardRequest(qnaBoardNumber, cookies.accessToken).then(getQnaBoardResponse);
    };

    const chagneQnaBoardCommentList = (qnaBoardCommentList: QnaBoardCommentListItem[]) => {
        setQnaBoardCommentList(qnaBoardCommentList);
    };

    const getQnaBoardCommentListResponse = (result: GetQnaBoardCommentListResponseDto | ResponseDto | null) => {
        if (!result) {
            console.log('응답이 없습니다.');
            return;
        }

        if ('qnaBoardCommentList' in result) {
            const { qnaBoardCommentList } = result as GetQnaBoardCommentListResponseDto;
            setQnaBoardCommentList(qnaBoardCommentList);
        } else {
            console.log('데이터가 없습니다.');
        }
    };

    const putQnaBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!qnaBoardCommentNumber) return;
        navigator(QNA_BOARD_DETAIL_ABSOLUTE_PATH(qnaBoardCommentNumber));
    };

    const deleteQnaBoardCommentResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'NB' ? ' 존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? ' 서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if(!qnaBoardNumber) return;
        navigator(QNA_BOARD_DETAIL_ABSOLUTE_PATH(qnaBoardNumber));

    };

    //                   event handler                    //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_QNA') return;
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);

    };

    const onPostButtonClickHandler = () => {
        if (!comment.trim()) return;
        if (!cookies.accessToken) return;

        const requestBody: PostQnaBoardCommentRequestDto = { comment };

        if (qnaBoardNumber !== undefined) {
        postQnaBoardCommentRequest(qnaBoardNumber, requestBody, cookies.accessToken).then(postQnaBoardCommentResponse);
        }
        console.log("ok");
    };

    const onUpdateCommentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const comment = event.target.value;
        if (comment.length > 1000) return;
        setComment(comment);

        if (!commentRef.current) return;
        commentRef.current.style.height = 'auto';
        commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    };

    const onUpdateButtonClickHandler = () => {
        if (!cookies.accessToken || !qnaBoardCommentNumber) return;

        const requestBody: PutQnaBoardCommentRequestDto = {comment};
        putQnaBoardCommentRequest(qnaBoardCommentNumber, requestBody, cookies.accessToken).then(putQnaBoardCommentResponse);
        console.log("ok");
    };

    const onDeleteClikcHandler = () => {
        if (!qnaBoardCommentNumber || loginUserId !== writerId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니다?');
        if (!isConfirm) return;

        deleteQnaBoardCommentRequest(qnaBoardCommentNumber, cookies.accessToken).then(deleteQnaBoardCommentResponse);
        console.log("ok");
    };

    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken || qnaBoardNumber === undefined) return;
        getQnaBoardCommentsByBoardNumberRequest(qnaBoardNumber, cookies.accessToken).then(getQnaBoardCommentListResponse);

    }, [qnaBoardNumber]);

    //                    component                    //
    const CommentPost = () => {

        //              render              //
        return (
            <div className="qna-comment-post">
                <div className="qna-comment-write-contents-box"><textarea className='qna-comment-write-contents-textarea' style={{ height: `${28 * commentRows}px` }}    />
                    {/* <textarea ref={commentRef} placeholder="댓글을 입력하세요" maxLength={1000} className='qna-comment-write-contents-textarea' value={comment === null ? '' : comment} onChange={onCommentChangeHandler} style={{ height: `${28 * commentRows}px` }} /> */}
                    <button className='primary-button' onClick={onPostButtonClickHandler}>작성</button>
                </div>
            </div>
        );
    };

    //                    component                    //
function ListItem({
    qnaBoardCommentNumber,
    qnaBoardCommentWriterId,
    qnaBoardCommentContents,
    qnaBoardCommentDatetime,
    onDeleteClick,
    onUpdateClick
}: QnaBoardCommentListItem & { onDeleteClick: () => void, onUpdateClick: () => void }) {


    //              render              //
    return (
        <div className='qna-comment-table-tr'>
            <div className='qna-comment-number'>{qnaBoardCommentNumber}</div>
            <div className='qna-comment-author'>작성자: {qnaBoardCommentWriterId}</div>
            <div className='qna-comment-contents'>{qnaBoardCommentContents}</div>
            <div className='qna-comment-date'>작성일: {qnaBoardCommentDatetime}</div>
            <div>
                <button onClick={onDeleteClick}>삭제</button>
                <button onClick={onUpdateClick}>수정</button>
            </div>
        </div>
    );
}

    //              render              //
    return (
        <div id='qna-baord-comment-wrapper'>
            <div className='comment-inner'>
                <div className='comment-head'>
                    <h5>댓글</h5>
                    <span className='comment-count'></span>
                </div>
                <div className='comment-write-box'>
                    <CommentPost  />
                    {comment && (
                        <></>
                    )}
                    <div className="qna-comment-section">
                        <div className="designe-comment-list">
                            {qnaBoardCommentList.map((item, index) => <ListItem 
                            key={index} 
                            {...item}
                            onDeleteClick={onDeleteClikcHandler}
                            onUpdateClick={onUpdateButtonClickHandler}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

