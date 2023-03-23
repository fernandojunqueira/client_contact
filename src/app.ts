import "reflect-metadata"
import "express-async-errors"
import express, {Application} from "express"
import clientRoutes from "./routers/client.route"
import contactRoutes from "./routers/contact.route"
import loginRoutes from "./routers/login.route"

const app:Application = express()

app.use(express.json())

app.use("/client",clientRoutes)
app.use("/contact",contactRoutes)
app.use("/login",loginRoutes)

export default app