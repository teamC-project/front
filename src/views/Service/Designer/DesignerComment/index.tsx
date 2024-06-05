import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteDesignerBoardCommentRequest,  getDesignerBoardCommentsByBoardNumberRequest,  getDesignerBoardRequest, postDesignerBoardCommentRequest, putDesignerBoardCommentRequest } from 'src/apis/designerBoard';
import { PostDesignerBoardCommentRequestDto, PutDesignerBoardCommentRequestDto } from 'src/apis/designerBoard/dto/request';
import { GetDesignerBoardCommentListResponseDto, GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { DesignerBoardCommentListItem } from 'src/types';

interface Props {
    comment: string;
}



//                    component                    //
export default function DesignerBoardComment() {

    //                    state                    //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserId, loginUserRole } = useUserStore();
    const { designerBoardNumber } = useParams();
    // const { designerBoardCommentNumber } = useParams();
    const [designerBoardCommentNumber, setDesignerBoardCommentNumber] = useState<number>(1);
    const [designerBoardCommentList, setDesignerBoardCommentList] = useState<DesignerBoardCommentListItem[]>([]);
    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [cookies] = useCookies();
    const [commentRows, setCommentRows] = useState<number>(1);
    const [viewList, setViewList] = useState<DesignerBoardCommentListItem[]>([]);

    //                  function                    //
    const navigator = useNavigate();

    const getDesignerBoardResponse = (result: GetDesignerBoardResponseDto | ResponseDto | null) => {

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
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { title, writerId, writeDatetime, viewCount, contents, comment } = result as GetDesignerBoardResponseDto;
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
        if (comment !== null){
            setComment(comment);
        }
    };

    const postDesignerBoardCommentResponse = (result: ResponseDto | null) => {

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

        if (!designerBoardNumber || !cookies.accessToken) return;
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardResponse);
    };

    const chagneDesignerBoardCommentList = (designerBoardCommentList: DesignerBoardCommentListItem[]) => {
        setDesignerBoardCommentList(designerBoardCommentList);
    };

    const getDesignerBoardCommentListResponse = (result: GetDesignerBoardCommentListResponseDto | ResponseDto | null) => {
        if (!result) {
            console.log('응답이 없습니다.');
            return;
        }

        if ('designerBoardCommentList' in result) {
            const { designerBoardCommentList } = result as GetDesignerBoardCommentListResponseDto;
            setDesignerBoardCommentList(designerBoardCommentList);
        } else {
            console.log('데이터가 없습니다.');
        }
    };

    const putDesignerBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!designerBoardCommentNumber) return;
        navigator(DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH(designerBoardCommentNumber));
    };

    const deleteDesignerBoardCommentResponse = (result: ResponseDto | null) => {

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

        if(!designerBoardNumber) return;
        navigator(DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH(designerBoardNumber));

    };

    //                   event handler                    //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER') return;
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);

    };

    const onPostButtonClickHandler = () => {
        if (!comment.trim()) return;
        if (!cookies.accessToken) return;

        const requestBody: PostDesignerBoardCommentRequestDto = { comment };

        if (designerBoardNumber !== undefined) {
        postDesignerBoardCommentRequest(designerBoardNumber, requestBody, cookies.accessToken).then(postDesignerBoardCommentResponse);
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
        if (!cookies.accessToken || !designerBoardCommentNumber) return;

        const requestBody: PutDesignerBoardCommentRequestDto = {comment};
        putDesignerBoardCommentRequest(designerBoardCommentNumber, requestBody, cookies.accessToken).then(putDesignerBoardCommentResponse);
        console.log("ok");
    };

    const onDeleteClikcHandler = () => {
        if (!designerBoardCommentNumber || loginUserId !== writerId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니다?');
        if (!isConfirm) return;

        deleteDesignerBoardCommentRequest(designerBoardCommentNumber, cookies.accessToken).then(deleteDesignerBoardCommentResponse);
        console.log("ok");
    };

    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken || designerBoardNumber === undefined) return;
        getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardCommentListResponse);

    }, [designerBoardNumber]);

    //                    component                    //
    const CommentPost = () => {

        //              render              //
        return (
            <div className="designer-comment-post">
                <div className="designer-comment-write-contents-box"><textarea className='designer-comment-write-contents-textarea' style={{ height: `${28 * commentRows}px` }}    />
                    {/* <textarea ref={commentRef} placeholder="댓글을 입력하세요" maxLength={1000} className='designer-comment-write-contents-textarea' value={comment === null ? '' : comment} onChange={onCommentChangeHandler} style={{ height: `${28 * commentRows}px` }} /> */}
                    <button className='primary-button' onClick={onPostButtonClickHandler}>작성</button>
                </div>
            </div>
        );
    };

    //                    component                    //
function ListItem({
    designerBoardCommentNumber,
    designerBoardCommentWriterId,
    designerBoardCommentContents,
    designerBoardCommentDatetime,
    onDeleteClick,
    onUpdateClick
}: DesignerBoardCommentListItem & { onDeleteClick: () => void, onUpdateClick: () => void }) {


    //              render              //
    return (
        <div className='designer-comment-table-tr'>
            <div className='designer-comment-number'>{designerBoardCommentNumber}</div>
            <div className='designer-comment-author'>작성자: {designerBoardCommentWriterId}</div>
            <div className='designer-comment-contents'>{designerBoardCommentContents}</div>
            <div className='designer-comment-date'>작성일: {designerBoardCommentDatetime}</div>
            <div>
                <button onClick={onDeleteClick}>삭제</button>
                <button onClick={onUpdateClick}>수정</button>
            </div>
        </div>
    );
}

    //              render              //
    return (
        <div id='designer-baord-comment-wrapper'>
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
                    <div className="designer-comment-section">
                        <div className="designe-comment-list">
                            {designerBoardCommentList.map((item, index) => <ListItem 
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

