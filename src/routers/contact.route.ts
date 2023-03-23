import { Router } from "express";
import { createContactController, listClientController, listContactController, retrieverContactController } from "../controllers/controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureValidatedDate";
import {contactSchema} from "../serializers/serializers"
import { inspectTokenMiddlewares } from "../middlewares/inspectToken";
import { verifyOwnerMiddlewares } from "../middlewares/verifyOwner";

const contactRoutes = Router()

contactRoutes.post("/:id",inspectTokenMiddlewares,verifyOwnerMiddlewares,ensureDataIsValidMiddleware(contactSchema),createContactController)
contactRoutes.get("/",inspectTokenMiddlewares,listContactController)
contactRoutes.get("/:id",inspectTokenMiddlewares,retrieverContactController)

export default contactRoutes