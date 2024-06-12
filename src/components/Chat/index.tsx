import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import socket from 'src/utils/socket';
import './style.css';

interface ChatMessage {
    sender: string;
    message: string;
    timestamp: string;
}

//                    component                    //
const Chat: React.FC = () => {

    //                    state                    //
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

        
    //                    function                    //
    const sendMessage = () => {    // 메시지가 공백이 아니면 소켓을 통해 서버로 메시지를 전송하고, message 상태를 초기화함
        if (message.trim()) {
            socket.emit('message', { sender: 'User', message, timestamp: new Date().toISOString() });
            setMessage('');
        }
    };

    //                    event handler                    //
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        sendMessage();
        }
    };

    //                    effect                    //
    useEffect(() => {
        socket.connect();
    
        socket.on('message', (newMessage: ChatMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    
     //                    render                    //
    return (
        <div className="chat-container">
            <div className="messages">
            {messages.map((msg, index) => (
                <div key={index} className="message">
                <span className="message-sender">{msg.sender}: </span>
                <span className="message-content">{msg.message}</span>
                <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
            ))}
            </div>
            <div className="input-box">
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="메세지 입력..."
            />
            <button onClick={sendMessage} disabled={!message.trim()}>
                Send
            </button>
            </div>
        </div>
    );
};
    
export default Chat;