import { IClientResponse } from "../../interface/client"
import { clientRepository } from "../../repositories"
import { listClient } from "../../serializers/serializers"

export const listClientService = async ():Promise<IClientResponse[] | undefined> => {

    const clients = await clientRepository.find({
        relations: {
            contacts:true
        }
    })

    const clientsResponse = await listClient.validate(clients,{stripUnknown:true})

    return clientsResponse

}