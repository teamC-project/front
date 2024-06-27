import  { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { usePagination } from 'src/hooks'; 

import { useChatStore } from 'src/stores';

import { ChatroomList } from 'src/types';

import socket from 'src/utils/socket';

import ResponseDto from 'src/apis/response.dto';
import {  GetChatroomListResponseDto } from 'src/apis/chat/dto/response';

import { getChatroomListRequest } from 'src/apis/chat';

import { 
    COUNT_PER_PAGE, 
    COUNT_PER_SECTION, 
    MAIN_PATH 
} from 'src/constant';

import './style.css';

interface ChatRoomProps {
    selectedDesignerId: string;
}

//                          component                           //
function ListItem ({ 
    chatroomId,
    roomName
}: ChatroomList) {

//                          state                           //
    const {setRoomId} = useChatStore();

//                          event handler                           //
    const onClickHandler = () => setRoomId(chatroomId);

//                          render                          //
    return (
        <div className='chatroom-list-table-tr' onClick={onClickHandler}>
            <div className='chat-room-list-table-title' style={{ textAlign: 'center' }}>{roomName}</div>
        </div>
    );
}

//                          component                           //
const ChatRoom = ({ selectedDesignerId }: ChatRoomProps) => {

//                          state                           //
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

    const [cookies] = useCookies();
    const { rooms, setRooms} = useChatStore();

    const {
		viewList,
		pageList,
		currentPage,
		setCurrentPage,
		setCurrentSection,
		changeBoardList,
		onPageClickHandler,
		onPreSectionClickHandler,
		onNextSectionClickHandler
	}  = usePagination<ChatroomList>(COUNT_PER_PAGE, COUNT_PER_SECTION)

//                          function                            //
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

//                          effect                          //
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

    useEffect(() => {
        changeBoardList(rooms);
    }, [rooms]);

//                          render                          //
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
