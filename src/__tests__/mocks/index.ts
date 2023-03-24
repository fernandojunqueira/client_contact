import { IClientRequest } from "../../interface/client";
import { IContactRequest } from "../../interface/contact";
import { IClientSession } from "../../interface/session";

export const mockedClient : IClientRequest  = {
    firstName: "client",
    lastName: "example",
    phone: "48999999999",
    email: "client@mail.com",
    password: "1234"
}

export const mockedClient2 : IClientRequest  = {
    firstName: "client2",
    lastName: "example2",
    phone: "48999999999",
    email: "client2@mail.com",
    password: "1234"
}

export const mockedContact : IContactRequest = {
    firstName: "contact",
    lastName: "example",
    phone: "48999999999",
    email: "contact@mail.com"
}

export const mockedLogin : IClientSession = {
    email: "client@mail.com",
    password: "1234"
}

export const mockedLogin2 : IClientSession = {
    email: "client2@mail.com",
    password: "1234"
}