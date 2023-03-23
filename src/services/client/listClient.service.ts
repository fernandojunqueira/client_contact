import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { IClientResponse } from "../../interface"
import { listClient } from "../../serializers/serializers"

export const listClientService = async ():Promise<IClientResponse[] | undefined> => {
    const clientRepo = AppDataSource.getRepository(Client)
    const clients = await clientRepo.find({
        relations: {
            contacts:true
        }
    })

    const clientsResponse = await listClient.validate(clients,{stripUnknown:true})

    return clientsResponse

}