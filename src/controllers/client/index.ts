import { Response , Request } from "express"
import createClientService from "../../services/client/createClient.service"
import { listClientService } from "../../services/client/listClient.service"
import { retrieverClientService } from "../../services/client/retrieverClient.service"
import { deleteClientService } from "../../services/client/deleteClient.service"
import { updateClientService } from "../../services/client/updateClient.service"
import { IClientRequest } from "../../interface/client"
import { IContactUpdate } from "../../interface/contact"

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

export const deleteClientController =async (req:Request,res:Response) => {
    const clientId:string = req.params.id
    const clients = await deleteClientService(clientId)
    return res.status(204).json(clients)
}

export const updateClientController =async (req:Request,res:Response) => {
    const clientId:string = req.params.id
    const dataToBeUpdated:IClientRequest = req.body
    const contacts = await updateClientService(clientId, dataToBeUpdated)
    return res.status(200).json(contacts)
}