export interface RegisterRequestDto {
    userName: string;
    email: string;
    password: string;
};

export interface RegisterResponceDto {
    userName: string;
    email: string;
    //something else
};

export interface LoginDTO {
    password: string;
    email: string;
}

export interface RefreshTokenDTO {
    refreshToken: string;
}