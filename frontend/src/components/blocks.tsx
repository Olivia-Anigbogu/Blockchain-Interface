import axios from "axios";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { TransactionStateProps } from "./transactions";

interface BlocksStateData {
  index: number;
  timestamp: Date;
  transactions: TransactionStateProps[];
  nonce: string;
  hash: string;
  previousBlockHash: string;
}

interface BlocksType{
    chains: BlocksStateData[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Blocks() {
  const [block, setBlock] = useState({ nonce: "", prevHash: "", hash: "" });
  const [errorMsg, setError] = useState("");

  const { data: blocks, error } = useSWR<BlocksType>(
    "http://localhost:3000/blocks",
    fetcher
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!block.nonce || !block.prevHash || !block.hash) {
      setTimeout(() => {
        setError("All fields are required.");
      }, 3000);
      return;
    }

    const BlockObj = {
      nonce: Number(block.nonce),
      prevHash: block.prevHash,
      hash: block.hash,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addTransaction = await axios.post(
      "http://localhost:3000/blocks/create",
      BlockObj
    );

    mutate("http://localhost:3000/blocks");

    setError("");
  };

  const data = useMemo(() => {
    if (!blocks?.chains) return;
    return blocks.chains;
  }, [blocks]);

  if (error) {
    return <div>Filed to fetch blocks</div>;
  }

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
        <button
          type="submit"
          className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500"
        >
          Add Block
        </button>
      </form>
      {errorMsg && <p className="text-red-400 mt-3">{errorMsg}</p>}

      {data && (
        <div className="mt-3">
          <h6 className="text-lg text-purple-400">Blockchain Details:</h6>

          <div className="space-y-4 mt-4">
            {data.map((res, index) => {
              return (
                <div key={index} className="flex gap-6">
                  <div>{index + 1}</div>
                  <div>
                    <p>Index: {res.index}</p>
                    <p>Timestamp: {format(new Date(res.timestamp), "PPpp")}</p>
                    <p>Nonce: {res.nonce}</p>
                    <p>Hash: {res.hash}</p>
                    <p>Previous-hash: {res.previousBlockHash}</p>
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
