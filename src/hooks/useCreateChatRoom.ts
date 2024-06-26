import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { useChatStore, useUserStore } from 'src/stores';
import ResponseDto from 'src/apis/response.dto';
import { getChatroomListRequest, postChatRoomRequest } from 'src/apis/chat';
import { PostChatroomRequestDto } from 'src/apis/chat/dto/request';
import { GetChatroomListResponseDto } from 'src/apis/chat/dto/response';
import { getUserRoleRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { MAIN_PATH } from 'src/constant';

//                    component                    //
export function useCreateChatRoom() {

//                    state                    //
    const [selectedDesignerId, setSelectedDesignerId] = useState<string>('');
    const [cookies] = useCookies();
    const { loginUserId, loginUserRole } = useUserStore();
    const {setRooms} = useChatStore();
    
    const [newRoomName, setNewRoomName] = useState<string>('');
    const { roomId } = useParams<string>();

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

    const getUserRoleResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
    }

        const {userId, userRole} = result as GetUserInfoResponseDto
        if (userRole !== 'ROLE_DESIGNER') {
            alert('디자이너가 아닙니다.');
            return;
        }

        const roomName = prompt('채팅방 이름을 입력하세요: ', '');
        if (roomName) {
            createRoom(roomName, userId);
        }
    };

    const createRoom = (roomName: string, designerId? : string) => {
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
            designerId: designerId ? designerId : selectedDesignerId,
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

    const isCustomer = () => {
        return loginUserRole === 'ROLE_CUSTOMER';
    };  

//                   event handler                    //
    const designerIdClickHandler = (designerId: string) => {
        const confirmCreateRoom = window.confirm('채팅방을 생성하시겠습니까?');
        if (confirmCreateRoom) {
            if (!cookies.accessToken) return;
        getUserRoleRequest(designerId, cookies.accessToken).then(getUserRoleResponse)
        }
    };

//              render              //
    return {
        designerIdClickHandler
    };
}
