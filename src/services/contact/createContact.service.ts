import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { Contact } from "../../entities/contact.entity"
import { IContactRequest } from "../../interface"
import { contactSchemaResponse } from "../../serializers/serializers"

const createContactService = async (payload:IContactRequest, clientId:string) => {
   const contactRepo = AppDataSource.getRepository(Contact)
   const clientRepo = AppDataSource.getRepository(Client)

   const client = await clientRepo.findOneBy({id:clientId})
   console.log(client)
   //    const categoryVerify = await categoryRepo.findOneBy({name: payload.name})
   
   //    if(categoryVerify){
      //       throw new AppError("Category already exists", 409)
      //   }
      
   let contactInstance = contactRepo.create(payload)
   
   const contact = await contactRepo.save({
      ...contactInstance,
      client: client!
   })

   const contactResponse = await contactSchemaResponse.validate(contact,{stripUnknown:true})

   return contactResponse
}

export default createContactService
