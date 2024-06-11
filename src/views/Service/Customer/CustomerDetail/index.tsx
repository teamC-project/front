import React, { useEffect, ChangeEvent, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { CustomerBoardCommentListItem } from 'src/types';
import { GetCustomerBoardResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getCustomerBoardRequest, postCustomerBoardCommentRequest, increaseViewCountRequest } from 'src/apis/customerBoard';
import { useUserStore } from 'src/stores';
import { PostCustomerBoardCommentRequestDto } from 'src/apis/customerBoard/dto/request';
import CustomerBoardComment from '../CustomerComment';


interface Props {
    contents: string;
}


//                    component                    //
export default function CustomerDetail() {

    //              state               //
    const { loginUserId, loginUserRole } = useUserStore();
    const { customerBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [viewList, setViewList] = useState<CustomerBoardCommentListItem[]>([]);

    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string | null>(null);
    const [commentList, setCommentList] = useState<CustomerBoardCommentListItem[]>([]);
    const [commentRows, setCommentRows] = useState<number>(1);
    const [isSecret, setIsSecret] = useState<boolean>(false);

    //                  function                    //
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
          customerBoardComment,
          secret } = result as GetCustomerBoardResponseDto;

        if (secret && loginUserRole === 'ROLE_CUSTOMER' && (customerBoardWriterId !== loginUserId)) {
          alert('권한이 없습니다.');
          navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
          return;
        }

        setTitle(customerBoardTitle);
        setWriterId(customerBoardWriterId);
        setWriteDate(customerBoardWriteDatetime);
        setViewCount(customerBoardViewCount);
        setContents(customerBoardContents);
        setComment(customerBoardComment);
        setIsSecret(secret);
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
        getCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
            .then(getCustomerBoardResponse);
            
    };

    //                   event handler                    //
    const handleGoToList = () => {
        navigator(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
    };
    
    const onUpdateClickHandler = () => {
        if (!customerBoardNumber || loginUserId !== writerId) return;
        navigator(CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH(customerBoardNumber));
    };


    //                   effect                        //
    useEffect(() => {
      if (!cookies.accessToken || !customerBoardNumber) return;
      increaseViewCountRequest(customerBoardNumber, cookies.accessToken)
        .then(increaseViewCountResponse);
      getCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
        .then(getCustomerBoardResponse);
    }, [cookies.accessToken, customerBoardNumber]);


    //              render              //
    return (
    <div className="customer-detail">
      <div className="customer-detail-title">{title}</div>
      <div className="customer-detail-container">
        <div className="customer-detail-information">
          <div className="customer-detail-information1">작성자: {writerId}</div>
          <div className="customer-detail-information2">작성일: {writeDate}</div>
          <div className="customer-detail-information3">조회수: {viewCount}</div>
          {/* 작성자와 로그인한 사용자가 같은 경우에만 수정/삭제 버튼 표시 */}
        {loginUserId === writerId && (
          <>
            <div className="customer-detail-information4">삭제</div>
            <div className="customer-detail-information5" onClick={onUpdateClickHandler}>
              수정
            </div>
          </>
        )}
        </div>
      </div>
      <div className="customer-detail-view">
        {/* 내용 표시 */}
        {contents}
      </div>
      <CustomerBoardComment />
      <div className="customer-detail-go-to-customerList" onClick={handleGoToList}>
        목록으로
      </div>
    </div>
    );
}
