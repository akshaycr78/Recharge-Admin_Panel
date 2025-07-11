import React, { useEffect, useState } from "react";
import RechargeTrend from "../components/RechargeTrend";
import Topbar from "../components/TopBar";

interface DashboardData {
  totalRecharges: string;
  revenue: string;
  failedTransactions: string;
  activeUsers: string;
  rechargeTrend: {
    percentage: number;
    days: string;
  };
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard/")
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Topbar />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 pt-8 pb-6 border-b border-gray-200 bg-white shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Recharge Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Admin. Here’s what’s happening today.
          </p>
        </div>
        <div className="text-sm text-gray-600 mt-4 md:mt-0">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
    <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.04] hover:border-indigo-400 transition-all duration-300 ease-in-out cursor-pointer group relative">
      <div className="text-sm font-medium text-gray-500 mb-1">Total Recharges</div>
      <div className="text-3xl font-extrabold text-gray-800">{dashboardData.totalRecharges}</div>
      <div className="text-green-600 text-sm mt-1">+12%</div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-300" />
    </div>

    <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.04] hover:border-green-400 transition-all duration-300 ease-in-out cursor-pointer group relative">
      <div className="text-sm font-medium text-gray-500 mb-1">Revenue</div>
      <div className="text-3xl font-extrabold text-gray-800">{dashboardData.revenue}</div>
      <div className="text-green-600 text-sm mt-1">=8%</div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 rounded-full group-hover:w-full transition-all duration-300" />
    </div>

    <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.04] hover:border-red-400 transition-all duration-300 ease-in-out cursor-pointer group relative">
      <div className="text-sm font-medium text-gray-500 mb-1">Failed Transactions</div>
      <div className="text-3xl font-extrabold text-gray-800">{dashboardData.failedTransactions}</div>
      <div className="text-red-600 text-sm mt-1">-5%</div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-500 rounded-full group-hover:w-full transition-all duration-300" />
    </div>

    <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.04] hover:border-blue-400 transition-all duration-300 ease-in-out cursor-pointer group relative">
      <div className="text-sm font-medium text-gray-500 mb-1">Active Users</div>
      <div className="text-3xl font-extrabold text-gray-800">{dashboardData.activeUsers}</div>
      <div className="text-green-600 text-sm mt-1">+15%</div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 rounded-full group-hover:w-full transition-all duration-300" />
    </div>
  </div>


        <RechargeTrend percentage={dashboardData.rechargeTrend.percentage} />
      </div>
    </div>
  );
};

export default Dashboard;
