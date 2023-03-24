import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import AppError from "../../errors/AppError"

export const deleteContactService = async (contactId:string, clientId:string):Promise<void> => {
    const contactRepo = AppDataSource.getRepository(Contact)

    const contact = await contactRepo.find({
        relations:{
            client:true
        },
        where:{
            id:contactId
        }
    })

    if(!contact.length){
        throw new AppError("Contact does not exists", 404)
    }

    const {client, ...dataContact} = contact[0]
    
    if (client.id !== clientId){
        throw new AppError("Missing permission",403)
    }

    await contactRepo.remove(contact!)

}