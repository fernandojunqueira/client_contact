import { compare, hashSync } from "bcryptjs"
import AppError from "../../errors/AppError"
import { IClientRequest, IClientResponseCreate } from "../../interface/client"
import { clientRepository } from "../../repositories"
import { clienteSchemaResponseCreate } from "../../serializers/serializers"

export const updateClientService = async (clientId:string, dataToBeUpdated:IClientRequest):Promise<IClientResponseCreate> => {

    const client = await clientRepository.findOneBy({id:clientId})

    if(!client){
        throw new AppError("Client does not exists", 404)
     }

    dataToBeUpdated.password?
    (dataToBeUpdated.password = hashSync(dataToBeUpdated.password, 10))
    :
    (dataToBeUpdated.password = client.password)
    
    const updatedContact = await clientRepository.save({...client, ...dataToBeUpdated})

    const clientResponse = await clienteSchemaResponseCreate.validate(updatedContact,{stripUnknown:true})

    return clientResponse

}