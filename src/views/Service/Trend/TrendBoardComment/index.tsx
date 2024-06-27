import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';

import { useUserStore } from 'src/stores';
import { TrendBoardCommentListItem } from 'src/types';

import { 
	deleteTrendBoardCommentRequest, 
	getTrendBoardCommentByBoardNumberListRequest, 
	postTrendBoardCommentRequest, putTrendBoardCommentRequest } 
from 'src/apis/TrendBoard';
import { PostTrendBoardCommentRequestDto ,PutTrendBoardCommentRequestDto } from 'src/apis/TrendBoard/dto/request';
import ResponseDto from 'src/apis/response.dto';

import './style.css';

interface TrendBoardCommentListItemWithOriginal extends TrendBoardCommentListItem {
    originalTrendBoardCommentWriterId: string;
}

//							component							//
export default function TrendBoardComment() {

//							state							//
    const { trendBoardNumber } = useParams();
    const [trendBoardCommentList, setTrendBoardCommentList] = useState<TrendBoardCommentListItemWithOriginal[]>([]);
    const [comment, setComment] = useState<string>('');
    const [editingComment, setEditingComment] = useState<string>('');
    const [editingCommentNumber, setEditingCommentNumber] = useState<number | null>(null);
    const [cookies] = useCookies();
    const { loginUserId } = useUserStore();
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const [commentRows, setCommentRows] = useState<number>(1);

//							function							//

    const postTrendBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!trendBoardNumber || !cookies.accessToken) return;
        setComment('');
        getTrendBoardCommentByBoardNumberListRequest(trendBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'trendBoardCommentList' in result) {
                setTrendBoardCommentList(result.trendBoardCommentList as TrendBoardCommentListItemWithOriginal[]);
            }
        });
    };

    const deleteTrendBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!trendBoardNumber) return;
        getTrendBoardCommentByBoardNumberListRequest(trendBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'trendBoardCommentList' in result) {
                setTrendBoardCommentList(result.trendBoardCommentList as TrendBoardCommentListItemWithOriginal[]);
            }
        });
    };

//							event handler							//
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);
    };

    const onPostButtonClickHandler = () => {
        if (!comment.trim()) return;
        if (!trendBoardNumber ||  !cookies.accessToken) return;

        const requestBody: PostTrendBoardCommentRequestDto = { trendBoardCommentContents: comment };

        postTrendBoardCommentRequest(trendBoardNumber, requestBody, cookies.accessToken)
            .then(postTrendBoardCommentResponse)
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
        if (!trendBoardNumber || !cookies.accessToken) return;

        const requestBody: PutTrendBoardCommentRequestDto = { trendBoardCommentContents: editingComment };
        putTrendBoardCommentRequest(editingCommentNumber, requestBody, cookies.accessToken)
            .then((result) => {
                if (result && result.code === 'SU') {
                    setEditingComment('');
                    setEditingCommentNumber(null);
                    getTrendBoardCommentByBoardNumberListRequest(trendBoardNumber, cookies.accessToken).then((result) => {
                        if (result && 'trendBoardCommentList' in result) {
                            setTrendBoardCommentList(result.trendBoardCommentList as TrendBoardCommentListItemWithOriginal[]);
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

        deleteTrendBoardCommentRequest(commentNumber, cookies.accessToken)
            .then(deleteTrendBoardCommentResponse)
            .catch(() => {
                alert('댓글 삭제 중 오류가 발생했습니다.');
            });
    };

//							effect							//
    useEffect(() => {
        if (!cookies.accessToken || trendBoardNumber === undefined) return;
        getTrendBoardCommentByBoardNumberListRequest(trendBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'trendBoardCommentList' in result) {
                setTrendBoardCommentList(result.trendBoardCommentList as TrendBoardCommentListItemWithOriginal[]);
            }
        });
    }, [trendBoardNumber, cookies.accessToken]);

//							render							//
    return (
        <div id='trend-board-comment-wrapper'>
            <div className='comment-inner'>
                <div className='comment-head'>
                    <h5>댓글</h5>
                    <span className='comment-count'>{trendBoardCommentList.length}</span>
                </div>
                <div className='comment-write-box'>
                    <div className="trend-comment-post">
                        <div className="trend-comment-write-contents-box">
                            <textarea
                                className='trend-comment-write-contents-textarea'
                                style={{ height: `${28 * commentRows}px` }}
                                value={comment}
                                onChange={onCommentChangeHandler}
                                placeholder="댓글을 입력하세요"
                            />
                            <button className='primary-button' onClick={onPostButtonClickHandler}>댓글 달기</button>
                        </div>
                    </div>
                </div>
                <div className="trend-comment-section">
                    <div className="trend-comment-list">
                        {trendBoardCommentList.map((item) => (
                            <div key={item.trendBoardCommentNumber} className='trend-comment-table-tr'>
                                <div className='trend-comment-number hidden'>{item.trendBoardCommentNumber}</div>
                                <div className='trend-comment-author'>작성자: {item.trendBoardCommentWriterId}</div>
                                <div className='trend-comment-contents'>{item.trendBoardCommentContents}</div>
                                <div className='trend-comment-date'>작성일: {item.trendBoardCommentDatetime}</div>
                                {item.originalTrendBoardCommentWriterId === loginUserId && (
                                    <div className='comment-actions'>
                                        <button onClick={() => onEditButtonClickHandler(item.trendBoardCommentNumber, item.trendBoardCommentContents)}>수정</button>
                                        <button onClick={() => onDeleteButtonClickHandler(item.trendBoardCommentNumber)}>삭제</button>
                                    </div>
                                )}
                                {editingCommentNumber === item.trendBoardCommentNumber && (
                                    <div className="trend-comment-edit">
                                        <textarea
                                            ref={commentRef}
                                            className='trend-comment-write-contents-textarea'
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