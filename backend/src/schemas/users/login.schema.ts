import {
    object, string
} from "zod";

const loginSchema = object({
    body: object({
        username: string({required_error: "Username is required!"}),
        password: string({
            required_error: "Password is required!"
        }), 
    }),
});

export default loginSchema;