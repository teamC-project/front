import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { DesignerBoardCommentListItem, DesignerBoardListItem } from 'src/types';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getDesignerBoardRequest, postDesignerBoardCommentRequest, increaseViewCountRequest, deleteDesignerBoardRequest, getDesignerBoardListRequest } from 'src/apis/designerBoard';
import { useUserStore } from 'src/stores';
import DesignerBoardComment from '../DesignerComment';

//                    component                    //
export default function DesignerDetail() {

    //              state               //
    const { loginUserId, loginUserRole } = useUserStore();
    const { designerBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [viewList, setViewList] = useState<DesignerBoardCommentListItem[]>([]);
    const [designerBoardList, setDesignerBoardList] = useState<DesignerBoardListItem[]>([]);

    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string | null>(null);
    const [commentList, setCommentList] = useState<DesignerBoardCommentListItem[]>([]);
    const [commentRows, setCommentRows] = useState<number>(1);

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
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        if (!cookies.accessToken || !designerBoardNumber) return;
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(getDesignerBoardResponse);
    };
  
    const getDesignerBoardResponse = (result: GetDesignerBoardResponseDto | ResponseDto | null) => {
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
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const {
            designerBoardTitle,
            designerBoardWriterId,
            designerBoardWriteDatetime,
            designerBoardViewCount,
            designerBoardContents,
            designerBoardComment,
        } = result as GetDesignerBoardResponseDto;

        setTitle(designerBoardTitle);
        setWriterId(designerBoardWriterId);
        setWriteDate(designerBoardWriteDatetime);
        setViewCount(designerBoardViewCount);
        setContents(designerBoardContents);
        setComment(designerBoardComment);
    };

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
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(getDesignerBoardResponse);
    };

    const deleteDesignerBoardResponse = (result: ResponseDto | null) => {
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

        navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };

    //                   event handler                    //
    const handleGoToList = () => {
        navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };
    
    const onUpdateClickHandler = () => {
        if (!designerBoardNumber || loginUserId !== writerId) return;
        navigator(DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH(designerBoardNumber));
    };

    const onDeleteButtonClickHandler = () => {
        if (!designerBoardNumber || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(deleteDesignerBoardResponse)
            .catch(() => {
                alert('게시물 삭제 중 오류가 발생했습니다.');
            });
    };

    //                   effect                        //
    useEffect(() => {
        if (!cookies.accessToken || !designerBoardNumber) return;
        increaseViewCountRequest(designerBoardNumber, cookies.accessToken)
            .then(increaseViewCountResponse);
            getDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(getDesignerBoardResponse);
    }, [cookies.accessToken, designerBoardNumber]);

    //              render              //
    return (
        <div className="designer-detail">
            <div className="designer-detail-title">{title}</div>
            <div className="designer-detail-container">
                <div className="designer-detail-information">
                    <div className="designer-detail-information1">작성자: {writerId}</div>
                    <div className="designer-detail-information2">작성일: {writeDate}</div>
                    <div className="designer-detail-information3">조회수: {viewCount}</div>
                    {/* 작성자와 로그인한 사용자가 같은 경우에만 수정/삭제 버튼 표시 */}
                    {loginUserId === writerId && (
                    <>
                        <div className="designer-detail-information4" onClick={onDeleteButtonClickHandler}>삭제</div>
                        <div className="designer-detail-information5" onClick={onUpdateClickHandler}>
                        수정
                        </div>
                    </>
                    )}
                </div>
            </div>
            <div className="designer-detail-view">
                {/* 내용 표시 */}
                {contents}
            </div>
            <DesignerBoardComment />
            <div className="designer-detail-go-to-designerList" onClick={handleGoToList}>
                목록으로
            </div>
        </div>
    );
}
