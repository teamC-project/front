export interface SignInRequestDto {
    userId : string;
    userPassword : string;
}

export interface IdCheckRequestDto {
    userId : string;
}

export interface FoundPasswordIdCheckRequestDto {
    userId : string;
}

export interface EmailAuthRequestDto {
    userEmail : string;
}

export interface EmailAuthCheckRequestDto {
    userEmail : string;
    authNumber : string;
}

export interface SignUpCustomerRequestDto {
    userId : string;
    userPassword : string;
    userEmail : string;
    authNumber : string;
    userGender : string;
    userAge : string;
    joinPath: string;
    snsId?: string;
}

export interface SignUpDesignerRequestDto {
    userId : string;
    userPassword : string;
    userEmail : string;
    authNumber : string;
    userGender : string;
    userAge : string;
    userCompanyName : string;
    userImage : string;
    joinPath: string;
    snsId?: string;
}

export interface FoundIdCheckRequestDto {
    userEmail : string;
    authNumber : string;
}

export interface PasswordResetRequestDto {
    userId : string;
    userEmail : string;
    authNumber : string;
}

export interface SetUpPasswordRequestDto {
    userId: string;
    userPassword : string;
}