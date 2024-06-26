import { create } from "zustand";

interface SnsStore {
    snsId: string;
    joinPath: string;
    setValue: (snsId: string, joinPath: string) => void;
}

const useSnsStore = create<SnsStore>(set => ({
    snsId: '',
    joinPath: '',
    setValue: (snsId: string, joinPath: string) => set(state => ({ ...state, snsId, joinPath }))
}));

export default useSnsStore;