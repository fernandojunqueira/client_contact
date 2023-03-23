import { compare } from "bcryptjs"
// import { AppError } from "../../errors"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { IClientSession } from "../../interface"

const createSessionService = async ({email,password}:IClientSession):Promise<string> => {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.findOneBy({email: email})
    
    if(!client){
        // throw new AppError('Wrong email/password', 403)
        return 'Wrong email/password'
    }
    const passwordMatch = await compare(password,client.password)

    if(!passwordMatch){
        // throw new AppError('Wrong email/password', 403)
        return 'Wrong email/password'
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