import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { IContactResponse } from "../../interface"
import { listContact } from "../../serializers/serializers"

export const listContactService = async ():Promise<IContactResponse[] | undefined> => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contacts = await contactRepo.find()

    const clientsResponse = await listContact.validate(contacts,{stripUnknown:true})

    return clientsResponse

}