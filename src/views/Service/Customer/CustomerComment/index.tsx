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
const [replyComment, setReplyComment] = useState<string>('');
const [replyCommentParentNumber, setReplyCommentParentNumber] = useState<number | null>(null);
const [commentDates, setCommentDates] = useState<Record<number, string>>({});
const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
const [replyInputParentNumber, setReplyInputParentNumber] = useState<number | null>(null);
    

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

        const requestBody: PostCustomerBoardCommentRequestDto = { 
            customerBoardCommentContents: comment,
            customerBoardParentCommentNumber: replyCommentParentNumber ?? undefined
        };

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

    const onEditButtonClickHandler = (commentNumber: number, currentComment: string, commentWriterId: string) => {
        if (commentWriterId === loginUserId) {
            setEditingComment(currentComment);
            setEditingCommentNumber(commentNumber);
        } else {
            alert('작성자만 수정할 수 있습니다.');
        }
    };

    const onUpdateButtonClickHandler = () => {
        if (!editingComment.trim() || editingCommentNumber === null || !customerBoardNumber || !cookies.accessToken) return;

        const requestBody: PutCustomerBoardCommentRequestDto = {
            customerBoardCommentContents: editingComment,
            customerBoardCommentNumber: editingCommentNumber
        };

        putCustomerBoardCommentRequest(customerBoardNumber, requestBody, cookies.accessToken)
            .then(putCustomerBoardCommentResponse)
            .catch((error) => {
                console.error('댓글 수정 중 오류가 발생했습니다:', error);
                alert('댓글 수정 중 오류가 발생했습니다.');
            });
    };

    const onDeleteButtonClickHandler = (commentNumber: number, commentWriterId: string) => {
        if (!commentNumber || !cookies.accessToken) return;
        if (commentWriterId === loginUserId) {
            const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
            if (isConfirm) {
                deleteCustomerBoardCommentRequest(commentNumber, cookies.accessToken)
                    .then(deleteCustomerBoardCommentResponse)
                    .catch((error) => {
                        console.error('댓글 삭제 중 오류가 발생했습니다:', error);
                        alert('댓글 삭제 중 오류가 발생했습니다.');
                    });
            }
        } else {
            alert('작성자만 삭제할 수 있습니다.');
        }
    };

    const onReplyCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReplyComment(event.target.value);
    };

    const onPostReplyButtonClickHandler = (parentCommentNumber: number) => {
        if (!replyComment.trim()) return;
        if (!customerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER') || !cookies.accessToken) return;

        const requestBody: PostCustomerBoardCommentRequestDto = { customerBoardCommentContents: replyComment, customerBoardParentCommentNumber: parentCommentNumber };

        postCustomerBoardCommentRequest(customerBoardNumber, requestBody, cookies.accessToken)
            .then((result) => {
                if (result && result.code === 'SU') {
                    setReplyComment('');
                    setReplyCommentParentNumber(null);
                    getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then((result) => {
                        if (result && 'customerBoardCommentList' in result) {               
                            const sortedCommentList = [...result.customerBoardCommentList].sort((a, b) => b.customerBoardCommentNumber - a.customerBoardCommentNumber);
                            setCustomerBoardCommentList(sortedCommentList);
                        }
                    });
                } else {
                    alert('대댓글 작성에 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('대댓글 작성 중 오류가 발생했습니다:', error);
                alert('대댓글 작성 중 오류가 발생했습니다.');
            });
    };

    // 대댓글 입력창 밖을 클릭했을 때 입력창 닫기
    const handleClickOutside = (event: MouseEvent) => {
        if (
            commentRef.current &&
            !commentRef.current.contains(event.target as Node)
        ) {
            onCloseReplyInputHandler();
        }
    };

    const onReplyButtonClickHandler = (commentNumber: number) => {
        setShowReplyInput(true);
        setReplyInputParentNumber(commentNumber);
    };
    
    const onCloseReplyInputHandler = () => {
        setShowReplyInput(false);
        setReplyInputParentNumber(null);
        setReplyComment('');
    };


    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken || customerBoardNumber === undefined) return;
        getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'customerBoardCommentList' in result) {
                setCustomerBoardCommentList([...result.customerBoardCommentList].reverse());

                const dates: { [key: number]: string } = result.customerBoardCommentList.reduce((acc, item) => {
                    acc[item.customerBoardCommentNumber] = item.customerBoardCommentDatetime;
                    return acc;
                }, {} as Record<number, string>);
                setCommentDates(dates);
            }
        });
    }, [customerBoardNumber, cookies.accessToken]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                        {customerBoardCommentList
                            .filter((comment) => !comment.customerBoardParentCommentNumber)
                            .sort((a, b) => b.customerBoardCommentNumber - a.customerBoardCommentNumber)
                            .map((item) => (
                                <div key={item.customerBoardCommentNumber} className='customer-board-comment-container'>
                                    {/* 상위 댓글인 경우 */}
                                    {!item.customerBoardParentCommentNumber && (
                                        <>
                                            <div className='customer-board-comment-header'>
                                                <div className='customer-board-comment-author'>작성자: {item.customerBoardCommentWriterId}</div>
                                                {item.customerBoardCommentWriterId === loginUserId && (
                                                    <div className='customer-board-comment-actions'>
                                                        <button onClick={() => onEditButtonClickHandler(
                                                            item.customerBoardCommentNumber, 
                                                            item.customerBoardCommentContents, 
                                                            item.customerBoardCommentWriterId)}>수정</button>
                                                        {editingCommentNumber === item.customerBoardCommentNumber && (
                                                            <div className='customer-board-comment-update'>
                                                                <textarea
                                                                    className='customer-board-comment-update-contents-textarea'
                                                                    value={editingComment}
                                                                    onChange={onUpdateCommentChangeHandler}
                                                                />
                                                                <button onClick={onUpdateButtonClickHandler}>수정 완료</button>
                                                            </div>
                                                        )}    
                                                        <button onClick={() => onDeleteButtonClickHandler(item.customerBoardCommentNumber, item.customerBoardCommentWriterId)}>삭제</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='customer-board-comment-contents'>{item.customerBoardCommentContents}</div>
                                            <div className='customer-board-comment-footer'>
                                                <div className='customer-board-comment-date'>{commentDates[item.customerBoardCommentNumber]}</div>
                                                <button className='customer-board-comment-reply-button' onClick={() => onReplyButtonClickHandler(item.customerBoardCommentNumber)}>대댓글</button>
                                            </div>

                                            {/* 대댓글 렌더링 로직 */}
                                            <div className="customer-board-comment-reply-container">
                                                {customerBoardCommentList
                                                    .filter((reply) => reply.customerBoardParentCommentNumber === item.customerBoardCommentNumber)
                                                    .sort((a, b) => a.customerBoardCommentNumber - b.customerBoardCommentNumber)
                                                    .map((reply) => (
                                                        <div key={reply.customerBoardCommentNumber} className="customer-board-comment-reply">
                                                            <div className='customer-board-comment-reply-container'>
                                                                <div className='customer-board-comment-header'>
                                                                    <div className='customer-board-comment-author'>
                                                                        {reply.customerBoardParentCommentNumber !== null
                                                                            ? `${item.customerBoardCommentWriterId}:`
                                                                            : null}
                                                                    </div>
                                                                    {reply.customerBoardCommentWriterId === loginUserId && (
                                                                        <div className='customer-board-comment-actions'>
                                                                            <button onClick={() => onEditButtonClickHandler(reply.customerBoardCommentNumber, reply.customerBoardCommentContents, reply.customerBoardCommentWriterId)}>수정</button>
                                                                            {editingCommentNumber === reply.customerBoardCommentNumber && (
                                                                                <div className='customer-board-comment-update'>
                                                                                    <textarea
                                                                                        className='customer-board-comment-update-contents-textarea'
                                                                                        value={editingComment}
                                                                                        onChange={onUpdateCommentChangeHandler}
                                                                                    />
                                                                                    <button onClick={onUpdateButtonClickHandler}>수정 완료</button>
                                                                                </div>
                                                                            )}
                                                                            <button onClick={() => onDeleteButtonClickHandler(reply.customerBoardCommentNumber, reply.customerBoardCommentWriterId)}>삭제</button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className='customer-board-comment-contents'>{reply.customerBoardCommentContents}</div>
                                                                <div className='customer-board-comment-footer'>
                                                                    <div className='customer-board-comment-date'>{commentDates[reply.customerBoardCommentNumber]}</div>
                                                                    {/* 대댓글에 대댓글 작성 버튼 추가 */}
                                                                    <button className='customer-board-comment-reply-button' onClick={() => onReplyButtonClickHandler(reply.customerBoardCommentNumber)}>대댓글</button>
                                                                </div>
                                                            </div>
                                                            {showReplyInput && replyInputParentNumber === reply.customerBoardCommentNumber && (
                                                                <div className="customer-board-comment-reply-write">
                                                                    <textarea
                                                                        className="customer-board-comment-reply-textarea"
                                                                        value={replyComment}
                                                                        onChange={onReplyCommentChangeHandler}
                                                                        placeholder="대댓글을 입력하세요"
                                                                    />
                                                                    <button onClick={() => onPostReplyButtonClickHandler(reply.customerBoardCommentNumber)}>작성</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}