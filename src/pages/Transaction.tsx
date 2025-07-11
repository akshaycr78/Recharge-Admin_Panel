import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";
import axios from "axios";

interface Transaction {
  id: number;
  name: string;
  amount: string;
  time: string;
  mobile: string;
  status: "Success" | "Failed" | "Pending";
  operator: string;
  date: string;
  role: "Dealer" | "User" | "Retailer";
}

const statusColor: Record<Transaction["status"], string> = {
  Success: "text-green-600 bg-green-100",
  Failed: "text-red-600 bg-red-100",
  Pending: "text-yellow-600 bg-yellow-100",
};

const TransactionCard: React.FC<{ txn: Transaction }> = ({ txn }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
    <p className="font-semibold text-gray-800 text-lg">{txn.name}</p>
    <p className="text-sm text-gray-600 mt-1">
      <span className="font-medium text-gray-700">Amount:</span> {txn.amount} | Time: {txn.time}
    </p>
    <p className="text-sm text-gray-600">Mobile: {txn.mobile}</p>
    <p className="text-sm text-gray-600">Operator: {txn.operator}</p>
    <p className="text-sm text-gray-600">Date: {txn.date}</p>
    <div
      className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full ${statusColor[txn.status]}`}
    >
      {txn.status}
    </div>
  </div>
);

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [operatorFilter, setOperatorFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/wallet/transactions");
        setTransactions(res.data);
        setFilteredTransactions(res.data);
      } catch (err: any) {
        console.error("Error fetching transactions", err);
        alert("Failed to load transactions.");
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = [...transactions];

    if (statusFilter !== "All") {
      filtered = filtered.filter((txn) => txn.status === statusFilter);
    }

    if (operatorFilter !== "All") {
      filtered = filtered.filter((txn) => txn.operator === operatorFilter);
    }

    if (roleFilter !== "All") {
      filtered = filtered.filter((txn) => txn.role === roleFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((txn) => txn.date === dateFilter);
    }

    setFilteredTransactions(filtered);
  }, [statusFilter, operatorFilter, roleFilter, dateFilter, transactions]);

  const dealerTxns = filteredTransactions.filter((txn) => txn.role === "Dealer");
  const userTxns = filteredTransactions.filter((txn) => txn.role === "User");
  const retailerTxns = filteredTransactions.filter((txn) => txn.role === "Retailer");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 px-4 pt-6">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-600">
          <i className="fas fa-arrow-left text-lg" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 px-6">
        <input
          type="date"
          className="border px-4 py-2 rounded-md text-sm bg-white text-gray-700 shadow focus:ring-2 focus:ring-blue-400"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-md text-sm bg-white text-gray-700 shadow focus:ring-2 focus:ring-blue-400"
          value={operatorFilter}
          onChange={(e) => setOperatorFilter(e.target.value)}
        >
          <option>All</option>
          <option>Airtel</option>
          <option>Jio</option>
          <option>Vi</option>
        </select>

        <select
          className="border px-4 py-2 rounded-md text-sm bg-white text-gray-700 shadow focus:ring-2 focus:ring-blue-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Success</option>
          <option>Failed</option>
          <option>Pending</option>
        </select>

        <select
          className="border px-4 py-2 rounded-md text-sm bg-white text-gray-700 shadow focus:ring-2 focus:ring-blue-400"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All</option>
          <option>Dealer</option>
          <option>User</option>
          <option>Retailer</option>
        </select>
      </div>

      {/* Transaction Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-10">
        {/* Dealer */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Dealer</h3>
          {dealerTxns.length > 0 ? (
            dealerTxns.map((txn) => <TransactionCard key={txn.id} txn={txn} />)
          ) : (
            <p className="text-sm text-gray-400">No Dealer transactions</p>
          )}
        </div>

        {/* User */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">User</h3>
          {userTxns.length > 0 ? (
            userTxns.map((txn) => <TransactionCard key={txn.id} txn={txn} />)
          ) : (
            <p className="text-sm text-gray-400">No User transactions</p>
          )}
        </div>

        {/* Retailer */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Retailer</h3>
          {retailerTxns.length > 0 ? (
            retailerTxns.map((txn) => <TransactionCard key={txn.id} txn={txn} />)
          ) : (
            <p className="text-sm text-gray-400">No Retailer transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
