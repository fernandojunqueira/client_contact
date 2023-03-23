import { Response , Request } from "express"
import { IClientSession } from "../../interface"
import createSessionService from "../../services/login/createSession.service"


export const createSessionController = async (req:Request,res:Response) => {
    const sessionData:IClientSession = req.body
    const token = await createSessionService(sessionData)
    return res.json({token})
}