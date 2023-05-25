import { Router } from "express";
import { createSessionController } from "../controllers/session";
import { sessionSchema } from "../serializers/serializers";
import ensureDataIsValidMiddleware from "../middlewares/ensureValidatedDate";

const loginRoutes = Router();

loginRoutes.post("",ensureDataIsValidMiddleware(sessionSchema),createSessionController);

export default loginRoutes;