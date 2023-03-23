import { Request, Response ,NextFunction } from "express";

export const verifyOwnerMiddlewares = (request:Request,response:Response,next:NextFunction) => {
    const tokenId:any = request.client
    console.log(tokenId)
    const {id} = request.params 
    if(tokenId.uuid !== id){
        return response.status(403).json({message:"Missing permission"})
    }

    next()
}