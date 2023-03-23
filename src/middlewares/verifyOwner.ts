import { Request, Response ,NextFunction } from "express";

export const verifyOwnerMiddlewares = (request:Request,response:Response,next:NextFunction) => {
    const {uuid} = request.client
    const {id} = request.params 
    if(uuid !== id){
        return response.status(403).json({message:"Missing permission"})
    }

    next()
}