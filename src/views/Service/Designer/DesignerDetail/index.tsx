import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';

import { useCreateChatRoom } from 'src/hooks/useCreateChatRoom';

import { useUserStore } from 'src/stores';

import ResponseDto from 'src/apis/response.dto';
import { 
    getDesignerBoardRequest, 
    increaseViewCountRequest, 
    deleteDesignerBoardRequest 
} from 'src/apis/designerBoard';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';

import DesignerBoardComment from '../DesignerComment';

import { 
    DESIGNER_BOARD_LIST_ABSOLUTE_PATH, 
    DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH, 
    MAIN_PATH 
} from 'src/constant';

import './style.css';

//                          component                           //
export default function DesignerDetail() {

//                          state                           //
    const { designerBoardNumber } = useParams();
    const { loginUserId, loginUserRole } = useUserStore();
    const { designerIdClickHandler } = useCreateChatRoom();

    const [cookies] = useCookies();

    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);

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
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { designerBoardTitle,
            designerBoardWriterId,
            designerBoardWriteDatetime,
            designerBoardViewCount,
            designerBoardContents,
            } = result as GetDesignerBoardResponseDto;

        setTitle(designerBoardTitle);
        setWriterId(designerBoardWriterId);
        setWriteDate(designerBoardWriteDatetime);
        setViewCount(designerBoardViewCount);
        setContents(designerBoardContents);

    };

    const deleteDesignerBoardResponse = (result: ResponseDto | null) => {
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
        navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
        };

//                          event handler                           //
    const handleGoToList = () => {
        navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };

    const onUpdateClickHandler = () => {
        if (!designerBoardNumber || loginUserId !== writerId) return;
        navigator(DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH(designerBoardNumber));
    };

    const onDeleteButtonClickHandler = () => {
        if (!designerBoardNumber || (loginUserId !== writerId && loginUserRole !== 'ROLE_ADMIN')) {
            alert('작성자 또는 관리자만 삭제할 수 있습니다.');
            return;
        }
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
        .then(deleteDesignerBoardResponse);
    };

//                          effect                          //
    useEffect(() => {
        if (!cookies.accessToken || !designerBoardNumber) return;
        increaseViewCountRequest(designerBoardNumber, cookies.accessToken)
            .then(increaseViewCountResponse);
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(getDesignerBoardResponse);
    }, [cookies.accessToken, designerBoardNumber]);

//                          render                          //
    return (
    <div className="designer-detail">
        <div className="designer-detail-title">{title}</div>
        <div className="designer-detail-container">
            <div className="designer-detail-information">
                <div className="designer-detail-information1">작성자: <span  onClick={() => designerIdClickHandler(writerId)}>{writerId}</span></div>
                <div className="designer-detail-information2">작성일: {writeDate}</div>
                <div className="designer-detail-information3">조회수: {viewCount}</div> 
                {loginUserId === writerId && (
                <>
                <div className="designer-detail-information4" onClick={onDeleteButtonClickHandler}>삭제</div>
                {loginUserId === writerId && (
                <div className="designer-detail-information5" onClick={onUpdateClickHandler}>수정</div>
                )}
                </>
                )}
            </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: contents }} className="designer-detail-view"></div>
        <DesignerBoardComment />
        <div className="designer-detail-go-to-designerList" onClick={handleGoToList}>목록으로</div>
    </div>
    );
}
