import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

// Transaction Component
const Transaction = () => {
  const [transaction, setTransaction] = useState({ amount: '', sender: '', receiver: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transaction.amount || !transaction.sender || !transaction.receiver) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setResult(transaction);
  };

  return (
    <div className="bg-gray-800 text-white p-6 mb-6 rounded shadow-lg">
      <h5 className="text-purple-400 text-xl mb-4">Add a Transaction</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={transaction.amount}
          onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Sender's Address"
          value={transaction.sender}
          onChange={(e) => setTransaction({ ...transaction, sender: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Receiver's Address"
          value={transaction.receiver}
          onChange={(e) => setTransaction({ ...transaction, receiver: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button type="submit" className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500">Add Transaction</button>
      </form>
      {error && <p className="text-red-400 mt-3">{error}</p>}
      {result && (
        <div className="mt-3">
          <h6 className="text-lg text-purple-400">Transaction Details:</h6>
          <p>Amount: {result.amount}</p>
          <p>Sender: {result.sender}</p>
          <p>Receiver: {result.receiver}</p>
        </div>
      )}
    </div>
  );
};

// Block Component
const Block = () => {
  const [block, setBlock] = useState({ nonce: '', prevHash: '', hash: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!block.nonce || !block.prevHash || !block.hash) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setResult(block);
  };

  return (
    <div className="bg-gray-800 text-white p-6 mb-6 rounded shadow-lg">
      <h5 className="text-purple-400 text-xl mb-4">Add a Block</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Nonce"
          value={block.nonce}
          onChange={(e) => setBlock({ ...block, nonce: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Previous Block Hash"
          value={block.prevHash}
          onChange={(e) => setBlock({ ...block, prevHash: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Hash"
          value={block.hash}
          onChange={(e) => setBlock({ ...block, hash: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button type="submit" className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500">Add Block</button>
      </form>
      {error && <p className="text-red-400 mt-3">{error}</p>}
      {result && (
        <div className="mt-3">
          <h6 className="text-lg text-purple-400">Block Details:</h6>
          <p>Nonce: {result.nonce}</p>
          <p>Previous Hash: {result.prevHash}</p>
          <p>Hash: {result.hash}</p>
        </div>
      )}
    </div>
  );
};

// Node Component
const Node = () => {
  const [node, setNode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!node) {
      setError('Node URL is required.');
      return;
    }
    setError('');
    setResult(node);
  };

  return (
    <div className="bg-gray-800 text-white p-6 mb-6 rounded shadow-lg">
      <h5 className="text-purple-400 text-xl mb-4">Register a Node</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Node URL"
          value={node}
          onChange={(e) => setNode(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button type="submit" className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500">Register Node</button>
      </form>
      {error && <p className="text-red-400 mt-3">{error}</p>}
      {result && (
        <div className="mt-3">
          <h6 className="text-lg text-purple-400">Registered Node:</h6>
          <p>URL: {result}</p>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-center text-purple-400 text-3xl font-bold mb-10">Blockchain Interface</h1>
      <Transaction />
      <Block />
      <Node />
    </div>
  );
};

export default App;
