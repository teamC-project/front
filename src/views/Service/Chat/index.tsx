import React, { useEffect, useState } from 'react'
import './style.css';
import { GetChatMessageListResponseDto, GetChatMessageResponseDto, GetChatroomResponseDto } from 'src/apis/chat/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate, useParams } from 'react-router';
import { CHAT_ROOM_DETAIL_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getChatMessagesRequest, getChatroomRequest } from 'src/apis/chat';
import { useChatStore, useUserStore } from 'src/stores';
import socket from 'src/utils/socket';
import { io } from 'socket.io-client';
import { ChatMessageList } from 'src/types';

//                    component                    //
export default function ChatroomDetail() {

  //                    state                    //
  const navigator = useNavigate();
  const [cookies] = useCookies();
  const { roomId, resetRoomId } = useChatStore();
  const { loginUserId } = useUserStore();
  const [roomname, setRoomName] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessageList[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const [senderId, setSenderId] = useState<string>('');
  const [sendDatetime, setSendDatetime] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  //                    function                    //
  const getChatroomResponse = (result: GetChatroomResponseDto | ResponseDto | null) => {
    const message = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
        alert(message);
        if (result?.code === 'AF') {
            return;
        }
    }

    const {
      roomName,
      customerId,
      designerId
    } = result as GetChatroomResponseDto;

    setRoomName(roomName);
  };
  
  const getChatMessagesResponse = (result: GetChatMessageResponseDto | ResponseDto | null) => {
    const message = 
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패 했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      if (result?.code === 'AF') {
        navigator(MAIN_PATH);
        return;
      }
    }

    const { chatMessageList } = result as GetChatMessageListResponseDto;
    console.log(chatMessageList);
    setMessages(chatMessageList);

  };

  //                    event handler                    //
  const onChatExitClickHandler = () => resetRoomId();

  const onMessageSendHandler = () => {
    if (newMessage.trim() !== '') {
      const newMessageContainer = { chatroomId: Number(roomId), senderId: loginUserId, message: newMessage };
      socket.emit('senderMessage', newMessageContainer);
      setNewMessage('');
    }
  };

  let flag = false;

  //                    effect                    //
  useEffect(() => {
    if (flag) return;
    flag = true;
    if (roomId) {
      socket.emit('joinRoom', roomId);

      socket.on('receiveMessage', (message: ChatMessageList) => {
        setMessages(beforMessages => [...beforMessages, message]);
      });

      return () => {
        socket.emit('leaveRoom', {roomId});
        socket.off('message');
      };
    }
  }, [roomId])

  useEffect(() => {
    if (!cookies.accessToken || !roomId) return;
    getChatMessagesRequest(roomId, cookies.accessToken)
      .then(getChatMessagesResponse);
  }, [cookies.accessToken, roomId]);

  //                    render                       //
  return (
    <div className="chat-room-container">
      <div className="chat-room-header">
        <h2>{roomname}</h2>
        <button className='out-button' onClick={onChatExitClickHandler}>
          <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
          <div className="text">나가기</div>
        </button>
      </div>
      <div className="cha-troom-messages">
        {messages.map((item, index) => (
          <div key={index} className={item.senderId === loginUserId ? 'message-sent' : 'message-received'}>
            <div className="message-content">{item.message}</div>
          </div>
        ))}
      </div>
      <div className="chat-room-footer">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="메시지를 입력하세요" 
        />
        <button className='send-button' onClick={onMessageSendHandler}>전송</button>
      </div>
    </div>
  );
}
