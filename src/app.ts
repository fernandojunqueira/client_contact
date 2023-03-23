import "reflect-metadata"
import "express-async-errors"
import express, {Application} from "express"
import { globalRoutes } from "./routers"
import handleError from "./errors/handleError"

const app:Application = express()

app.use(express.json())

app.use(globalRoutes)
app.use(handleError)


export default app