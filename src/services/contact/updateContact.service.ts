import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import AppError from "../../errors/AppError"
import { IContactResponse, IContactUpdate } from "../../interface"
import { contactSchemaResponse } from "../../serializers/serializers"

export const updateContactService = async (contactId:string, dataToBeUpdated:IContactUpdate):Promise<IContactResponse> => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepo.findOneBy({id:contactId})

    if(!contact){
        throw new AppError("Contact does not exists", 404)
     }

    const updatedContact = await contactRepo.save({...contact, ...dataToBeUpdated})

    const contactResponse = await contactSchemaResponse.validate(updatedContact,{stripUnknown:true})

    return contactResponse

}