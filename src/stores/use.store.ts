import { create } from "zustand";

interface UserStore {
  // accessToken: string;
  // setAccessToken: (accessToken: string) => void;
  loginUserId: string;
  setLoginUserId: (loginUserId: string) => void;
  loginUserRole: string;
  setLoginUserRole: (loginUserRole: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  // accessToken: "",
  // setAccessToken: (accessToken: string) => set((state) => ({...state, accessToken})),
  loginUserId: "",
  setLoginUserId: (loginUserId: string) =>
    set((state) => ({ ...state, loginUserId })),
  loginUserRole: "",
  setLoginUserRole: (loginUserRole: string) =>
    set((state) => ({ ...state, loginUserRole })),
}));

export default useUserStore;