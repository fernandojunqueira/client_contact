import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import AppError from "../../errors/AppError"
import { IClientSession } from "../../interface/session"

const createSessionService = async ({email,password}:IClientSession):Promise<string> => {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.findOneBy({email: email})
    
    if(!client){
        throw new AppError('Wrong email/password', 403)
    }
    const passwordMatch = await compare(password,client.password)

    if(!passwordMatch){
        throw new AppError('Wrong email/password', 403)
    }
   
    const token = jwt.sign(
        {
        },
        process.env.SECRET_KEY!,
        {   
            subject: client.id,
            expiresIn: "24h"
        }
    )

    return token
    
}

export default createSessionService