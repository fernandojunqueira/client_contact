import { Response , Request } from "express"
import createSessionService from "../../services/login/createSession.service"
import { IClientSession } from "../../interface/session"


export const createSessionController = async (req:Request,res:Response) => {
    const sessionData:IClientSession = req.body
    const token = await createSessionService(sessionData)
    return res.json({token})
}