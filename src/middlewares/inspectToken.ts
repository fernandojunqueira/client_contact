import jwt from "jsonwebtoken";
import { Request, Response ,NextFunction } from "express";

export const inspectTokenMiddlewares = (request:Request,response:Response,next:NextFunction) => {
  let authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).json({message:"Missing authorization headers"});
  }

  authorization = authorization.split(" ")[1];

  return jwt.verify(authorization, process.env.SECRET_KEY!, (error,decoded:any) => {

    if(error){
      return response.status(401).json({
        message: "Invalid token"
      });
    }

    request.client = {
      uuid: decoded.sub
    };

    return next();
  });
};