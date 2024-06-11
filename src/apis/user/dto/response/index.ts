import ResponseDto from "src/apis/response.dto";

// description: 로그인 유저 정보 불러오기 Response Body DTO //
export interface GetSignInUserResponseDto extends ResponseDto {
  userId: string;
  userRole: string;
  userGender: string;
  userAge: string;
  userCompanyName?: string;
  userImage?: string;
}

export interface GetUserInfoResponseDto extends ResponseDto {
  userId : string;
  userGender: string;
  userAge: string;
  userCompanyName: string;
  userImage: string;
  userRole: string;
}