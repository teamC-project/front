export interface InfoUpdate {
    userId : string;
    userGender: string;
    userAge: string;
    userCompanyName?: string;
    userImage?: string;
}

export interface ChangePasswordRequestDto {
    userPassword : string;
}