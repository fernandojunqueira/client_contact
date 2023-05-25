import AppError from "../../errors/AppError";
import { IContactResponse } from "../../interface/contact";
import { contactRepository } from "../../repositories";
import { contactSchemaResponse } from "../../serializers/serializers";

export const retrieverContactService = async (contactId:string):Promise<IContactResponse> => {

  const contact = await contactRepository.findOneBy({id:contactId});

  if(!contact){
    throw new AppError("Contact does not exists", 404);
  }

  const contactResponse = await contactSchemaResponse.validate(contact,{stripUnknown:true});

  return contactResponse;

};