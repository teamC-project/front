import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteDesignerBoardCommentRequest, getDesignerBoardCommentListRequest, getDesignerBoardRequest, postDesignerBoardCommentRequest } from 'src/apis/designerBoard';
import { PostDesignerBoardCommentRequestDto } from 'src/apis/designerBoard/dto/request';
import { GetDesignerBoardCommentListResponseDto, GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { DesignerBoardCommentListItem } from 'src/types';

interface Props {
    contents: string;
}

//                    component                    //
function ListItem({
    designerBoardCommentNumber,
    designerBoardCommentWriterId,
    designerBoardCommentContents,
    designerBoardCommentDatetime
}: DesignerBoardCommentListItem) {


    //              render              //
    return (
        <div className='designer-comment-table-tr'>
            <div className='designer-comment-number'>{designerBoardCommentNumber}</div>
            <div className='designer-comment-author'>작성자: {designerBoardCommentWriterId}</div>
            <div className='designer-comment-contents'>{designerBoardCommentContents}</div>
            <div className='designer-comment-date'>작성일: {designerBoardCommentDatetime}</div>
        </div>
    );
}

//                    component                    //
export default function DesignerBoardComment() {

    //                    state                    //
    const { loginUserId, loginUserRole } = useUserStore();
    const { designerBoardNumber } = useParams();
    // const { designerBoardCommentNumber } = useParams();
    const [designerBoardCommentNumber, setDesignerBoardCommentNumber] = useState<number>(1);
    const [designerBoardCommentList, setDesignerBoardCommentList] = useState<DesignerBoardCommentListItem[]>([]);
    const [writerId, setWriterId] = useState<string>('');
    const [comment, setComment] = useState<string | null>(null);
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
        if (!result || !('designerBoardCommentList' in result)) {
            console.log('데이터가 없습니다.');
            return;
        }

        const { designerBoardCommentList } = result as GetDesignerBoardCommentListResponseDto;
        chagneDesignerBoardCommentList(designerBoardCommentList);
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

    };

    //                   event handler                    //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_DESIGNER' && loginUserRole !== 'ROLE_CUSTOMER') return;
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);
    };

    const onCommentSubmitClickHandler = () => {
        if (!comment || !comment.trim()) return;
        if (!designerBoardNumber || (loginUserRole !== 'ROLE_DESIGNER' && loginUserRole !== 'ROLE_CUSTOMER')) return;

        const requestBody: PostDesignerBoardCommentRequestDto = { comment };
        postDesignerBoardCommentRequest(designerBoardNumber, requestBody, cookies.accessToken).then(postDesignerBoardCommentResponse);

        getDesignerBoardCommentListRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardCommentListResponse);
    };

    const onDeleteClikcHandler = () => {
        if (!designerBoardCommentNumber || loginUserId !== writerId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니다?');
        if (!isConfirm) return;

        deleteDesignerBoardCommentRequest(designerBoardCommentNumber, cookies.accessToken).then(deleteDesignerBoardCommentResponse);
    };

    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getDesignerBoardCommentListRequest(designerBoardCommentNumber, cookies.accessToken).then(getDesignerBoardCommentListResponse);

    }, [designerBoardNumber]);



    //                    component                    //
    const CommentPost = ({ contents }: Props) => {

        //              render              //
        return (
            <div className="designer-comment-post">
                <div className="designer-comment-write-contents-box">
                    <textarea placeholder="댓글을 입력하세요" className='designer-comment-write-contents-textarea'>{contents}</textarea>
                    <button className='primary-button' onClick={onCommentSubmitClickHandler}>작성</button>
                </div>
            </div>
        );
    };

    //              render              //
    return (
        <div id='designer-baord-comment-wrapper'>
            <div className='comment-inner'>
                <div className='comment-head'>
                    <h5>댓글</h5>
                    <span className='comment-count'></span>
                </div>
                <div className='comment-write-box'>
                    <CommentPost contents='' />
                    {comment && (
                        <></>
                    )}
                    <div className="designer-comment-section">
                        <div className="designe-comment-list">
                            {designerBoardCommentList.map(item => <ListItem {...item} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

