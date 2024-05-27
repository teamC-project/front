<<<<<<< HEAD
import ResponseDto from "src/apis/reponse.dto";

export interface GetSignInUserResponseDto extends ResponseDto {
    userId: string;
    userRole: string;
=======
import ResponseDto from "src/apis/response.dto";

// description: 로그인 유저 정보 불러오기 Response Body DTO //
export interface GetSignInUserResponseDto extends ResponseDto {
  userId: string;
  userRole: string;
>>>>>>> a30791c0894ceabc5a34115eb47dde213107301d
}