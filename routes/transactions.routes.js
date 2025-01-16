import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../controller/transaction.controller.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/", getTransactions);
transactionsRouter.post("/create", createTransaction);

export default transactionsRouter;
