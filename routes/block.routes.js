import express from "express";
import {
  addChainToBlock,
  getChainsInTheBlock,
} from "../controller/blocks.controller.js";

const blocksRouter = express.Router();

blocksRouter.get("/", getChainsInTheBlock);
blocksRouter.post("/create", addChainToBlock);

export default blocksRouter;
