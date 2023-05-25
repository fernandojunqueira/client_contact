import AppError from "../../errors/AppError";
import { clientRepository } from "../../repositories";

export const deleteClientService = async (contactId:string):Promise<void> => {

  const client = await clientRepository.findOneBy({id:contactId});

  if(!client){
    throw new AppError("Client does not exists", 404);
  }

  await clientRepository.remove(client!);

};