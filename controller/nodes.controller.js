import Blockchain from "../config/blockchain7.js";

export const getNodes = (req, res) => {
  try {
    const registeredNodes = Blockchain.network;
    res.status(200).json({ registeredNodes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerNodes = (req, res) => {
  try {
    const { newNodeUrl } = req.body;

    if (!newNodeUrl)
      res.status(400).json({ error: "New node url is required" });

    const nodeNotAlreadyPresent = Blockchain.network.indexOf(newNodeUrl) == -1;

    const notCurrentNode = Blockchain.currentNodeUrl !== newNodeUrl;

    if (nodeNotAlreadyPresent && notCurrentNode)
      Blockchain.network.push(newNodeUrl);

    res.status(201).json({ networkNodes: Blockchain.network });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
