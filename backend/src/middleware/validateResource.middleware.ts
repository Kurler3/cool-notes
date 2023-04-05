
import {
    Request,
    Response,
    NextFunction
} from 'express';

import {
    AnyZodObject
} from 'zod';

interface IZodError {
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
}

const validate = (
    schema: AnyZodObject
) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {
        
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        next();

    } catch (error: unknown) {

        return res.status(400).json({
            errors: (error as {errors: IZodError[]}).errors.map((zodError) => zodError.message)
        })
        
    }

}

export default validate;