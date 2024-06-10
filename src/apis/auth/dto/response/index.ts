import ResponseDto from "src/apis/response.dto";

// description: 로그인 Response Body DTO
export interface SignInResponseDto extends ResponseDto {
  accessToken : string;
  expires : number;
}

export interface IdFoundResponseDto extends ResponseDto {
  userId : string;
}

export interface CustomerInfoResponseDto extends ResponseDto {
  userId: string;
  userGender?: string;
  userAge?: string;
}

export interface DesignerInfoResponseDto extends ResponseDto {
  userId: string;
  userGender?: string;
  userAge?: string;
  userCompanyName?: string;
  userImage?: string;
}

export interface CUSTOMERDELETERESPONSEDTO extends ResponseDto {
  userId : string;
  userPassword : string;
  userEmail : string;
  authNumber : string;
  userGender : string;
  userAge : string;
  joinPath: string;
}

export interface DESIGNERDELETERESPONSEDTO extends ResponseDto {
  userId : string;
  userEmail : string;
  authNumber : string;
  userGender : string;
  userAge : string;
  userCompanyName : string;
  userImage : string;
}