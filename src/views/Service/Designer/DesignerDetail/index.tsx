import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { ChatMessageList, ChatroomList, DesignerBoardCommentListItem, DesignerBoardListItem } from 'src/types';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH, DESIGNER_BOARD_UPDATE_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getDesignerBoardRequest, postDesignerBoardCommentRequest, increaseViewCountRequest, deleteDesignerBoardRequest, getDesignerBoardListRequest } from 'src/apis/designerBoard';
import { useUserStore } from 'src/stores';
import DesignerBoardComment from '../DesignerComment';

import { getChatroomListRequest, postChatRoomRequest } from 'src/apis/chat';
import { PostChatroomRequestDto } from 'src/apis/chat/dto/request';
import { GetChatroomListResponseDto } from 'src/apis/chat/dto/response';
interface ChatRoomProps {
    selectedDesignerId: string;
}

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

    const [selectedDesignerId, setSelectedDesignerId] = useState<string>('');
    const [rooms, setRooms] = useState<ChatroomList[]>([]);
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessageList[]>([]);

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

    const getChatroomListResponse = (result: GetChatroomListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { chatRoomList } = result as GetChatroomListResponseDto;
        setRooms(chatRoomList);
    };

    const getChatMessagesResponse = (result: any) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { messages } = result;
        setMessages(messages);
    };

    const createRoom = () => {
        if (loginUserRole !== 'ROLE_CUSTOMER') {
            alert('채팅방 생성은 고객만 가능합니다.');
            return;
        };
        
        if (!newRoomName.trim()) return;

        const requestBody : PostChatroomRequestDto = {
            chatRoomName: newRoomName,
            chatCustomerId: loginUserId,
            chatDesignerId: selectedDesignerId
        };
        
        postChatRoomRequest(requestBody, cookies.accessToken)
            .then(() => {
                getChatroomListRequest(cookies.accessToken).then(getChatroomListResponse);
            });
        setNewRoomName('');
        setSelectedDesignerId(''); // 상태 초기화 -> 다음번 새로운 디자이너 Id 선택할 수 있게 함
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
        if (!designerBoardNumber || loginUserId !== writerId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(deleteDesignerBoardResponse)
    };

    const designerIdClickHandler = () => {
        const confirmCreateRoom = window.confirm('채팅방을 생성하시겠습니까?');
        console.log('Designer ID clicked:', writerId);
        const event = new CustomEvent<string>('designerIdSelected', { detail: writerId });
        window.dispatchEvent(event);
    }

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
                    <div className="designer-detail-information1" >작성자: <span onClick={designerIdClickHandler}>{writerId}</span></div>
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
