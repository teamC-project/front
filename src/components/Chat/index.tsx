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

    console.log(chatroomId);

    //                    event handler                    //
    const onClickHandler = () => setRoomId(chatroomId);

    //                    render                    //
    return (
        <div className='chatroom-list-table-tr' onClick={onClickHandler}>
            <div className='chat-room-list-table-room-number'>{chatroomId}</div>
            <div className='chat-room-list-table-title' style={{ textAlign: 'left' }}>{roomName}</div>
        </div>
    );
}

//                    component                    //
const ChatRoom = ({ selectedDesignerId }: ChatRoomProps) => {

    //                    state                    //
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

    const [cookies] = useCookies();
    const [rooms, setRooms] = useState<ChatroomList[]>([]);
    const [newRoomName, setNewRoomName] = useState<string>('');
    const { roomId } = useParams<string>();
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessageList[]>([]);
    const { loginUserRole, loginUserId } = useUserStore();
    // const [selectedDesignerId, setSelectedDesignerId] = useState<string>('');

    const [chatroomList, setChatroomList] = useState<ChatroomList[]>([]);
    const [viewList, setViewList] = useState<ChatroomList[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    //                  function                    //
    const navigator = useNavigate();

    const changePage = (chatroomList: ChatroomList[], totalLenght: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = chatroomList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if (!currentSection) return;
        const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };
    
    const changeBoardList = (chatroomList: ChatroomList[]) => {
        setChatroomList(chatroomList);

        const totalLenght = chatroomList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(chatroomList, totalLenght);

        changeSection(totalPage);
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

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    //                   effect                    //
    useEffect(() => {
        if(!cookies.accessToken) return;
        getChatroomListRequest(cookies.accessToken).then(getChatroomListResponse);
        console.log('Selected Designer ID:', selectedDesignerId);

        function onConnect() {
            console.log(socket);
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMessage(args: any) {
            console.log('message');
            console.log(args);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message',onMessage );
    
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };

        


        // if (roomId) {
        //     getChatMessagesRequest(roomId, cookies.accessToken).then(getChatMessagesResponse)
        //     socket.connect();
        //     socket.emit('joinRoom', roomId);
        //     socket.on('message', (newMessage: ChatMessageList) => {  //  prevMessages = 현재 메시지 목록의 이전 상태
        //         setMessages(prevMessages => [...prevMessages, newMessage]);  // prevMessages 배열에 모든 기준 요소를 새로운 배열로 복사 후, newMessage 추가     즉 현재 메시지 목록의 이전 상태에 newMessage 를 넣은후 새로운 배열상태인 setMessages 를 추가 함.
        //     });

        //     return () => {  // 컴포넌트가 언마운트되거나 roomId가 변경될 때 실행
        //         socket.emit('leaveRoom', roomId);
        //         socket.disconnect();
        //     };
        // }
    }, [cookies.accessToken, roomId]);

    // useEffect(() => {
    //     if (!cookies.accessToken) return;
    //     getChatroomListRequest(cookies.accessToken).then(getChatroomListResponse);
    // }, [cookies.accessToken]);

    useEffect(() => {
        if (selectedDesignerId) {
            const roomName = prompt('채팅방 이름을 입력하세요:', '');
            if (roomName) {
                setNewRoomName(roomName);
                createRoom(roomName);
            }
        }
    }, [selectedDesignerId]);

    useEffect(() => {
        if (!chatroomList.length) return;
        changePage(chatroomList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!chatroomList.length) return;
        changeSection(totalPage);
    }, [currentSection]);

    //                    render                    //
    return (
        <div className='chat-room'>
            <div className='chat-room-list'>
                <h2>채팅방 목록</h2>
                <div className='chat-room-list-table-room-number'>번호</div>
                    <div className='chat-room-list-table-title'>제목</div>
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

// import React from 'react';
// import express from "express";

// export default function index() {
//     return (
//         <div>index</div>
//     );
// }
