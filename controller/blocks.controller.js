import Blockchain from "../config/blockchain7.js";

export const getChainsInTheBlock = (req, res) => {
  try {
    const chains = Blockchain.getChain();

    res.status(200).json({ chains });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addChainToBlock = (req, res) => {
  try {
    const { nonce, previousBlockHash, hash } = req.body;
    console.log(req.body);

    if ((!nonce, !previousBlockHash, !hash)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const createdTransaction = Blockchain.createNewBlock(
      nonce,
      previousBlockHash,
      hash
    );

    res.status(201).json({ status: "created", data: createdTransaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
