/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

export interface TransactionStateProps {
  amount: number;
  sender: string;
  recipient: string;
}

interface TransactionsType {
  transactions: TransactionStateProps[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Transactions() {
  const [transaction, setTransaction] = useState<{
    amount: string;
    sender: string;
    receiver: string;
  }>({ amount: "", sender: "", receiver: "" });
  const [errorMsg, setError] = useState("");

  const { data: transactions, error } = useSWR<TransactionsType>(
    "http://localhost:3000/transactions",
    fetcher
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!transaction.amount || !transaction.sender || !transaction.receiver) {
      setTimeout(() => {
        setError("All fields are required.");
      }, 3000);
      return;
    }

    const transactionObj = {
      amount: Number(transaction.amount),
      sender: transaction.sender,
      reciever: transaction.receiver,
    };

    const addTransaction = await axios.post(
      "http://localhost:3000/transactions/create",
      transactionObj
    );

    mutate("http://localhost:3000/transactions");

    console.log(addTransaction.data.data);
    setError("");
  };

  const data = useMemo(() => {
    if (!transactions?.transactions) return;
    return transactions.transactions;
  }, [transactions]);

  if (error) {
    return <div>Filed to fetch transactions</div>;
  }

  return (
    <div className="bg-gray-800 text-white p-6 mb-6 rounded shadow-lg">
      <h5 className="text-purple-400 text-xl mb-4">Add a Transaction</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={transaction.amount}
          onChange={(e) =>
            setTransaction({ ...transaction, amount: e.target.value })
          }
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Sender"
          value={transaction.sender}
          onChange={(e) =>
            setTransaction({ ...transaction, sender: e.target.value })
          }
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Receiver"
          value={transaction.receiver}
          onChange={(e) =>
            setTransaction({ ...transaction, receiver: e.target.value })
          }
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500"
        >
          Add Transaction
        </button>
      </form>

      {errorMsg && <p className="text-red-400 mt-3">{errorMsg}</p>}

      {data && (
        <div className="mt-3">
          <h6 className="text-lg text-purple-400">Transaction Details:</h6>

          <div className="space-y-4 mt-4">
            {data.map((res, index) => {
              return (
                <div key={index} className="flex gap-6">
                  <div>{index + 1}</div>
                  <div>
                    <p>Amount: {res.amount}</p>
                    <p>Sender: {res.sender}</p>
                    <p>Receiver: {res.recipient}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
