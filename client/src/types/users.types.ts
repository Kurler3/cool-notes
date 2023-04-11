
export interface IUser {
    username: string;
    email: string;
};

export interface ISignUpCredentials extends ISignInCredentials {
    email: string;
};

export interface ISignInCredentials {
    username: string;
    password: string;
}