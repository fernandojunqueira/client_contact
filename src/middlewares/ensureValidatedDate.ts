import { Request, Response ,NextFunction } from "express";
import { AnySchema } from "yup"

const ensureDataIsValidMiddleware = (schema: AnySchema) => async (req:Request, res: Response, next: NextFunction) => {
    try {
        
        const validatedDate = await schema.validate(req.body,{
            abortEarly: false,
            stripUnknown: true
        })

        req.body = validatedDate

        return next()

    } catch (error:any) {
        return res.status(400).json({error: error.errors})
    }
}

export default ensureDataIsValidMiddleware