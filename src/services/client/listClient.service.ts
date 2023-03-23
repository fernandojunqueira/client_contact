import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { listClient } from "../../serializers/serializers"

export const listClientService =async () => {
    const clientRepo = AppDataSource.getRepository(Client)
    const clients = await clientRepo.find()

    const clientsResponse = await listClient.validate(clients,{stripUnknown:true})

    return clientsResponse

}