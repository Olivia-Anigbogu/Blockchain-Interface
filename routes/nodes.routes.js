import express from "express"
import { getNodes, registerNodes } from "../controller/nodes.controller.js"

const nodesRouter = express.Router()

nodesRouter.get("/", getNodes)
nodesRouter.post("/register-nodes", registerNodes)

export default nodesRouter
