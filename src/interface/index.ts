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
}

export interface IContactRequest{
    firstName: string
    lastName: string
    phone: string
    email: string
}

export interface IContactResponse{
    firstName: string
    lastName: string
    phone: string
    email: string
}

export interface IClientSession{
    email: string
    password: string

}