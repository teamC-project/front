import ResponseDto from "src/apis/reponse.dto";

export interface GetSignInUserResponseDto extends ResponseDto {
    userId: string;
    userRole: string;
}