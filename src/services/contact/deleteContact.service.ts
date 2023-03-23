import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { Contact } from "../../entities/contact.entity"
import { clienteSchemaWithoutPassword, contactSchemaResponse, listClient } from "../../serializers/serializers"

export const deleteContactService = async (contactId:string) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepo.findOneBy({id:contactId})

    await contactRepo.remove(contact!)

}