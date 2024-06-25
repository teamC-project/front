import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import {  GetChatroomListResponseDto } from 'src/apis/chat/dto/response';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { CHAT_ROOM_DETAIL_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, GET_CHATROOM_DETAIL_URL, MAIN_PATH } from 'src/constant';
import { getChatroomListRequest,  postChatRoomRequest } from 'src/apis/chat';
import socket from 'src/utils/socket';
import { useChatStore, useUserStore } from 'src/stores';
import { ChatMessageList, ChatroomList } from 'src/types';
import { PostChatroomRequestDto } from 'src/apis/chat/dto/request';
import { usePagination } from 'src/hooks/pagination';

interface ChatRoomProps {
    selectedDesignerId: string;
}

//                    component                    //
function ListItem ({ 
    chatroomId,
    roomName
}: ChatroomList) {

    //                    state                    //
    const {setRoomId} = useChatStore();

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onClickHandler = () => setRoomId(chatroomId);

    //                    render                    //
    return (
        <div className='chatroom-list-table-tr' onClick={onClickHandler}>
            <div className='chat-room-list-table-title' style={{ textAlign: 'center' }}>{roomName}</div>
        </div>
    );
}

//                    component                    //
const ChatRoom = ({ selectedDesignerId }: ChatRoomProps) => {

    //                    state                    //
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

    const [cookies] = useCookies();
    const {roomId, setRoomId, rooms, setRooms} = useChatStore();
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessageList[]>([]);
    const { loginUserRole, loginUserId } = useUserStore();
    // const [selectedDesignerId, setSelectedDesignerId] = useState<string>('');

    // const [viewList, setViewList] = useState<ChatroomList[]>([]);
    // const [totalLenght, setTotalLength] = useState<number>(0);
    // const [totalPage, setTotalPage] = useState<number>(1);
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [pageList, setPageList] = useState<number[]>([1]);
    // const [totalSection, setTotalSection] = useState<number>(1);
    // const [currentSection, setCurrentSection] = useState<number>(1);

    const {
        setBoardList,
		viewList,
		pageList,
		currentPage,
		setCurrentPage,
		setCurrentSection,
		changeBoardList,
		changePage,
		onPageClickHandler,
		onPreSectionClickHandler,
		onNextSectionClickHandler
	}  = usePagination<ChatroomList>(COUNT_PER_PAGE, COUNT_PER_SECTION)

    //                  function                    //
    const navigator = useNavigate();

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
        changeBoardList(chatRoomList);

        setCurrentPage(!chatRoomList.length ? 0 : 1);
        setCurrentSection(!chatRoomList.length ? 0 : 1);
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

    const createRoom = (roomName: string) => {
        if (loginUserRole !== 'ROLE_CUSTOMER') {
            alert('채팅방 생성은 고객만 가능합니다.');
            return;
        }

        if (!roomName.trim()) {
            return;
        }

        const requestBody: PostChatroomRequestDto = {
            roomId:0,
            customerId: loginUserId,
            designerId: selectedDesignerId,
            roomName: roomName
        };

        postChatRoomRequest(requestBody, cookies.accessToken)
            .then((response) => {
                getChatroomListRequest(cookies.accessToken).then(getChatroomListResponse);
            })
            .catch(error => {
            });
        setNewRoomName('');
    };

    const postChatroomResponse = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!roomId || !cookies.accessToken)
            return;
        getChatroomListRequest( cookies.accessToken).then(getChatroomListResponse);
    };


    //              event handler              //
    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewRoomName(event.target.value);
    };




    //                   effect                    //
    useEffect(() => {
        if(!cookies.accessToken) return;
        getChatroomListRequest(cookies.accessToken).then(getChatroomListResponse);

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMessage(args: any) {
        }
        if (isConnected) return;
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message', onMessage);
        };

    }, [cookies.accessToken]);


    // useEffect(() => {
    //     if (!rooms.length) return;
    //     changePage(rooms, totalLenght);
    // }, [currentPage]);

    // useEffect(() => {
    //     if (!rooms.length) return;
    //     changeSection(totalPage);
    // }, [currentSection]);

    useEffect(() => {
        changeBoardList(rooms);
    }, [rooms]);

    //                    render                    //
    return (
        <div className='chat-room'>
            <div className='chat-room-list'>
                <h2>채팅방 목록</h2>
                    {viewList.map(item => (
                        <ListItem key={item.chatroomId} {...item} />
                        ))}
            </div>
            <div className='chat-room-list-bottom'>
            <div className='chat-room-list-pagenation'>
                <div className='chat-room-list-page-left' onClick={onPreSectionClickHandler}></div>
                <div className='chat-room-list-page-box'>
                    {pageList.map(page => 
                        page === currentPage ? 
                        <div key={page} className='chat-room-list-page-active'>{page}</div> :
                        <div key={page} className='chat-room-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                    )}
                </div>
                <div className='chat-room-list-page-right' onClick={onNextSectionClickHandler}></div>
            </div>
        </div>
        </div>
    );
}

export default ChatRoom;
