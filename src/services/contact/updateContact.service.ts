import AppError from "../../errors/AppError"
import { IContactResponse, IContactUpdate } from "../../interface/contact"
import { contactRepository } from "../../repositories"
import { contactSchemaResponse } from "../../serializers/serializers"

export const updateContactService = async (contactId:string, dataToBeUpdated:IContactUpdate, clientId:string):Promise<IContactResponse> => {

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



    const updatedContact = await contactRepository.save({...dataContact, ...dataToBeUpdated})

    const contactResponse = await contactSchemaResponse.validate(updatedContact,{stripUnknown:true})

    return contactResponse

}