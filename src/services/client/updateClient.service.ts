import AppError from "../../errors/AppError"
import { IClientResponseCreate } from "../../interface/client"
import { IContactUpdate } from "../../interface/contact"
import { clientRepository } from "../../repositories"
import { clienteSchemaResponseCreate } from "../../serializers/serializers"

export const updateClientService = async (clientId:string, dataToBeUpdated:IContactUpdate):Promise<IClientResponseCreate> => {

    const client = await clientRepository.findOneBy({id:clientId})

    if(!client){
        throw new AppError("Client does not exists", 404)
     }

    const updatedContact = await clientRepository.save({...client, ...dataToBeUpdated})

    const clientResponse = await clienteSchemaResponseCreate.validate(updatedContact,{stripUnknown:true})

    return clientResponse

}