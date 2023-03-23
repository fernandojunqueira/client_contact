import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import AppError from "../../errors/AppError"
import { IContactResponse } from "../../interface"
import { contactSchemaResponse } from "../../serializers/serializers"

export const retrieverContactService = async (contactId:string):Promise<IContactResponse> => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepo.findOneBy({id:contactId})
   
    if(!contact){
          throw new AppError("Contact does not exists", 404)
       }

    const contactResponse = await contactSchemaResponse.validate(contact,{stripUnknown:true})

    return contactResponse

}