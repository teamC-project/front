import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteDesignerBoardCommentRequest, getDesignerBoardCommentsByBoardNumberRequest, postDesignerBoardCommentRequest, putDesignerBoardCommentRequest } from 'src/apis/designerBoard';
import { PostDesignerBoardCommentRequestDto, PutDesignerBoardCommentRequestDto } from 'src/apis/designerBoard/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { useUserStore } from 'src/stores';
import { DesignerBoardCommentListItem } from 'src/types';
import './style.css';
import { useCreateChatRoom } from 'src/hooks/useCreateChatRoom';

interface DesignerBoardCommentListItemWithOriginal extends DesignerBoardCommentListItem {
    originalDesignerBoardCommentWriterId: string;
    designerBoardCommentDatetime: string;
}

//                    component                    //
export default function DesignerBoardComment() {

    //                    state                    //
    const { designerBoardNumber } = useParams();
    const [designerBoardCommentList, setDesignerBoardCommentList] = useState<DesignerBoardCommentListItemWithOriginal[]>([]);
    const [comment, setComment] = useState<string>('');
    const [editingComment, setEditingComment] = useState<string>('');
    const [editingCommentNumber, setEditingCommentNumber] = useState<number | null>(null);
    const [cookies] = useCookies();
    const { loginUserRole, loginUserId } = useUserStore();
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const [commentRows, setCommentRows] = useState<number>(1);

    const { designerIdClickHandler } = useCreateChatRoom();


    //                  function                    //
    const navigator = useNavigate();

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
        setComment('');
        getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'designerBoardCommentList' in result) {
                setDesignerBoardCommentList(result.designerBoardCommentList as DesignerBoardCommentListItemWithOriginal[]);
            }
        });
    };

    const putDesignerBoardCommentResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해 주세요.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!designerBoardNumber) return;
        setEditingComment('');
        setEditingCommentNumber(null);
        getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'designerBoardCommentList' in result) {
                setDesignerBoardCommentList(result.designerBoardCommentList as DesignerBoardCommentListItemWithOriginal[]);
            }
        });
    };

    const deleteDesignerBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!designerBoardNumber) return;
        getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'designerBoardCommentList' in result) {
                setDesignerBoardCommentList(result.designerBoardCommentList as DesignerBoardCommentListItemWithOriginal[]);
            }
        });
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
        if (!designerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER') || !cookies.accessToken) return;

        const requestBody: PostDesignerBoardCommentRequestDto = { designerBoardCommentContents: comment };

        postDesignerBoardCommentRequest(designerBoardNumber, requestBody, cookies.accessToken)
            .then(postDesignerBoardCommentResponse)
            .catch(() => {
                alert('댓글 작성 중 오류가 발생했습니다.');
            });
    };

    const onUpdateCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const updatedComment = event.target.value;
        setEditingComment(updatedComment);

        const updatedCommentRows = updatedComment.split('\n').length;
        setCommentRows(updatedCommentRows);
    };

    const onUpdateButtonClickHandler = () => {
        if (!editingComment.trim() || editingCommentNumber === null) return;
        if (!designerBoardNumber || !cookies.accessToken) return;

        const requestBody: PutDesignerBoardCommentRequestDto = { designerBoardCommentContents: editingComment };
        putDesignerBoardCommentRequest(editingCommentNumber, requestBody, cookies.accessToken)
            .then((result) => {
                if (result && result.code === 'SU') {
                    setEditingComment('');
                    setEditingCommentNumber(null);
                    getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then((result) => {
                        if (result && 'designerBoardCommentList' in result) {
                            setDesignerBoardCommentList(result.designerBoardCommentList as DesignerBoardCommentListItemWithOriginal[]);
                        }
                    });
                } else {
                    alert('댓글 수정에 실패했습니다.');
                }
            })
            .catch(() => {
                alert('댓글 수정 중 오류가 발생했습니다.');
            });
    };

    const onEditButtonClickHandler = (commentNumber: number, currentComment: string) => {
        setEditingComment(currentComment);
        setEditingCommentNumber(commentNumber);
    };

    const onDeleteButtonClickHandler = (commentNumber: number) => {
        if (!commentNumber || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteDesignerBoardCommentRequest(commentNumber, cookies.accessToken)
            .then(deleteDesignerBoardCommentResponse)
            .catch(() => {
                alert('댓글 삭제 중 오류가 발생했습니다.');
            });
    };


    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken || designerBoardNumber === undefined) return;
        getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'designerBoardCommentList' in result) {
                setDesignerBoardCommentList(result.designerBoardCommentList as DesignerBoardCommentListItemWithOriginal[]);
            }
        });
    }, [designerBoardNumber, cookies.accessToken]);

    //              render              //
    return (
        <div id='designer-board-comment-wrapper'>
            <div className='comment-inner'>
                <div className='comment-head'>
                    <h5>댓글</h5>
                    <span className='comment-count'>{designerBoardCommentList.length}</span>
                </div>
                <div className='comment-write-box'>
                    <div className="designer-comment-post">
                        <div className="designer-comment-write-contents-box">
                            <textarea
                                className='designer-comment-write-contents-textarea'
                                style={{ height: `${28 * commentRows}px` }}
                                value={comment}
                                onChange={onCommentChangeHandler}
                                placeholder="댓글을 입력하세요"
                            />
                            <button className='primary-button' onClick={onPostButtonClickHandler}>작성</button>
                        </div>
                    </div>
                </div>
                <div className="designer-comment-section">
                    <div className="designer-comment-list">
                        {designerBoardCommentList.map((item) => (
                            <div key={item.designerBoardCommentNumber} className='designer-comment-table-tr'>
                                <div className='designer-comment-number hidden'>{item.designerBoardCommentNumber}</div>
                                <div className='designer-comment-author' onClick={() => designerIdClickHandler(item.designerBoardCommentWriterId)} >작성자: {item.designerBoardCommentWriterId}</div>
                                <div className='designer-comment-contents'>{item.designerBoardCommentContents}</div>
                                <div className='designer-comment-date'>작성일: {item.designerBoardCommentDatetime}</div>
                                {item.originalDesignerBoardCommentWriterId === loginUserId && (
                                    <div className='comment-actions'>
                                        <button onClick={() => onEditButtonClickHandler(item.designerBoardCommentNumber, item.designerBoardCommentContents)}>수정</button>
                                        <button onClick={() => onDeleteButtonClickHandler(item.designerBoardCommentNumber)}>삭제</button>
                                    </div>
                                )}
                                {editingCommentNumber === item.designerBoardCommentNumber && (
                                    <div className="designer-comment-edit">
                                        <textarea
                                            ref={commentRef}
                                            className='designer-comment-write-contents-textarea'
                                            style={{ height: `${28 * commentRows}px` }}
                                            value={editingComment}
                                            onChange={onUpdateCommentChangeHandler}
                                            placeholder="댓글을 수정하세요"
                                        />
                                        <button className='primary-button' onClick={onUpdateButtonClickHandler}>저장</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
