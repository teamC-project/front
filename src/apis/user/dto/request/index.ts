export interface InfoUpdate {
  userId : string;
  userGender: string;
  userAge: string;
  userCompanyName?: string;
  userImage?: string;
}

// description: 비밀번호 재수정 유저 인증 Requset Body DTO
export interface PasswordChangeRequestDto {
  userPassword: string;
}

// description: 비밀번호 재설정 Requset Body DTO
export interface ChangePasswordRequestDto {
  userPassword : string;
}