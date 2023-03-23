import { Router } from "express";
import { createContactController, deleteContactController, listContactController, retrieverContactController, updateContactController } from "../controllers/contact";
import ensureDataIsValidMiddleware from "../middlewares/ensureValidatedDate";
import {contactSchema} from "../serializers/serializers"
import { inspectTokenMiddlewares } from "../middlewares/inspectToken";
import { verifyOwnerMiddlewares } from "../middlewares/verifyOwner";

const contactRoutes = Router()

contactRoutes.post(
    "/:id",
    inspectTokenMiddlewares,
    verifyOwnerMiddlewares,
    ensureDataIsValidMiddleware(contactSchema),
    createContactController
    )
contactRoutes.get(
    "/",
    inspectTokenMiddlewares,
    listContactController
    )
contactRoutes.get(
    "/:id",
    inspectTokenMiddlewares,
    retrieverContactController
    )
contactRoutes.patch(
    "/:id",
    inspectTokenMiddlewares,
    updateContactController
    )
contactRoutes.delete(
    "/:id",
    inspectTokenMiddlewares,
    deleteContactController
    )

export default contactRoutes