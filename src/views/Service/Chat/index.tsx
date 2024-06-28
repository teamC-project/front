import  { 
    KeyboardEvent, 
    useEffect, 
    useState 
} from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { useChatStore, useUserStore } from 'src/stores';

import { ChatMessageList } from 'src/types';

import socket from 'src/utils/socket';

import ResponseDto from 'src/apis/response.dto';
import { 
    GetChatMessageListResponseDto, 
    GetChatMessageResponseDto, 
    GetChatroomResponseDto 
} from 'src/apis/chat/dto/response';

import { 
    deleteChatroomRequest, 
    getChatMessagesRequest, 
    getChatroomRequest 
} from 'src/apis/chat';

import { MAIN_PATH } from 'src/constant';

import './style.css';

//                          component                           //
export default function ChatroomDetail() {

//                          state                           //
    const { loginUserId } = useUserStore();
    const { roomId, resetRoomId } = useChatStore();

    const [cookies] = useCookies();

    const [roomname, setRoomName] = useState<string>('');
    const [opponentId, setOpponentId] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessageList[]>([]);

//                          function                            //
    const navigator = useNavigate();

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
        setOpponentId(loginUserId === customerId ? designerId : customerId);
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
        setMessages(chatMessageList);
    
    };

    const deleteChatroomResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NB' ? '존재하지 않는 방입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        alert(message);
        return;
    }

    alert('삭제되었습니다.');
    resetRoomId();
};

//                          event handler                           //
    const onChatExitClickHandler = () => resetRoomId();

    const onMessageSendHandler = () => {
        if (newMessage.trim() !== '') {
            const newMessageContainer = { chatroomId: Number(roomId), senderId: loginUserId, message: newMessage };
            socket.emit('senderMessage', newMessageContainer);
            setNewMessage('');
        }
    };

    let flag = false;

    const onDeleteButtonClickHandler = () => {
        if (!roomId) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteChatroomRequest(roomId, cookies.accessToken)
            .then(deleteChatroomResponse)
    };

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onMessageSendHandler();
    };

//                          effect                          //
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
        getChatroomRequest(roomId, cookies.accessToken)
            .then(getChatroomResponse);
    }, [cookies.accessToken, roomId]);

//                          render                          //
    return (
    <div className='chat-room-container'>
        <div className='chat-room-header'>
            <div>{roomname}</div>
        </div>
        <div className='chat-room-subheader'>
            <div className='opponent-id'>{opponentId}</div>
            <div className='button-wrap'>
                <button className='delete-button' onClick={onDeleteButtonClickHandler}>
                    <svg className="delete-svgIcon" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                </button>
                <button className='out-button' onClick={onChatExitClickHandler}>
                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                    <div className='text'>나가기</div>
                </button>
            </div>
        </div>
        <div className="chat-room-messages">
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
                onKeyDown={onPasswordKeydownHandler}
            />
            <button className='send-button' onClick={onMessageSendHandler}>전송</button>
        </div>
    </div>
    );
}
