import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";



interface WalletManagement{
    marginw: string,
    dealerw: string,
    retailerw: string,
    userw: string
}

const WalletManagement:React.FC = () => {

    const [wallet,setWallet]=useState<WalletManagement>();
    const navigate = useNavigate()

    useEffect(() => {
    fetch("http://localhost:5000/wallet")
      .then((res) => res.json())
      .then((data) => setWallet(data))
      .catch((err) => console.error("Failed to fetch wallet data:", err));
  }, []);


    return (
    <div className="min-h-screen bg-gray-50 ">
        <Topbar/>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 px-4 pt-6">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-600">
          <i className="fas fa-arrow-left text-lg" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Wallet Management</h2>
      </div>

      

        <div className="px-9 py-4">
      
        <div
          className="flex-column justify-between items-center border-b py-3 px-3"
        >
          <div>
            <div className="text-lg font-medium text-gray-800">Margin Wallet
            </div>
          </div>
          <div className="text text-green-600 font-semibold">{wallet?.marginw}
          </div>
        
        <div className="text-sm text-gray-500">Available Balance</div>
        </div>

        <div
          className="flex-column justify-between items-center border-b py-3 px-3"
        >
          <div>
            <div className="text-lg font-medium text-gray-800">Dealer Wallet
            </div>
          </div>
          <div className="text text-green-600 font-semibold">{wallet?.dealerw}
          </div>
        
        <div className="text-sm text-gray-500">Available Balance</div>
        </div>

        <div
          className="flex-column justify-between items-center border-b py-3 px-3"
        >
          <div>
            <div className="text-lg font-medium text-gray-800">Retailer Wallet
            </div>
          </div>
          <div className="text text-green-600 font-semibold">{wallet?.retailerw}
          </div>
        
        <div className="text-sm text-gray-500">Available Balance</div>
        </div>

        <div
          className="flex-column justify-between items-center border-b py-3 px-3"
        >
          <div>
            <div className="text-lg font-medium text-gray-800">User Wallet
            </div>
          </div>
          <div className="text text-green-600 font-semibold">{wallet?.userw}
          </div>
        
        <div className="text-sm text-gray-500">Available Balance</div>
        </div>
      
        </div>

        
    </div>
    )
}

export default WalletManagement