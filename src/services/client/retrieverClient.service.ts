import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { clienteSchemaWithoutPassword, listClient } from "../../serializers/serializers"

export const retrieverClientService =async (clientId:string) => {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.find({
        where: {
            id: clientId
        },
        relations: {
            contacts:true
        },
        
    })
    console.log(client)
    const clientsResponse = await clienteSchemaWithoutPassword.validate(client[0],{stripUnknown:true})

    return clientsResponse

}