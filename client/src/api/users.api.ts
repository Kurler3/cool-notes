import { ISignUpCredentials, IUser, ISignInCredentials } from "../types/users.types";
import axios from "axios";


export class UsersApi {

    static BASE_URL = "http://localhost:5000/api/users";

    // GET LOGGED IN USER
    static async getLoggedInUser():Promise<IUser> {
        const result = await axios.get(
            `${this.BASE_URL}/getAuthenticatedUser`
        );

        return result.data;
    }

    // SIGN UP
    static async signUp(
        signUpInput: ISignUpCredentials
    ): Promise<IUser> {

        const result = await axios.post(
            `${this.BASE_URL}/sign-up`,
            signUpInput,
        );

        return result.data;
    }

    // LOGIN
    static async login(
        signInInput: ISignInCredentials,
    ): Promise<IUser>{

        const result = await axios.post(
            `${this.BASE_URL}/login`,
            signInInput,
        );

        return result.data;
    }


    // LOGOUT
    static async logout() {
        const result = await axios.post(
            `${this.BASE_URL}/logout`,
        );

        return result.data;
    }

}
