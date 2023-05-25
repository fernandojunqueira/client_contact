import { Router } from "express";
import clientRoutes from "./client.route";
import contactRoutes from "./contact.route";
import loginRoutes from "./login.route";

export const globalRoutes = Router();

globalRoutes.use("/client",clientRoutes);
globalRoutes.use("/contact",contactRoutes);
globalRoutes.use("/login",loginRoutes);