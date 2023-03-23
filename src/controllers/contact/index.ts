import { Response , Request } from "express"
import createContactService from "../../services/contact/createContact.service"
import { listContactService } from "../../services/contact/listContact.service"
import { retrieverContactService } from "../../services/contact/retrieverContact.service"
import { updateContactService } from "../../services/contact/updateContact.service"
import { deleteContactService } from "../../services/contact/deleteContact.service"
import { IContactRequest, IContactUpdate } from "../../interface/contact"


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


export const updateContactController =async (req:Request,res:Response) => {
    const contactId:string = req.params.id
    const dataToBeUpdated:IContactUpdate = req.body
    const contacts = await updateContactService(contactId, dataToBeUpdated)
    return res.status(200).json(contacts)
}

export const deleteContactController =async (req:Request,res:Response) => {
    const contactId:string = req.params.id
    const contacts = await deleteContactService(contactId)
    return res.status(204).json(contacts)
}