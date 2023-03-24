import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import AppError from "../../errors/AppError"
import { IContactResponse, IContactUpdate } from "../../interface/contact"
import { contactSchemaResponse } from "../../serializers/serializers"

export const updateContactService = async (contactId:string, dataToBeUpdated:IContactUpdate, clientId:string):Promise<IContactResponse> => {
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



    const updatedContact = await contactRepo.save({...dataContact, ...dataToBeUpdated})

    const contactResponse = await contactSchemaResponse.validate(updatedContact,{stripUnknown:true})

    return contactResponse

}