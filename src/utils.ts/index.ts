import { FindOperator, Repository } from "typeorm";
import { Client } from "../entities/client.entity";
import { Contact } from "../entities/contact.entity";
import AppError from "../errors/AppError";

export const valueToLookFor = async (
    repository: Repository<Client> | Repository<Contact> , 
    key: string , 
    valueToLookFor: string
    ): Promise<Client | Contact |  null> => {
        
        const valueToSearch = 
        key === "email" 
        ? 
        (
          await repository.findOneBy({email: valueToLookFor})
        )
        :
        (
          await repository.findOneBy({id: valueToLookFor})
        )

       return await valueToVerify(valueToSearch, key)
        
    }

export const valueToVerify =async (
    value: Client | Contact | null,
    key:string
):Promise<Client | Contact | null> => {
    if(key == "email"){
        if(!!value){
          throw new AppError("Email already registered", 409)
        }
    }else{
      if(!value){
        throw new AppError("Client does not exists", 404)
      }
    }
    return value

}