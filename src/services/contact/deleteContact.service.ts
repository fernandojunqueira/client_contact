import AppError from "../../errors/AppError"
import { contactRepository } from "../../repositories"

export const deleteContactService = async (contactId:string, clientId:string):Promise<void> => {
  
    const contact = await contactRepository.find({
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

    await contactRepository.remove(contact!)

}