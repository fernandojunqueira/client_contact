import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, ManyToOne } from "typeorm";
import { Client } from "./client.entity";

@Entity("contact")
export class Contact{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phone: string

    @Column()
    email: string
    
    @CreateDateColumn()
    registrationDate: Date

    @ManyToOne(() => Client, (client) => client.contacts,{onDelete:"CASCADE"})
    client: Client

}