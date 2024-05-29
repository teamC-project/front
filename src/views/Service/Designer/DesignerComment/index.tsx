import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { getDesignerBoardRequest, postDesignerBoardCommentRequest } from 'src/apis/designerBoard';
import { PostDesignerBoardCommentRequestDto } from 'src/apis/designerBoard/dto/request';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { DesignerBoardCommentListItem } from 'src/types';

//                    component                    //
function ListItem ({
    designerBoardCommentNumber,
    designerBoardCommentWriterId,
    designerBoardCommentDatetime
}: DesignerBoardCommentListItem) {

    //              state               //
    const [viewList, setViewList] = useState<DesignerBoardCommentListItem[]>([]);

    //              render              //
    return (
        <div className='designer-comment-table-tr'>
            <div className='designer-comment-number'>{designerBoardCommentNumber}</div>
            <div className='designer-comment-author'>{designerBoardCommentWriterId}</div>
            <div className='designer-comment-date'>{designerBoardCommentDatetime}</div>
        </div>
    );
}

//                    component                    //
export default function DesignerBoardComment() {
    

    //                    state                    //
    const { loginUserId, loginUserRole } = useUserStore();
    const { designerBoardNumber } = useParams();
    const [comment, setComment] = useState<string | null>(null);
    const [cookies] = useCookies();

    //                  function                    //
    const navigate = useNavigate();

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
                navigate(MAIN_PATH);
                return;
            }
            navigate(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    }

    const onCommentSubmitClickHandler = () => {
        if (!comment || !comment.trim()) return;
        if (!designerBoardNumber || loginUserRole !== 'ROLE_DESIGNER' && 'ROLE_CUSTOMER') return;

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
            getDesignerBoardRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardResponse);
        };

        const requestBody: PostDesignerBoardCommentRequestDto = { comment };
        postDesignerBoardCommentRequest(designerBoardNumber, requestBody, cookies.accessToken).then(postDesignerBoardCommentResponse);
    };

    //              render              //
    return (
        <div id='designer-baord-comment-wrapper'>

        </div>
    );
}

