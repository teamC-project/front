export interface InfoUpdate {
  userId : string;
  userGender: string;
  userAge: string;
  userCompanyName?: string;
  userImage?: string;
}

// description: 비밀번호 재설정 Requset Body DTO
export interface ChangePasswordRequestDto {
  userPassword : string;
}