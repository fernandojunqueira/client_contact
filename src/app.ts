import "reflect-metadata"
import "express-async-errors"
import express, {Application} from "express"
import { globalRoutes } from "./routers"
import handleError from "./errors/handleError"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

const app:Application = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(globalRoutes)
app.use(handleError)


export default app