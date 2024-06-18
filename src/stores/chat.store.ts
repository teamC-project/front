import { create } from "zustand";

interface ChatStore {
  roomId: number | null;
  setRoomId: (roomId: number) => void;
  resetRoomId: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  roomId: null,
  setRoomId: (roomId: number) => set(state => ({ ...state, roomId })),
  resetRoomId: ()  => set(state => ({ ...state, roomId: null })),
}));

export default useChatStore;