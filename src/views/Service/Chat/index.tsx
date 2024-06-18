import React, { useEffect, useState } from 'react'
import './style.css';
import { GetChatroomResponseDto } from 'src/apis/chat/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate, useParams } from 'react-router';
import { CHAT_ROOM_DETAIL_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getChatroomRequest } from 'src/apis/chat';
import { useChatStore } from 'src/stores';
import socket from 'src/utils/socket';
import { io } from 'socket.io-client';

//                    component                    //
export default function ChatroomDetail() {

  //                    state                    //
  const navigator = useNavigate();
  const [cookies] = useCookies();
  const { roomId, resetRoomId } = useChatStore();
  const [roomname, setRoomName] = useState<string>('');
  const [customerId, setCustomerId] = useState<string>('');
  const [designerId, setDesignerId] = useState<string>('');
  const [messages, setMessages] = useState<{ senderId: string, message: string }[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');


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
    setCustomerId(customerId);
    setDesignerId(designerId);
  };

  //                    event handler                    //
  const onChatExitClickHandler = () => resetRoomId();

  const onMessageSendHandler = () => {
    if (newMessage.trim() !== '') {
      const newMessageContainer = { senderId: customerId, message: newMessage };
      socket.emit('senderMessage', newMessageContainer)
    }
  };
  //                    effect                    //
  useEffect(() => {
    if (roomId) {
      socket.emit('joinRoom', { roomId });

      socket.on('receiveMessage', (message: { senderId: string, message: string }) => {
        setMessages(beforMessages => [...beforMessages, message]);
      });

      return () => {
        socket.emit('leaveRoom', {roomId});
        socket.off('message');
      };
    }
  }, [roomId])

  //                    render                       //
  return (
    <div className="chat-room-container">
      <div className="chat-room-header">
        <h2>{roomname}</h2>
        <button onClick={onChatExitClickHandler}>나가기</button>
      </div>
      <div className="cha-troom-messages">
        {messages.map((item, index) => (
          <div key={index} className={item.senderId === customerId ? 'message-sent' : 'message-received'}>
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
        <button onClick={onMessageSendHandler}>전송</button>
      </div>
    </div>
  );
}
