import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { clienteSchemaWithoutPassword, listClient } from "../../serializers/serializers"

export const retrieverClientService =async (clientId:string) => {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.findOneBy({id:clientId})

    const clientsResponse = await clienteSchemaWithoutPassword.validate(client,{stripUnknown:true})

    return clientsResponse

}