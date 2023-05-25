import { IContactResponse } from "../../interface/contact";
import { contactRepository } from "../../repositories";
import { listContact } from "../../serializers/serializers";

export const listContactService = async ():Promise<IContactResponse[] | undefined> => {

  const contacts = await contactRepository.find();

  const clientsResponse = await listContact.validate(contacts,{stripUnknown:true});

  return clientsResponse;

};