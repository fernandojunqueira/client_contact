import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { Contact } from "../entities/contact.entity";

export const clientRepository = AppDataSource.getRepository(Client)
export const contactRepository = AppDataSource.getRepository(Contact)
