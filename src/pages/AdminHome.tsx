import React, { useEffect, useState } from "react";
import Topbar from "../components/TopBar";
import MarginCard from "../components/MarginCard";
import QuickStatCard from "../components/QuickStatCard";
import WalletCard from "../components/WalletCard";

interface DashboardData {
  margins: number[];
  walletBalance: string;
  lastUpdated: string;
  quickStats: {
    totalRechargesToday: number;
    failedTransactions: number;
    newUsers: number;
  };
}

const AdminHome: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/adminHome")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error("Error fetching adminHome:", err));
  }, []);

  const marginLabels = ["Prepaid", "Postpaid", "DTH", "Data Card"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      <div className="p-4">
        {/* 🔷 Margin Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {data?.margins.map((margin, index) => (
            <MarginCard
              key={index}
              amount={`₹${margin.toLocaleString("en-IN")}/-`}
              label={marginLabels[index] || `Margin ${index + 1}`}
            />
          ))}
        </div>

        {/* 💰 Wallet */}
        {data && (
          <WalletCard
            balance={data.walletBalance}
            lastUpdated={data.lastUpdated}
          />
        )}

        {/* ⚡ Quick Stats */}
        <h3 className="text-lg font-semibold mb-3 mt-6">Quick Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
          <QuickStatCard
            title="Total Recharges Today"
            value={data?.quickStats.totalRechargesToday || 0}
            color="bg-blue-100 text-blue-800"
          />
          <QuickStatCard
            title="Failed Transactions"
            value={data?.quickStats.failedTransactions || 0}
            color="bg-red-100 text-red-800"
          />
          <QuickStatCard
            title="New Users"
            value={data?.quickStats.newUsers || 0}
            color="bg-green-100 text-green-800"
            full
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
