// description: 로그인 Requset Body DTO
export interface SignInRequestDto {
  userId : string;
  userPassword : string;
}

// description: 아이디 중복 확인 Requset Body DTO
export interface IdCheckRequestDto {
  userId : string;
}

// description: 이메일 인증 Requset Body DTO
export interface EmailAuthRequestDto {
  userEmail : string;
}

// description: 이메일 인증 확인 Requset Body DTO
export interface EmailAuthCheckRequestDto {
  userEmail : string;
  authNumber : string;
}

// description: 회원가입 Requset Body DTO
export interface SignUpRequestDto {
  userId : string;
  userPassword : string;
  userEmail : string;
  authNumber : string;
  userAge : string;
  userGender : string;
  userCompanyName? : string;
  userImage? : string;
}
