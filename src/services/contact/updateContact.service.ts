import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { Contact } from "../../entities/contact.entity"
import { clienteSchemaWithoutPassword, contactSchemaResponse, listClient } from "../../serializers/serializers"

export const updateContactService = async (contactId:string, dataToBeUpdated:any) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepo.findOneBy({id:contactId})

    const updatedContact = await contactRepo.save({...contact, ...dataToBeUpdated})

    const contactResponse = await contactSchemaResponse.validate(updatedContact,{stripUnknown:true})

    return contactResponse

}