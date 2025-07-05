import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface History {
  id: number;
  userName: string;
  phone: string;
  userPfp?: string;
  plan: string;
}

const RechargeHistory: React.FC = () => {
  const [users, setUsers] = useState<History[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/rechargehistory")
      .then((res) => res.json())
      .then((data: History[] | History) =>
        setUsers(Array.isArray(data) ? data : [data])
      )
      .catch((err) => console.error("Failed to fetch details:", err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen font-medium bg-gray-50 px-11">
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-chevron-left text-xl" />
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800 p-4">
          Recharge History
        </h1>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by name or phone number"
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg p-4 w-full"
            >
              <div className="flex items-center justify-between">
                {/* Left Side: Avatar + User Info */}
                <div className="flex items-center gap-4">
                  {/* User Image or Icon */}
                  {user.userPfp ? (
                    <img
                      src={user.userPfp}
                      alt={`${user.userName} avatar`}
                      className="h-12 w-12 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full border border-gray-200">
                      <i className="fas fa-user text-lg" />
                    </div>
                  )}

                  {/* User Details */}
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{user.userName}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                </div>

                {/* Right Side: Plan Amount */}
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-500">{user.plan}/-</p>
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500">No matching users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RechargeHistory;
