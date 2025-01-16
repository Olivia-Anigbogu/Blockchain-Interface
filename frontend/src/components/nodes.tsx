import axios from "axios";
import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Nodes() {
  const [node, setNode] = useState("");
  const [errorMsg, setError] = useState("");

  const { data: nodes, error } = useSWR<{ registeredNodes: string[] }>(
    "http://localhost:3000/nodes",
    fetcher
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!node) {
      setError("Node URL is required.");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addTransaction = await axios.post(
      "http://localhost:3000/nodes/register-nodes",
      { newNodeUrl: node }
    );

    mutate("http://localhost:3000/nodes");

    setError("");
  };

  const data = useMemo(() => {
    if (!nodes?.registeredNodes) return;
    return nodes.registeredNodes;
  }, [nodes]);

  if (error) {
    return <div>Filed to fetch blocks</div>;
  }

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
        <button
          type="submit"
          className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500"
        >
          Register Node
        </button>
      </form>
      {errorMsg && <p className="text-red-400 mt-3">{errorMsg}</p>}
      {data && (
        <div className="mt-3">
          <h6 className="text-lg text-purple-400">Registered Node:</h6>
          <div className="space-y-4 mt-4">
            {data.map((nodes, index) => {
              return (
                <p key={index}>
                  {index + 1}: {nodes}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
