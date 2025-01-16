import express from "express";
import transactionsRouter from "./transactions.routes.js";
import blocksRouter from "./block.routes.js";
import nodesRouter from "./nodes.routes.js";

const indexRouter = express.Router();

indexRouter.use("/blocks", blocksRouter)
indexRouter.use("/transactions", transactionsRouter);
indexRouter.use("/nodes", nodesRouter)

export default indexRouter;
