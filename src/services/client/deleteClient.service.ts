import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { Contact } from "../../entities/contact.entity"
import { clienteSchemaWithoutPassword, contactSchemaResponse, listClient } from "../../serializers/serializers"

export const deleteClientService = async (contactId:string) => {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.findOneBy({id:contactId})

    await clientRepo.remove(client!)

}