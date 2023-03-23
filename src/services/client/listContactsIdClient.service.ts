import { AppDataSource } from "../../data-source"
import { listContact } from "../../serializers/serializers"

export const listContactsIdClientService =async (clientId:string) => {
    const contacts = await AppDataSource.query(
        `
    SELECT 
        c2.id , c2."firstName" , c2."lastName" , c2.phone , c2.email , c2."registrationDate"
    FROM 
        contact c2 
    JOIN
        client c ON c2."clientId" = c.id 
    WHERE 
	    c.id = $1 ;`,[clientId]
    )

    const contactsResponse = await listContact.validate(contacts,{stripUnknown:true})

    return contactsResponse

}