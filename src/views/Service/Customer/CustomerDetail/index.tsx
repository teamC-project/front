import React, { useEffect, ChangeEvent, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { CustomerBoardCommentListItem } from 'src/types';
import { GetCustomerBoardResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { CUSTOMER_BOARD_LIST_ABSOLUTE_PATH, CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getCustomerBoardRequest, postCustomerBoardCommentRequest } from 'src/apis/customerBoard';
import { useUserStore } from 'src/stores';
import { PostCustomerBoardCommentRequestDto } from 'src/apis/customerBoard/dto/request';

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
    const [commentRows, setCommentRows] = useState<number>(1);

    //                  function                    //
    const navigate = useNavigate();

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
                navigate(MAIN_PATH);
                return;
            }
            navigate(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { customerBoardTitle: title,
          customerBoardWriterId: writerId,
          customerBoardWriteDatetime: writeDatetime,
          customerBoardViewCount: viewCount,
          customerBoardContents: contents,
          customerBoardComment: comment } = result as GetCustomerBoardResponseDto;
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
        setComment(comment);
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

    //                   event handler                    //
    const handleGoToList = () => {
        navigate(CUSTOMER_BOARD_LIST_ABSOLUTE_PATH);
    };
    
    const onUpdateClickHandler = () => {
        if (!customerBoardNumber || loginUserId !== writerId) return;
        navigate(CUSTOMER_BOARD_UPDATE_ABSOLUTE_PATH(customerBoardNumber));
    };

    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESiGNER') return;
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);
    };

    const onCommentSubmitClickHandler = () => {
        if (!comment || !comment.trim()) return;
        if (!customerBoardNumber || (loginUserRole !== 'ROLE_DESIGNER' && 'ROLE_CUSTOMER')) return;

        const requestBody: PostCustomerBoardCommentRequestDto = { comment };
        postCustomerBoardCommentRequest(customerBoardNumber, requestBody, cookies.accessToken).then(postCustomerBoardCommentResponse);
    };

    //                   effect                        //
    useEffect(() => {
      if (!cookies.accessToken || !customerBoardNumber) return;
      getCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
        .then(getCustomerBoardResponse);
    }, []);

    //                    component                    //
        const CommentPost = ({ contents}: Props) => {
    //              state               //

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
    <div className="customer-detail">
      <div className="customer-detail-title">{title}</div>
      <div className="customer-detail-container">
        <div className="customer-detail-information">
          <div className="customer-detail-information1">작성자: {writerId}</div>
          <div className="customer-detail-information2">작성일: {writeDate}</div>
          <div className="customer-detail-information3">조회수: {viewCount}</div>
          <div className="customer-detail-information4">삭제</div>
          <div className="customer-detail-information5" onClick={onUpdateClickHandler}>수정</div>
        </div>
      </div>
      <div className="customer-detail-view">
        {/* 내용 표시 */}
        {contents}
      </div>
      <div className='customer-comment-list'>
        {viewList.map((item) => (
          <div key={item.customerBoardCommentWriterId} className='customer-comment-box'>
            <div className='primary-bedge'>댓글</div>
            <div className='customer-comment'>{item.customerBoardCommentContents}</div>
          </div>
        ))}
      </div>
      {/* 수정: 댓글 작성 박스는 항상 표시 */}
      <div className='customer-comment-write-box'>
        <div className='customer-comment-textarea-box'>
          <textarea
            style={{ height: `${28 * commentRows}px` }}
            className='customer-comment-textarea'
            placeholder='댓글을 작성해주세요.'
            value={comment || ''}
            onChange={onCommentChangeHandler}
          />
        </div>
        <div className='primary-button' onClick={onCommentSubmitClickHandler}>댓글 작성</div>
      </div>
      <div className="customer-detail-go-to-customerList" onClick={handleGoToList}>
        목록으로
      </div>
    </div>
    );
}
