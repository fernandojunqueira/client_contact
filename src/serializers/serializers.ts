import * as yup from "yup";
import { Schema} from "yup";
import { IContactRequest, IContactResponse } from "../interface/contact";
import { IClientRequest, IClientResponse, IClientResponseCreate } from "../interface/client";
import { IClientSession } from "../interface/session";


export const contactSchemaResponse: Schema<IContactResponse> = yup.object().shape({
  id:yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  registrationDate: yup.date().required()
});

export const clientSchema: Schema<IClientRequest> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const clienteSchemaWithoutPassword: Schema<IClientResponse> = yup.object().shape({
  id:yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  registrationDate: yup.date().required(),
  contacts: yup.array(contactSchemaResponse).required()
});

export const clienteSchemaResponseCreate: Schema<IClientResponseCreate> = yup.object().shape({
  id:yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  registrationDate: yup.date().required(),
});

export const contactSchema: Schema<IContactRequest> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
});

export const sessionSchema: Schema<IClientSession> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});


export const listClient = yup.array(clienteSchemaWithoutPassword);
export const listContact = yup.array(contactSchemaResponse);