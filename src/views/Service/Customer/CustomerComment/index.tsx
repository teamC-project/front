import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteCustomerBoardCommentRequest, getCustomerBoardCommentsByBoardNumberRequest, postCustomerBoardCommentRequest, putCustomerBoardCommentRequest } from 'src/apis/customerBoard';
import { PostCustomerBoardCommentRequestDto, PutCustomerBoardCommentRequestDto } from 'src/apis/customerBoard/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { useUserStore } from 'src/stores';
import { CustomerBoardCommentListItem } from 'src/types';
import './style.css';

//                    component                    //
export default function CustomerBoardComment() {

    //                    state                    //
    const { customerBoardNumber } = useParams();
    const [customerBoardCommentList, setCustomerBoardCommentList] = useState<CustomerBoardCommentListItem[]>([]);
    const [comment, setComment] = useState<string>('');
    const [editingComment, setEditingComment] = useState<string>('');
    const [editingCommentNumber, setEditingCommentNumber] = useState<number | null>(null);
    const [cookies] = useCookies();
    const { loginUserRole, loginUserId } = useUserStore();
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const [commentRows, setCommentRows] = useState<number>(1);

    //                  function                    //
    const navigator = useNavigate();

    const postCustomerBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!customerBoardNumber || !cookies.accessToken) return;
        setComment(''); 
        getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'customerBoardCommentList' in result) {
                setCustomerBoardCommentList(result.customerBoardCommentList);
            }
        });
    };

    const putCustomerBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!customerBoardNumber) return;
        setEditingComment(''); 
        setEditingCommentNumber(null);
        getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'customerBoardCommentList' in result) {
                setCustomerBoardCommentList(result.customerBoardCommentList);
            }
        });
    };

    const deleteCustomerBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!customerBoardNumber) return;
        getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'customerBoardCommentList' in result) {
                setCustomerBoardCommentList(result.customerBoardCommentList);
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
        if (!customerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER') || !cookies.accessToken) return;

        const requestBody: PostCustomerBoardCommentRequestDto = { customerBoardCommentContents: comment };

        postCustomerBoardCommentRequest(customerBoardNumber, requestBody, cookies.accessToken)
        .then(postCustomerBoardCommentResponse)
        .catch((error) => {
            console.error('댓글 작성 중 오류가 발생했습니다:', error);
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
        if (!customerBoardNumber || !cookies.accessToken) return;

        const requestBody: PutCustomerBoardCommentRequestDto = { customerBoardCommentContents: editingComment };
        putCustomerBoardCommentRequest(editingCommentNumber, requestBody, cookies.accessToken)
            .then((result) => {
                if (result && result.code === 'SU') {
                    setEditingComment('');
                    setEditingCommentNumber(null);
                    getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then((result) => {
                        if (result && 'customerBoardCommentList' in result) {
                            setCustomerBoardCommentList(result.customerBoardCommentList);
                        }
                    });
                } else {
                    alert('댓글 수정에 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('댓글 수정 중 오류가 발생했습니다:', error);
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

        deleteCustomerBoardCommentRequest(commentNumber, cookies.accessToken)
            .then(deleteCustomerBoardCommentResponse)
            .catch((error) => {
                console.error('댓글 삭제 중 오류가 발생했습니다:', error);
                alert('댓글 삭제 중 오류가 발생했습니다.');
            });
    };


    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken || customerBoardNumber === undefined) return;
        getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'customerBoardCommentList' in result) {
                setCustomerBoardCommentList(result.customerBoardCommentList);
            }
        });
    }, [customerBoardNumber, cookies.accessToken]);

    //              render              //
    return (
        <div id='customer-board-comment-wrapper'>
            <div className='customer-board-comment-inner'>
                <div className='customer-board-comment-head'>
                    <h5>댓글</h5>
                    <span className='customer-board-comment-count'>{customerBoardCommentList.length}</span>
                </div>
                <div className='customer-board-comment-write-box'>
                    <div className="customer-board-comment-post">
                        <div className="customer-board-comment-write-contents-box">
                            <textarea
                                className='customer-board-comment-write-contents-textarea'
                                style={{ height: `${28 * commentRows}px` }}
                                value={comment}
                                onChange={onCommentChangeHandler}
                                placeholder="댓글을 입력하세요"
                            />
                            <button className='customer-board-comment-primary-button' onClick={onPostButtonClickHandler}>작성</button>
                        </div>
                    </div>
                </div>
                <div className="customer-board-comment-section">
                    <div className="customer-board-comment-list">
                        {customerBoardCommentList.map((item) => (
                            <div key={item.customerBoardCommentNumber} className='customer-board-comment-table-tr'>
                                <div className='customer-board-comment-number hidden'>{item.customerBoardCommentNumber}</div>
                                <div className='customer-board-comment-author'>작성자: {item.customerBoardCommentWriterId}</div>
                                <div className='customer-board-comment-contents'>{item.customerBoardCommentContents}</div>
                                <div className='customer-board-comment-date'>작성일: {item.customerBoardCommentDatetime}</div>
                                {/* {item.customerBoardCommentWriterId === loginUserId ? ( */}
                                    <div className='customer-board-comment-actions'>
                                        <button onClick={() => onEditButtonClickHandler(item.customerBoardCommentNumber, item.customerBoardCommentContents)}>수정</button>
                                        <button onClick={() => onDeleteButtonClickHandler(item.customerBoardCommentNumber)}>삭제</button>
                                    </div>
                                {/* // ) : null} */}
                                {editingCommentNumber === item.customerBoardCommentNumber && (
                                    <div className="customer-board-comment-update">
                                        <textarea
                                            ref={commentRef}
                                            className='customer-board-comment-update-contents-textarea'
                                            style={{ height: `${28 * commentRows}px` }}
                                            value={editingComment}
                                            onChange={onUpdateCommentChangeHandler}
                                            placeholder="댓글을 수정하세요"
                                        />
                                        <button className='customer-board-comment-update-primary-button' onClick={onUpdateButtonClickHandler}>저장</button>
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
