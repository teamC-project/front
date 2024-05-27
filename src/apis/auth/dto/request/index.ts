export interface SignInRequestDto {
  userId: string;
  userPassword: string;
}

export interface IdCheckRequestDto {
  userId: string;
}

export interface EmailAuthRequesetDto {
  userEmail: string;
}

export interface EmailAuthCheckRequestDto {
  userEmaiil: string;
  authNumber: string;
}

export interface SignUpRequestDto {
  userId: string;
  userPassword: string;
  userEmail: string;
  authNumber: string;
}

