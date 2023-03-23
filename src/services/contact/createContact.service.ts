import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { Contact } from "../../entities/contact.entity"
import AppError from "../../errors/AppError"
import { IContactRequest, IContactResponse } from "../../interface/contact"
import { contactSchemaResponse } from "../../serializers/serializers"

const createContactService = async (payload:IContactRequest, clientId:string):Promise<IContactResponse> => {
   const contactRepo = AppDataSource.getRepository(Contact)
   const clientRepo = AppDataSource.getRepository(Client)

   const client = await clientRepo.findOneBy({id:clientId})
   const contactVerify = await contactRepo.findOneBy({email:payload.email})
   
   if(!client){
         throw new AppError("Client does not exists", 404)
      }
   
   if(contactVerify){
         throw new AppError("Contact already exists", 404)
      }
      
   let contactInstance = contactRepo.create(payload)
   
   const contact = await contactRepo.save({
      ...contactInstance,
      client: client!
   })

   const contactResponse = await contactSchemaResponse.validate(contact,{stripUnknown:true})

   return contactResponse
}

export default createContactService
