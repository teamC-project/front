import ResponseDto from "src/apis/response.dto";

export interface SignInResponseDto extends ResponseDto {
    accessToken : string;
    expires : number;
}

export interface IdFoundResponseDto extends ResponseDto {
    userId : string;
}