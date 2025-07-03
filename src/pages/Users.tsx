import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";



interface Users{
    id: number,
    name: string,
    mobile: string,
    amount: string
}

const Users:React.FC = () => {

    const [users,setUsers]=useState<Users[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : [data]))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.toString().includes(searchTerm)
  );

    return (
    <div className="min-h-screen bg-gray-50">
        <Topbar/>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 px-4 pt-6">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-600">
          <i className="fas fa-arrow-left text-lg" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
      </div>

      <div className="mb-4 px-6">
        <input
          type="text"
          placeholder="Search by name or mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

    <div className="p-9">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <div className="text-lg font-medium text-gray-800">
              +{user.mobile}
            </div>
            <div className="text-sm text-gray-500">{user.name}</div>
          </div>
          <div className="text-right text-green-600 font-semibold">
            {user.amount}
          </div>
        </div>
      ))}
    </div>
    </div>
    )
}

export default Users