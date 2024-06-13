import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
// import { createChatRoom } from 'src/apis/chat'; // 실제 API 호출 함수
// import { CHAT_ROOM_DETAIL_ABSOLUTE_PATH } from 'src/constant';
// import './style.css';

// const ChatRoomCreator: React.FC = () => {
//     const { designerId } = useParams<{ designerId: string }>();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//     if (!designerId) {
//         setError('디자이너 ID가 필요합니다.');
//     return;
//     }

//     setLoading(true);
//     createChatRoom(designerId)
//         .then((roomId) => {
//         navigate(CHAT_ROOM_DETAIL_ABSOLUTE_PATH(roomId));
//     })
//     .catch((err) => {
//         setError('채팅방 생성에 실패했습니다.');
//         setLoading(false);
//     });
// }, [designerId, navigate]);

//     if (loading) return <div>로딩 중...</div>;
//     if (error) return <div>{error}</div>;

//     return null;
// };

// export default ChatRoomCreator;
