import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';

import {
    deleteCustomerBoardCommentRequest,
    getCustomerBoardCommentsByBoardNumberRequest,
    postCustomerBoardCommentRequest,
    putCustomerBoardCommentRequest
} from 'src/apis/customerBoard';
import { PostCustomerBoardCommentRequestDto, PutCustomerBoardCommentRequestDto } from 'src/apis/customerBoard/dto/request';
import { GetCustomerBoardCommentListResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';

import { useUserStore } from 'src/stores';
import { CustomerBoardCommentListItem } from 'src/types';
import { useCreateChatRoom } from 'src/hooks/useCreateChatRoom';

import './style.css';

//                          component                           //
export default function CustomerBoardComment() {

//                          state                           //
    const [customerBoardCommentList, setCustomerBoardCommentList] = useState<CustomerBoardCommentListItem[]>([]);
    const [replyCommentParentNumber] = useState<number | null>(null);
    const [commentRows, setCommentRows] = useState<number>(1);
    const { loginUserRole, loginUserId } = useUserStore();
    const [comment, setComment] = useState<string>('');
    const { customerBoardNumber } = useParams();
    const [cookies] = useCookies();

//                          function                            //
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

    const getCustomerBoardCommentsByBoardNumberResponse = (result: ResponseDto | GetCustomerBoardCommentListResponseDto | null) => {
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

        const { customerBoardCommentList } = result as GetCustomerBoardCommentListResponseDto;
        setCustomerBoardCommentList(customerBoardCommentList);
    }

//                          event handler                           //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER' && loginUserRole !== 'ROLE_ADMIN') return;
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);
    };

    const onPostButtonClickHandler = () => {
        if (!comment.trim()) return;
        if (!customerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER' && loginUserRole !== 'ROLE_ADMIN') || !cookies.accessToken) return;

        const requestBody: PostCustomerBoardCommentRequestDto = {
            customerBoardCommentContents: comment,
            customerBoardParentCommentNumber: replyCommentParentNumber ?? undefined
        };

        postCustomerBoardCommentRequest(Number(customerBoardNumber), requestBody, cookies.accessToken)
            .then(postCustomerBoardCommentResponse);
    };

//                          component                           //
    function CommentItem(props: CustomerBoardCommentListItem) {

//                          state                           //
        const { 
            customerBoardCommentNumber, 
            customerBoardCommentWriterId, 
            customerBoardCommentContents, 
            customerBoardCommentWriteDatetime 
        } = props;

        const [updateCommentContent, setUpdateCommentContent] = useState<string>('');
        const [updateOpen, setUpdateOpen] = useState<boolean>(false);
        const [replyCommentContent, setReplyCommentContent] = useState<string>('');
        const [replyOpen, setReplyOpen] = useState<boolean>(false);
        const { designerIdClickHandler } = useCreateChatRoom();

//                          function                            //
        const deleteCustomerBoardCommentResponse = (result: ResponseDto | null) => {
            const message =
                !result ? '서버에 문제가 있습니다.' :
                result.code === 'AF' ? '권한이 없습니다.' :
                result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
                result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '삭제되었습니다.';

            alert(message);

            if (result?.code === 'SU' && customerBoardNumber) {
                getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then(getCustomerBoardCommentsByBoardNumberResponse);
            }
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
            setUpdateCommentContent('');
            setUpdateOpen(false);
            getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then(getCustomerBoardCommentsByBoardNumberResponse);
        };

//                          event handler                           //
        const onCommentUpdateOpenHandler = () => {
            setUpdateOpen(!updateOpen);
            setUpdateCommentContent(customerBoardCommentContents);
        };

        const onCommentReplyOpenHandler = () => {
            setReplyOpen(!replyOpen);
            setReplyCommentContent('');
        };

        const onUpdateCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = event.target;
            setUpdateCommentContent(value);
        };

        const onDeleteButtonClickHandler = () => {
            if (!customerBoardCommentNumber || !cookies.accessToken) return;
            if (customerBoardCommentWriterId !== loginUserId && loginUserRole !== 'ROLE_ADMIN') {
                alert('작성자 또는 관리자만 삭제할 수 있습니다.');
                return;
            }
            const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
            if (!isConfirm) return;
            deleteCustomerBoardCommentRequest(customerBoardCommentNumber, cookies.accessToken).then(deleteCustomerBoardCommentResponse)
        };

        const onUpdateButtonClickHandler = () => {
            if (!updateCommentContent.trim() || !cookies.accessToken) return;

            const requestBody: PutCustomerBoardCommentRequestDto = {
                customerBoardCommentContents: updateCommentContent,
                customerBoardCommentNumber: customerBoardCommentNumber
            };

            putCustomerBoardCommentRequest(customerBoardCommentNumber, requestBody, cookies.accessToken).then(putCustomerBoardCommentResponse);
        };

        const onReplyCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = event.target;
            setReplyCommentContent(value);
        };

        const onReplyPostButtonClickHandler = () => {
            if (!replyCommentContent.trim()) return;
            if (!customerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER' && loginUserRole !== 'ROLE_ADMIN') || !cookies.accessToken) return;

            const requestBody: PostCustomerBoardCommentRequestDto = {
                customerBoardCommentContents: replyCommentContent,
                customerBoardParentCommentNumber: customerBoardCommentNumber
            };

            postCustomerBoardCommentRequest(Number(customerBoardNumber), requestBody, cookies.accessToken)
                .then(postCustomerBoardCommentResponse);
        };

//                          render                          //
        return (
            <div className='customer-board-comment'>
                <div key={customerBoardCommentNumber} className='customer-board-comment-container'>
                    <div className='customer-board-comment-header'>
                        <div className='customer-board-comment-author' onClick={() => designerIdClickHandler(customerBoardCommentWriterId)}>작성자: {customerBoardCommentWriterId}</div>
                        {customerBoardCommentWriterId === loginUserId && (
                            <div className='customer-board-comment-actions'>
                                {customerBoardCommentWriterId === loginUserId && <button onClick={onCommentUpdateOpenHandler}>수정</button>}
                                <button onClick={onDeleteButtonClickHandler}>삭제</button>
                            </div>
                        )}
                    </div>
                    {updateOpen ? (
                        <div className='customer-board-comment-update'>
                            <textarea
                                className='customer-board-comment-update-contents-textarea'
                                value={updateCommentContent}
                                onChange={onUpdateCommentChangeHandler}
                                placeholder="댓글을 입력하세요"
                            />
                            <button onClick={onUpdateButtonClickHandler}>수정 완료</button>
                        </div>
                    ) :
                        <div className='customer-board-comment-contents'>
                            {customerBoardCommentContents}
                        </div>
                    }
                    <div className='customer-board-comment-footer'>
                        <div className='customer-board-comment-date'>{customerBoardCommentWriteDatetime}</div>
                        <button className='customer-board-comment-reply-button' onClick={onCommentReplyOpenHandler}>대댓글</button>
                    </div>
                </div>
                {replyOpen &&
                    <div className="customer-board-comment-reply-write">
                        <textarea
                            className="customer-board-comment-reply-textarea"
                            value={replyCommentContent}
                            onChange={onReplyCommentChangeHandler}
                            placeholder="대댓글을 입력하세요"
                        />
                        <button onClick={onReplyPostButtonClickHandler}>작성</button>
                    </div>
                }
                <div className="customer-board-comment-reply-container">
                    {customerBoardCommentList.filter(item => item.customerBoardParentCommentNumber === customerBoardCommentNumber)
                        .reverse().map(item => <CommentItem {...item} />)}
                </div>
            </div>
        )
    }

//                          effect                          //
    useEffect(() => {
        if (!cookies.accessToken || customerBoardNumber === undefined) return;
        getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken).then(getCustomerBoardCommentsByBoardNumberResponse);
    }, [customerBoardNumber, cookies.accessToken]);

//                          render                          //
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
                        {customerBoardCommentList.filter(item => !item.customerBoardParentCommentNumber).map(firstComment =>
                            <CommentItem {...firstComment} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}