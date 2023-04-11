import {
    object, string
} from "zod";

const signUpSchema = object({
    body: object({
        username: string({required_error: "Username is required!"}),
        email: string({
            required_error: "Email is required!"
        }).email("This is not a valid email!"),
        password: string({
            required_error: "Password is required!"
        }).min(6, {message: "Password must contain at least 6 characters!"}), 
    }),
});

export default signUpSchema;