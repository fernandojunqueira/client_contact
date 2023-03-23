import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { listClient } from "../../serializers/serializers"

export const listContactService =async () => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contacts = await contactRepo.find()

    const clientsResponse = await listClient.validate(contacts,{stripUnknown:true})

    return clientsResponse

}