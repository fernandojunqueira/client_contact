import { Client } from "../../entities/client.entity"
import AppError from "../../errors/AppError"
import { clientRepository } from "../../repositories"
import { valueToLookFor } from "../../utils.ts"

export const deleteClientService = async (contactId:string):Promise<void> => {

    // const client = await valueToLookFor(clientRepository, "id", contactId)
 
    const client = await clientRepository.findOneBy({id:contactId})

    if(!client){
        throw new AppError("Client does not exists", 404)
    }

    await clientRepository.remove(client!)

}