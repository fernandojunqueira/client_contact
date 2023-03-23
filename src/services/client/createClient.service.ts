import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import AppError from "../../errors/AppError"
import { IClientRequest, IClientResponseCreate } from "../../interface/client"
import { clienteSchemaResponseCreate } from "../../serializers/serializers"

const createClientService = async (payload:IClientRequest):Promise<IClientResponseCreate> => {
   const clientRepo = AppDataSource.getRepository(Client)
  
   const clientVerify = await clientRepo.findOneBy({email: payload.email})

   if(clientVerify){
      throw new AppError("Email already registered", 409)
  }

   let client = clientRepo.create(payload)
  
   await clientRepo.save(client)

   const clientResponse = await clienteSchemaResponseCreate.validate(client,{stripUnknown:true})
   
   return clientResponse
}

export default createClientService