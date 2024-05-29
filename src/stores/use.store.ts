import { create } from "zustand";

interface UserStore {
  loginUserId: string;
  setLoginUserId: (loginUserId: string) => void;
  loginUserRole: string;
  setloginUserRole: (loginUserRole: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  loginUserId: "",
  setLoginUserId: (loginUserId: string) =>
    set((state) => ({ ...state, loginUserId })),
  loginUserRole: "",
  setloginUserRole: (loginUserRole: string) =>
    set((state) => ({ ...state, loginUserRole })),
}));

export default useUserStore;