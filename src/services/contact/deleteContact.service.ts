import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import AppError from "../../errors/AppError"

export const deleteContactService = async (contactId:string) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepo.findOneBy({id:contactId})
   
    if(!contact){
          throw new AppError("Contact does not exists", 404)
       }
    await contactRepo.remove(contact!)

}