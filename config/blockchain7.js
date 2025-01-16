import sha256 from "sha256";
const currentUrl = process.argv[3];

class BlockchainClass {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    // this.newTransactions = [];
    this.createNewBlock(100, "0", "0");
    this.currentNodeUrl = currentUrl;
    this.network = [];
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash,
    };
    // this.newTransaction = [];
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction(amount, sender, recipient) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
    };

    this.pendingTransactions.push(newTransaction);
    // return this.getLastBlock()["index"] + 1;
    return newTransaction;
  }

  addTransactionToPendingTransactions(transactionObj) {
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()["index"] + 1;
  }

  hashBlock(previousBlockHash, currentBlockData, nonce) {
    const dataAsString =
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
  }

  proofOfWork(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
      console.log(hash);
    }
    return nonce;
  }

  getTransactions() {
    return this.pendingTransactions;
  }

  getChain() {
    return this.chain;
  }
}

const Blockchain = new BlockchainClass

export default Blockchain;
