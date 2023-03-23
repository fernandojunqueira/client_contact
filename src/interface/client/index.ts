import { IContactResponse } from "../contact"


export interface IClientRequest{
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
}

export interface IClientResponse{
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    registrationDate: Date
    contacts: IContactResponse[] | undefined
}

export interface IClientResponseCreate{
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    registrationDate: Date
}