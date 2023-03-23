import "reflect-metadata"
import "express-async-errors"
import express, {Application} from "express"
import clientRoutes from "./routers/client.route"
import contactRoutes from "./routers/contact.route"
import loginRoutes from "./routers/login.route"
import { globalRoutes } from "./routers"
import handleError from "./errors/handleError"

const app:Application = express()

app.use(express.json())

app.use(globalRoutes)
app.use(handleError)


export default app