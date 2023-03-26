import AppError from "../../errors/AppError"
import { IContactRequest, IContactResponse } from "../../interface/contact"
import { clientRepository, contactRepository } from "../../repositories"
import { contactSchemaResponse } from "../../serializers/serializers"

const createContactService = async (payload:IContactRequest, clientId:string):Promise<IContactResponse> => {

   const client = await clientRepository.findOneBy({id:clientId})
   const contactVerify = await contactRepository.findOneBy({email:payload.email})
   
   if(!client){
         throw new AppError("Client does not exists", 404)
      }
   
   if(contactVerify){
         throw new AppError("Contact already exists", 409)
      }
      
   let contactInstance = contactRepository.create(payload)
   
   const contact = await contactRepository.save({
      ...contactInstance,
      client: client!
   })

   const contactResponse = await contactSchemaResponse.validate(contact,{stripUnknown:true})

   return contactResponse
}

export default createContactService
