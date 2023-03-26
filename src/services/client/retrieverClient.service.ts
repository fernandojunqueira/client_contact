import AppError from "../../errors/AppError"
import { IClientResponse } from "../../interface/client"
import { clientRepository } from "../../repositories"
import { clienteSchemaWithoutPassword } from "../../serializers/serializers"

export const retrieverClientService = async (clientId:string):Promise<IClientResponse> => {

    const client = await clientRepository.find({
        where: {
            id: clientId
        },
        relations: {
            contacts:true
        },
        
    })

    if(!client){
        throw new AppError("Client does not exists", 404)
    }

    const clientsResponse = await clienteSchemaWithoutPassword.validate(client[0],{stripUnknown:true})

    return clientsResponse

}