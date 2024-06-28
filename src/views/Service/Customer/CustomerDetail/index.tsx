import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';

import { useUserStore } from 'src/stores';
import {
    getCustomerBoardRequest,
    increaseViewCountRequest,
    deleteCustomerBoardRequest
} from 'src/apis/customerBoard';
import { GetCustomerBoardResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';

import {
    CUSTOMER_BOARD_LIST_ABSOLUTE_PATH,
    CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH,
    MAIN_PATH
} from 'src/constant';
import CustomerBoardComment from '../CustomerComment';

import './style.css';

//                          component                           //
export default function CustomerDetail() {

//                          state                           //
    const [isSecret, setIsSecret] = useState<boolean>(false);
    const [writeDate, setWriteDate] = useState<string>('');
    const { loginUserId, loginUserRole } = useUserStore();
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const { customerBoardNumber } = useParams();
    const [cookies] = useCookies();

//                          function                            //
    const navigator = useNavigate();
    const increaseViewCountResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
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

        if (!cookies.accessToken || !customerBoardNumber) return;
        getCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
            .then(getCustomerBoardResponse);
    };

    const getCustomerBoardResponse = (result: GetCustomerBoardResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수 번호입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { customerBoardTitle,
            customerBoardWriterId,
            customerBoardWriteDatetime,
            customerBoardViewCount,
            customerBoardContents,
            isSecret } = result as GetCustomerBoardResponseDto;

        if (isSecret && loginUserRole === 'ROLE_CUSTOMER' && (customerBoardWriterId !== loginUserId)) {
            alert('권한이 없습니다.');
            navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        setTitle(customerBoardTitle);
        setWriterId(customerBoardWriterId);
        setWriteDate(customerBoardWriteDatetime);
        setViewCount(customerBoardViewCount);
        setContents(customerBoardContents);
        setIsSecret(isSecret);
    };

    const deleteCustomerBoardResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        alert('삭제되었습니다.');
        navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
    };

//                          event handler                           //
    const handleGoToList = () => {
        navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
    };

    const onUpdateClickHandler = () => {
        if (!customerBoardNumber || loginUserId !== writerId) return;
        navigator(CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH(customerBoardNumber));
    };

    const onDeleteButtonClickHandler = () => {
        if (!customerBoardNumber || (loginUserId !== writerId && loginUserRole !== 'ROLE_ADMIN')) {
            alert('작성자 또는 관리자만 삭제할 수 있습니다.');
            return;
        }
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;
        deleteCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
            .then(deleteCustomerBoardResponse);
    };

//                          effect                          //
    useEffect(() => {
        if (!cookies.accessToken || !customerBoardNumber) return;
        increaseViewCountRequest(customerBoardNumber, cookies.accessToken)
            .then(increaseViewCountResponse);
        getCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
            .then(getCustomerBoardResponse);
    }, [cookies.accessToken, customerBoardNumber]);

//                          render                          //
    return (
        <div className="customer-detail">
            <div className="customer-detail-title">{title}</div>
            <div className="customer-detail-container">
                <div className="customer-detail-information">
                    <div className="customer-detail-information1">작성자: {writerId}</div>
                    <div className="customer-detail-information2">작성일: {writeDate}</div>
                    <div className="customer-detail-information3">조회수: {viewCount}</div>
                    {(loginUserId === writerId || loginUserRole === 'ROLE_ADMIN') && (
                        <>
                            <div className="customer-detail-information4" onClick={onDeleteButtonClickHandler}>삭제</div>
                            {loginUserId === writerId && (
                                <div className="customer-detail-information5" onClick={onUpdateClickHandler}>
                                    수정
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: contents }} className="customer-detail-view">
            </div>
            <CustomerBoardComment />
            <div className="customer-detail-go-to-customerList" onClick={handleGoToList}>
                목록으로
            </div>
        </div>
    );
}
