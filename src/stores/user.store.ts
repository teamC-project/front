import { create } from "zustand";

interface UserStroe {
  loginUserId: string,
  setLoginUserId: (loginUserId: string) => void,
  loginUserRole: string,
  setLoginUserRole: (loginUserRole: string) => void,
}

const UseUserStore = create<UserStroe>(set => ({
  loginUserId: '',
  setLoginUserId: (loginUserId: string) => set(state => ({ ...state, loginUserId })),
  loginUserRole: '',
  setLoginUserRole: (loginUserRole: string) => set(state => ({ ...state, loginUserRole }))
}));

export default UseUserStore;