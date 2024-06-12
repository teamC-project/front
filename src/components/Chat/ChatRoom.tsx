// import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import { useCookies } from 'react-cookie';
// import socket from 'src/utils/socket';
// import { getChatMessagesRequest, deleteChatMessageRequest, postChatMessageRequest } from 'src/apis/chat';
// import './style.css';

// interface ChatMessage {
//     messageId: string;
//     sender: string;
//     message: string;
//     timestamp: string;
// }

// const ChatRoom: React.FC = () => {
//     const { roomId } = useParams<{ roomId: string }>();
//     const [message, setMessage] = useState<string>('');
//     const [messages, setMessages] = useState<ChatMessage[]>([]);
//     const [cookies] = useCookies();

//     const sendMessage = () => {
//         if (message.trim() && roomId && cookies.accessToken) {
//             const requestBody = { message };
//             postChatMessageRequest(roomId, requestBody, cookies.accessToken)
//                 .then(response => {
//                     if (response && response.code === 'SU') {
//                         socket.emit('message', { roomId, sender: 'User', message, timestamp: new Date().toISOString() });
//                         setMessage('');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Failed to send chat message:', error);
//                 });
//         }
//     };

//     const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//         setMessage(event.target.value);
//     };

//     const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             sendMessage();
//         }
//     };

//     const handleDeleteMessage = (messageId: string) => {
//         if (!roomId || !cookies.accessToken) return;
//         deleteChatMessageRequest(roomId, messageId, cookies.accessToken)
//             .then(response => {
//                 if (response && response.code === 'SU') {
//                     setMessages(prevMessages => prevMessages.filter(msg => msg.messageId !== messageId));
//                 }
//             })
//             .catch(error => {
//                 console.error('Failed to delete chat message:', error);
//             });
//     };

//     useEffect(() => {
//         if (!roomId || !cookies.accessToken) return;

//         socket.connect();
//         socket.emit('joinRoom', { roomId });

//         socket.on('message', (newMessage: ChatMessage) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         getChatMessagesRequest(roomId, cookies.accessToken)
//             .then(response => {
//                 if (response && response.code === 'SU' && response.messages) {
//                     setMessages(response.messages);
//                 }
//             })
//             .catch(error => {
//                 console.error('Failed to fetch chat messages:', error);
//             });

//         return () => {
//             socket.emit('leaveRoom', { roomId });
//             socket.disconnect();
//         };
//     }, [roomId, cookies.accessToken]);

//     return (
//         <div className="chat-room-container">
//             <div className="messages">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="message">
//                         <span className="message-sender">{msg.sender}: </span>
//                         <span className="message-content">{msg.message}</span>
//                         <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
//                         <button onClick={() => handleDeleteMessage(msg.messageId)}>Delete</button>
//                     </div>
//                 ))}
//             </div>
//             <div className="input-box">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={handleInputChange}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Type your message..."
//                 />
//                 <button onClick={sendMessage} disabled={!message.trim()}>
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatRoom;

import React from 'react'

export default function ChatRoom() {
    return (
        <div>ChatRoom</div>
    )
}
