import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import AppError from "../../errors/AppError"
import { clienteSchemaWithoutPassword } from "../../serializers/serializers"

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

    if(!client){
        throw new AppError("Client does not exists", 404)
    }

    const clientsResponse = await clienteSchemaWithoutPassword.validate(client[0],{stripUnknown:true})

    return clientsResponse

}