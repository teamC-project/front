import ResponseDto from "src/apis/response.dto";

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

export interface CustomerInfoResponseDto extends ResponseDto {
    userId: string;
    userGender: string;
    userAge: string;
}

export interface DesignerInfoResponseDto extends ResponseDto {
    userId: string;
    userGender: string;
    userAge: string;
    userCompanyName: string;
    userImage: string;
}