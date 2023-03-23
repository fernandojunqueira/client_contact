import { Response , Request } from "express"
import { IClientRequest, IClientSession, IContactRequest } from "../interface"
import createClientService from "../services/client/createClient.service"
import createContactService from "../services/contact/createContact.service"
import { listClientService } from "../services/client/listClient.service"
import { retrieverClientService } from "../services/client/retrieverClient.service"
import { listContactService } from "../services/contact/listContact.service"
import { retrieverContactService } from "../services/contact/retrieverContact.service"
import createSessionService from "../services/login/createSession.service"
import { listContactsIdClientService } from "../services/client/listContactsIdClient.service"

export const createClientController = async (req: Request, res: Response) => {
    const body:IClientRequest = req.body
    const client = await createClientService(body)
    return res.status(201).json(client)
}

export const listClientController =async (req:Request,res:Response) => {
    const clients = await listClientService()
    return res.status(200).json(clients)
}

export const retrieverClientController =async (req:Request,res:Response) => {
    const clientId:string = req.params.id
    const clients = await retrieverClientService(clientId)
    return res.status(200).json(clients)
}

export const createContactController = async (req: Request, res: Response) => {
    const body:IContactRequest = req.body
    const clientId:string = req.params.id
    const contact = await createContactService(body,clientId)
    return res.status(201).json(contact)
}

export const listContactController =async (req:Request,res:Response) => {
    const contacts = await listContactService()
    return res.status(200).json(contacts)
}

export const retrieverContactController =async (req:Request,res:Response) => {
    const contactId:string = req.params.id
    const contact = await retrieverContactService(contactId)
    return res.status(200).json(contact)
}

export const createSessionController = async (req:Request,res:Response) => {
    const sessionData:IClientSession = req.body
    const token = await createSessionService(sessionData)
    return res.json({token})
}

export const listContactsIdClientController =async (req:Request,res:Response) => {
    const contactId:string = req.params.id
    const contacts = await listContactsIdClientService(contactId)
    return res.status(200).json(contacts)
}
