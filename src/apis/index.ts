import { AxiosResponse } from "axios";
<<<<<<< HEAD
import ResponseDto from "./reponse.dto";



// function: Request 처리 함수 
export const requestHandler = <T>(response: AxiosResponse<T, any>) => {
        const responseBody = response.data;
        return responseBody;
}

// function: Request Error 처리 함수
export const requestErrorHandler = (error: any) => {
        const responseBody = error.response?.data;
        if (!responseBody) return null;
        return responseBody as ResponseDto;
}

// function: Authorization Bearer 헤더
export const bearerAuthorization = (accessToken:string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } })
=======
import ResponseDto from "./response.dto";

// function: Request 처리 함수
export const requestHandler = <T>(response: AxiosResponse<T, any>) => {
  const responseBody = response.data;
  return responseBody;
};

// function: Request Error 처리 함수
export const requestErrorHandler = (error: any) => {
  const responseBody = error.response?.data;
  if (!responseBody) return null;
  return responseBody as ResponseDto;
};

// function: Authorization Bearer 헤더
export const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}`}})

>>>>>>> a30791c0894ceabc5a34115eb47dde213107301d
