import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import AppError from "../../errors/AppError"

export const deleteClientService = async (contactId:string):Promise<void> => {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.findOneBy({id:contactId})

    if(!client){
        throw new AppError("Client does not exists", 404)
    }

    await clientRepo.remove(client!)

}