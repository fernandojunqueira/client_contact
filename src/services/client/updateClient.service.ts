import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import AppError from "../../errors/AppError"
import { IClientResponseCreate, IContactUpdate } from "../../interface"
import { clienteSchemaResponseCreate } from "../../serializers/serializers"

export const updateClientService = async (clientId:string, dataToBeUpdated:IContactUpdate):Promise<IClientResponseCreate> => {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.findOneBy({id:clientId})

    if(!client){
        throw new AppError("Client does not exists", 404)
     }

    const updatedContact = await clientRepo.save({...client, ...dataToBeUpdated})

    const clientResponse = await clienteSchemaResponseCreate.validate(updatedContact,{stripUnknown:true})

    return clientResponse

}