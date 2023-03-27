import AppError from "../../errors/AppError"
import { IClientRequest, IClientResponseCreate } from "../../interface/client"
import { clientRepository } from "../../repositories"
import { clienteSchemaResponseCreate } from "../../serializers/serializers"

const createClientService = async (payload:IClientRequest):Promise<IClientResponseCreate> => {
  
   const clientVerify = await clientRepository.findOneBy({email: payload.email})
   
   if(clientVerify){
      throw new AppError("Email already registered", 409)
  }

   let client = clientRepository.create(payload)
  
   await clientRepository.save(client)

   const clientResponse = await clienteSchemaResponseCreate.validate(client,{stripUnknown:true})
   
   return clientResponse
}

export default createClientService