import { ChatroomList } from "src/types";
import { create } from "zustand";

interface ChatStore {
    roomId: number | null;
    rooms: ChatroomList[];
    setRoomId: (roomId: number) => void;
    setRooms: (rooms: ChatroomList[]) => void;
    resetRoomId: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    roomId: null,
    rooms: [],
    setRooms: (rooms: ChatroomList[]) => set(state => ({ ...state, rooms })),
    setRoomId: (roomId: number) => set(state => ({ ...state, roomId })),
    resetRoomId: ()  => set(state => ({ ...state, roomId: null })),
}));

export default useChatStore;