import React from "react";

interface Props {
  balance: string;
  lastUpdated: string;
}

const WalletCard: React.FC<Props> = ({ balance, lastUpdated }) => {
  const handleAddMoney = () => {
    alert("Redirect to Add Money Flow (to be implemented)");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 mb-6 flex items-center justify-between transform">
      <div>
        <p className="text-sm text-gray-500">Wallet Balance</p>
        <h2 className="text-3xl font-extrabold text-gray-800 mt-1 tracking-tight">{balance}</h2>
        <p className="text-xs text-gray-400 mt-1">Last updated: {lastUpdated}</p>
      </div>

      <button
        onClick={handleAddMoney}
        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-md"
      >
        Add Money
      </button>
    </div>
  );
};

export default WalletCard;
