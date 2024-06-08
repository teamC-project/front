import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteCustomerBoardCommentRequest,  getCustomerBoardCommentsByBoardNumberRequest,  getCustomerBoardRequest, postCustomerBoardCommentRequest, putCustomerBoardCommentRequest } from 'src/apis/customerBoard';
import { PostCustomerBoardCommentRequestDto, PutCustomerBoardCommentRequestDto } from 'src/apis/customerBoard/dto/request';
import { GetCustomerBoardCommentListResponseDto, GetCustomerBoardResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { CustomerBoardCommentListItem } from 'src/types';

interface Props {
    comment: string;
}



//                    component                    //
export default function CustomerBoardComment() {

    //                    state                    //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserId, loginUserRole } = useUserStore();
    const { customerBoardNumber } = useParams();
    // const { customerBoardCommentNumber } = useParams();
    const [customerBoardCommentNumber, setCustomerBoardCommentNumber] = useState<number>(1);
    const [customerBoardCommentList, setCustomerBoardCommentList] = useState<CustomerBoardCommentListItem[]>([]);
    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [cookies] = useCookies();
    const [commentRows, setCommentRows] = useState<number>(1);
    const [viewList, setViewList] = useState<CustomerBoardCommentListItem[]>([]);

    //                  function                    //
    const navigator = useNavigate();

    const getCustomerBoardResponse = (result: GetCustomerBoardResponseDto | ResponseDto | null) => {

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
            navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const {
            customerBoardTitle: title,
            customerBoardWriterId: writerId,
            customerBoardWriteDatetime: writeDatetime,
            customerBoardViewCount: viewCount,
            customerBoardContents: contents,
            customerBoardComment: comment
        } = result as GetCustomerBoardResponseDto;
        
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
        if (comment !== null) {
            setComment(comment);
        }
    };

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
        getCustomerBoardRequest(customerBoardNumber, cookies.accessToken).then(getCustomerBoardResponse);
    };

    const chagneCustomerBoardCommentList = (customerBoardCommentList: CustomerBoardCommentListItem[]) => {
        setCustomerBoardCommentList(customerBoardCommentList);
    };

    const getCustomerBoardCommentListResponse = (result: GetCustomerBoardCommentListResponseDto | ResponseDto | null) => {
        if (!result) {
            console.log('응답이 없습니다.');
            return;
        }

        if ('customerBoardCommentList' in result) {
            const { customerBoardCommentList } = result as GetCustomerBoardCommentListResponseDto;
            setCustomerBoardCommentList(customerBoardCommentList);
        } else {
            console.log('데이터가 없습니다.');
        }
    };

    const putCustomerBoardCommentResponse = (result: ResponseDto | null) => {
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

        if (!customerBoardCommentNumber) return;
        navigator(CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH(customerBoardCommentNumber));
    };

    const deleteCustomerBoardCommentResponse = (result: ResponseDto | null) => {

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

        if(!customerBoardNumber) return;
        navigator(CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH(customerBoardNumber));

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

        const requestBody: PostCustomerBoardCommentRequestDto = { customerBoardComment: comment };

        if (customerBoardNumber !== undefined) {
        postCustomerBoardCommentRequest(customerBoardNumber, requestBody, cookies.accessToken).then(postCustomerBoardCommentResponse);
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
        if (!cookies.accessToken || !customerBoardCommentNumber) return;

        const requestBody: PutCustomerBoardCommentRequestDto = {customerBoardComment: comment};
        putCustomerBoardCommentRequest(customerBoardCommentNumber, requestBody, cookies.accessToken).then(putCustomerBoardCommentResponse);
        console.log("ok");
    };

    const onDeleteClikcHandler = () => {
        if (!customerBoardCommentNumber || loginUserId !== writerId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니다?');
        if (!isConfirm) return;

        deleteCustomerBoardCommentRequest(customerBoardCommentNumber, cookies.accessToken).then(deleteCustomerBoardCommentResponse);
        console.log("ok");
    };

    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken || customerBoardNumber === undefined) return;
        getCustomerBoardCommentsByBoardNumberRequest(customerBoardNumber, cookies.accessToken)
            .then(getCustomerBoardCommentListResponse);
    }, [cookies.accessToken, customerBoardNumber]);

    //                    component                    //
    const CommentPost = () => {

        //              render              //
        return (
            <div className="customer-comment-post">
                <div className="customer-comment-write-contents-box"><textarea className='customer-comment-write-contents-textarea' style={{ height: `${28 * commentRows}px` }}    />
                    {/* <textarea ref={commentRef} placeholder="댓글을 입력하세요" maxLength={1000} className='customer-comment-write-contents-textarea' value={comment === null ? '' : comment} onChange={onCommentChangeHandler} style={{ height: `${28 * commentRows}px` }} /> */}
                    <button className='primary-button' onClick={onPostButtonClickHandler}>작성</button>
                </div>
            </div>
        );
    };

    //                    component                    //
function ListItem({
    customerBoardCommentNumber,
    customerBoardCommentWriterId,
    customerBoardCommentContents,
    customerBoardCommentDatetime,
    onDeleteClick,
    onUpdateClick
}: CustomerBoardCommentListItem & { onDeleteClick: () => void, onUpdateClick: () => void }) {


    //              render              //
    return (
        <div className='customer-comment-table-tr'>
            <div className='customer-comment-number'>{customerBoardCommentNumber}</div>
            <div className='customer-comment-author'>작성자: {customerBoardCommentWriterId}</div>
            <div className='customer-comment-contents'>{customerBoardCommentContents}</div>
            <div className='customer-comment-date'>작성일: {customerBoardCommentDatetime}</div>
            <div>
                <button onClick={onDeleteClick}>삭제</button>
                <button onClick={onUpdateClick}>수정</button>
            </div>
        </div>
    );
}

    //              render              //
    return (
        <div id='customer-baord-comment-wrapper'>
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
                    <div className="customer-comment-section">
                        <div className="designe-comment-list">
                            {customerBoardCommentList.map((item, index) => <ListItem 
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

