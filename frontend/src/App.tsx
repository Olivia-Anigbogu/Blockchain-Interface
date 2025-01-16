import Blocks from "./components/blocks";
import Nodes from "./components/nodes";
import Transactions from "./components/transactions";

function App() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-center text-purple-400 text-3xl font-bold mb-10">
        Blockchain Interface
      </h1>
      <Transactions />
      <Blocks />
      <Nodes />
    </div>
  );
}

export default App;
