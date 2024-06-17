import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import {  GetChatroomListResponseDto } from 'src/apis/chat/dto/response';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { CHAT_ROOM_DETAIL_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { getChatMessagesRequest, getChatroomListRequest,  postChatRoomRequest } from 'src/apis/chat';
import socket from 'src/utils/socket';
import { useUserStore } from 'src/stores';
import { ChatMessageList, ChatroomList } from 'src/types';
import { PostChatroomRequestDto } from 'src/apis/chat/dto/request';

interface ChatRoomProps {
    selectedDesignerId: string;
}

//                    component                    //
const ChatRoom: React.FC<ChatRoomProps> = ({ selectedDesignerId }) => {

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
                console.log('Room created successfully');
                getChatroomListRequest(cookies.accessToken).then(getChatroomListResponse);
            });
        setNewRoomName('');
        // setSelectedDesignerId(''); // 상태 초기화 -> 다음번 새로운 디자이너 Id 선택할 수 있게 함
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

    useEffect(() => {
        if (selectedDesignerId) {
            const roomName = prompt('채팅방 이름을 입력하세요:', '');
            if (roomName) {
                setNewRoomName(roomName);
                createRoom();
            }
        }
    }, [selectedDesignerId]);

    useEffect(() => {
        if (selectedDesignerId) {
            createRoom();
        }
    }, [selectedDesignerId]);

    //                    render                    //
    return (
        <div className='chat-room'>
            <div className='chat-room-list'>
                <h2>채팅방 목록</h2>
                <ul>
                    {rooms.map(room => (
                        <li key={room.chatRoomId}>{room.chatName}</li>
                    ))}
                </ul>
                {/* <h2>채팅방 생성</h2>
                <input type='text' value={newRoomName} onChange={(event: ChangeEvent<HTMLInputElement>) => setNewRoomName(event.target.value)} placeholder='채팅방 이름' />
                <button onClick={createRoom}>채팅방 생성</button> */}
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

