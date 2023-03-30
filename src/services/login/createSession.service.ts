import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
import AppError from "../../errors/AppError"
import { IClientSession, iLoginResponse } from "../../interface/session"
import { clientRepository } from "../../repositories"

const createSessionService = async ({email,password}:IClientSession):Promise<iLoginResponse> => {

    const client = await clientRepository.findOneBy({email: email})
    
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

    return {token:token, id:client.id}
    
}

export default createSessionService