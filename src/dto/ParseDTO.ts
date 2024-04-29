export interface ParceRequestDto {
    useGoogleSheets: boolean;
    creds: any;
};

export interface Credentials {
    privateKey: string;
    email: string;
    sheetsId: string;
}