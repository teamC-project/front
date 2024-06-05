import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteCustomerBoardCommentRequest, getCustomerBoardCommentListRequest, getCustomerBoardRequest, postCustomerBoardCommentRequest } from 'src/apis/customerBoard';
import { PostCustomerBoardCommentRequestDto } from 'src/apis/customerBoard/dto/request';
import { GetCustomerBoardCommentListResponseDto, GetCustomerBoardResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH, CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { CustomerBoardCommentListItem } from 'src/types';

interface Props {
    contents: string;
}

//                    component                    //
function ListItem({
    customerBoardCommentNumber,
    customerBoardCommentWriterId,
    customerBoardCommentContents,
    customerBoardCommentDatetime
}: CustomerBoardCommentListItem) {


    //              render              //
    return (
        <div className='customer-comment-table-tr'>
            <div className='customer-comment-number'>{customerBoardCommentNumber}</div>
            <div className='customer-comment-author'>작성자: {customerBoardCommentWriterId}</div>
            <div className='customer-comment-contents'>{customerBoardCommentContents}</div>
            <div className='customer-comment-date'>작성일: {customerBoardCommentDatetime}</div>
        </div>
    );
}

//                    component                    //
export default function CustomerBoardComment() {

    //                    state                    //
    const { loginUserId, loginUserRole } = useUserStore();
    const { customerBoardNumber } = useParams();
    // const { customerBoardCommentNumber } = useParams();
    const [customerBoardCommentNumber, setCustomerBoardCommentNumber] = useState<number>(1);
    const [customerBoardCommentList, setCustomerBoardCommentList] = useState<CustomerBoardCommentListItem[]>([]);
    const [writerId, setWriterId] = useState<string>('');
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
        if (!result || !('customerBoardCommentList' in result)) {
            console.log('데이터가 없습니다.');
            return;
        }

        const { customerBoardCommentList } = result as GetCustomerBoardCommentListResponseDto;
        chagneCustomerBoardCommentList(customerBoardCommentList);
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

    };

    //                   event handler                    //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_CUSTOMER') return;
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);
    };

    const onCommentSubmitClickHandler = () => {
        if (!comment || !comment.trim()) return;
        if (!customerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_CUSTOMER')) return;

        const requestBody: PostCustomerBoardCommentRequestDto = { customerBoardComment: comment };
        postCustomerBoardCommentRequest(customerBoardNumber, requestBody, cookies.accessToken).then(postCustomerBoardCommentResponse);

        getCustomerBoardCommentListRequest(customerBoardNumber, cookies.accessToken).then(getCustomerBoardCommentListResponse);
    };

    const onDeleteClikcHandler = () => {
        if (!customerBoardCommentNumber || loginUserId !== writerId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니다?');
        if (!isConfirm) return;

        deleteCustomerBoardCommentRequest(customerBoardCommentNumber, cookies.accessToken).then(deleteCustomerBoardCommentResponse);
    };

    //                   effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getCustomerBoardCommentListRequest(customerBoardCommentNumber, cookies.accessToken).then(getCustomerBoardCommentListResponse);

    }, [customerBoardNumber, cookies.accessToken]);



    //                    component                    //
    const CommentPost = ({ contents }: Props) => {

        //              render              //
        return (
            <div className="customer-comment-post">
                <div className="customer-comment-write-contents-box">
                    <textarea placeholder="댓글을 입력하세요" className='customer-comment-write-contents-textarea'>{contents}</textarea>
                    <button className='primary-button' onClick={onCommentSubmitClickHandler}>작성</button>
                </div>
            </div>
        );
    };

    //              render              //
    return (
        <div id='customer-baord-comment-wrapper'>
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
                    <div className="customer-comment-section">
                        <div className="designe-comment-list">
                            {customerBoardCommentList.map(item => <ListItem {...item} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

