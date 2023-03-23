import { Router } from "express";
import { createClientController, deleteClientController, listClientController, retrieverClientController } from "../controllers/controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureValidatedDate";
import { clientSchema } from "../serializers/serializers";
import { inspectTokenMiddlewares } from "../middlewares/inspectToken";
import { verifyOwnerMiddlewares } from "../middlewares/verifyOwner";

const clientRoutes = Router()

clientRoutes.post(
    "",
    ensureDataIsValidMiddleware(clientSchema),
    createClientController
    )
clientRoutes.get(
    "",
    inspectTokenMiddlewares,
    listClientController
    )
clientRoutes.get(
    "/:id",
    inspectTokenMiddlewares,
    verifyOwnerMiddlewares,
    retrieverClientController
    )
clientRoutes.delete(
    "/:id",
    inspectTokenMiddlewares,
    deleteClientController
    )

export default clientRoutes