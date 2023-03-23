import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.entity"
import { IClientRequest } from "../../interface"
import { clienteSchemaWithoutPassword } from "../../serializers/serializers"

const createClientService = async (payload:IClientRequest) => {
   const clientRepo = AppDataSource.getRepository(Client)
  
//    const categoryVerify = await categoryRepo.findOneBy({name: payload.name})

//    if(categoryVerify){
//       throw new AppError("Category already exists", 409)
//   }

   let client = clientRepo.create(payload)
  
   await clientRepo.save(client)

   const clientResponse = await clienteSchemaWithoutPassword.validate(client,{stripUnknown:true})
   
   return clientResponse
}

export default createClientService