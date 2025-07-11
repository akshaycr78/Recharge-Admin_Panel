import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MarginWalletData {
    wallet: string;
}

interface MarginTransactions {
  id: number;
  amount: string;
  time: string; // ISO string
  type: "credit" | "debit"; // new
  status: "pending" | "completed" | "failed"; // new
}

const MarginWallet: React.FC = () => {
    const [marginw, setMarginw] = useState<MarginWalletData|null>(null); 
  const [margin, setMargin] = useState<MarginTransactions[]>([]);
  const [filtered, setFiltered] = useState<MarginTransactions[]>([]);
  const [dateRange, setDateRange] = useState<string>("all");
  const [txnType, setTxnType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const navigate = useNavigate();
 
  useEffect(() => {
    fetch("http://localhost:5000/margintransactions")
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : [data];
        setMargin(arr);
        setFiltered(arr);
      })
      .catch(err => console.error("Failed to fetch details:", err));
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/marginwallet")
      .then(res => res.json())
      .then(data => {
        setMarginw(data);
      })
      .catch(err => console.error("Failed to fetch details:", err));
  }, []);

  // Apply filters whenever user changes selection
  useEffect(() => {
    let temp = [...margin];

    if (dateRange !== "all") {
      const now = new Date();
      let cutoff = new Date();
      if (dateRange === "24h") cutoff.setDate(now.getDate() - 1);
      else if (dateRange === "7d") cutoff.setDate(now.getDate() - 7);
      temp = temp.filter(t => new Date(t.time) >= cutoff);
    }

    if (txnType !== "all") {
      temp = temp.filter(t => t.type === txnType);
    }

    if (status !== "all") {
      temp = temp.filter(t => t.status === status);
    }

    // Optional: sort by time descending
    temp.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    setFiltered(temp);
  }, [dateRange, txnType, status, margin]);

  return (

    
    <div className="min-h-screen p-2 bg-gray-50">
    <div className="flex items-center gap-4 mb-4 px-4 pt-6">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-600">
          <i className="fas fa-arrow-left text-lg" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Margin Wallet</h1>
    </div>
        <div className="px-4 pt-10 mb-4">
        <div className="bg-blue-600 text-white rounded-xl p-4 flex justify-between items-center shadow-sm">
    <div>
      <h3 className="text-lg font-semibold">Current Margin Balance</h3>
      <p className="text-2xl font-bold mt-1">
  {marginw ? `${marginw.wallet}/-` : "--"}
</p>

    </div>
    <button
      onClick={() => alert("Redirect to Add Funds flow")}
      className="bg-blue-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
    >
      Add Funds
    </button>
  </div>
</div>
      <div className="flex items-center gap-4 mb-4 px-4 pt-6">
        <h2 className="text-lg font-semibold text-gray-800">Margin Transactions History</h2>
      </div>

      {/* ➕ Filter Controls */}
      <div className="px-4 flex flex-wrap gap-4 items-center mb-6">
        {/* Date Range Dropdown */}
        <select
          className="rounded shadow-sm px-3 py-2 bg-white"
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
        >
          <option value="all">Date</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
        </select>

        {/* Transaction Type Dropdown */}
        <select
          className="rounded shadow-sm px-3 py-2 bg-white"
          value={txnType}
          onChange={e => setTxnType(e.target.value)}
        >
          <option value="all">Type</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        {/* Status Dropdown */}
        <select
          className="rounded shadow-sm px-3 py-2 bg-white"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="all">Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* ⚙ Results */}
      <div className="p-5 grid grid-cols-1 gap-4">
        {filtered.map(tx => {
        if (!tx || !tx.status || !tx.time || !tx.type || !tx.amount) return null;
          const dt = new Date(tx.time);
          const formatted = dt.toLocaleString();

          return (
            <div
              key={tx.id}
              className="bg-white rounded-2xl shadow-md p-4 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-xl font-bold text-gray-800">
                  Transaction ID: <span className="font-medium text-gray-600">{tx.id}</span>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    tx.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.amount}/-
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{formatted}</span>
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    tx.status === "completed"
                      ? "bg-green-500"
                      : tx.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarginWallet;