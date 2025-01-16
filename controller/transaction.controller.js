import Blockchain from "../config/blockchain7.js";

export const getTransactions = (req, res) => {
  try {
    const transactions = Blockchain.getTransactions();

    res.status(200).json({ transactions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createTransaction = (req, res) => {
  try {
    const { amount, sender, reciever } = req.body;

    if ((!amount, !sender, !reciever)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const createdTransaction = Blockchain.createNewTransaction(
      amount,
      sender,
      reciever
    );

    res.status(201).json({ status: "created", data: createdTransaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
