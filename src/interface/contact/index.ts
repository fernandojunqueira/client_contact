export interface IContactRequest{
    firstName: string
    lastName: string
    phone: string
    email: string
}

export interface IContactUpdate{
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
}

export interface IContactResponse{
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    registrationDate: Date
}