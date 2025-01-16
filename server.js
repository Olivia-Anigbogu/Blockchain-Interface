import express from "express" 
import cors from "cors"
import indexRouter from "./routes/index.routes.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", indexRouter)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})