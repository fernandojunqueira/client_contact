import { getRounds, hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn ,BeforeInsert, OneToMany, BeforeUpdate } from "typeorm";
import { Contact } from "./contact.entity";

@Entity("client")
export class Client {
    @PrimaryGeneratedColumn("uuid")
      id:string;

    @Column()
      firstName: string;

    @Column()
      lastName: string;

    @Column()
      phone: string;

    @Column()
      email: string;

    @Column()
      password: string;

    @CreateDateColumn()
      registrationDate: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
      const isEncrypted = getRounds(this.password);

      if (!isEncrypted) this.password = hashSync(this.password, 10);
    }

    @OneToMany(() => Contact, (contact) => contact.client, {onDelete:"CASCADE"})
      contacts : Contact[];
}