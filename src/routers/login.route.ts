import { Router } from "express";
import { createSessionController } from "../controllers/controllers";

const loginRoutes = Router()

loginRoutes.post("",createSessionController)

export default loginRoutes