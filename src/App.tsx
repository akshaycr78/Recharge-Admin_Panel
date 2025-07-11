
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminHome";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transaction";
import Users from "./pages/Users";
import WalletManagement from "./pages/WalletManagement";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import RechargePlans from "./pages/MorePlans";
import RechargePage from "./pages/RechargeHome";
import RechargeHistory from "./pages/RechargeHistory";
import NotificationSettings from "./pages/NotificationSettings";
import MarginWallet from "./pages/MarginWallett";
import AddSubAdmin from "./pages/Sub-Admin";
import SubAdminList from "./pages/Sub-Admin-List";
import AdminProfile from "./pages/AdminProfile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-home" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/walletmanagement" element={<WalletManagement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />

        <Route path="/more-plans" element={<RechargePlans />} />
        <Route path="/recharge-home" element={<RechargePage />} />
        <Route path="/recharge-history" element={<RechargeHistory />} />

        <Route path="/notification" element={<NotificationSettings />} />
        <Route path="/marginwallet" element={<MarginWallet />} />
        <Route path="/sub-admin" element={<AddSubAdmin />} />
        <Route path="/sub-admin-list" element={<SubAdminList />} />
        <Route path="/profile" element={<AdminProfile />} />







      </Routes>
    </BrowserRouter>
  );
}

export default App;
