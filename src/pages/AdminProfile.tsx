import React from "react";
import { FiUser } from "react-icons/fi";

const AdminProfile: React.FC = () => {
  const admin = {
    name: "Admin Name",
    email: "admin@zecser.com",
    phone: "9876543210",
    role: "Super Admin",
  };

  
  const UserIcon = FiUser as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              
              <UserIcon className="text-3xl" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                Admin Profile
              </h1>
              <p className="text-sm text-gray-500">{admin.role}</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Edit Profile
          </button>
        </div>

        {/* Profile Fields */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">Full Name</p>
            <p className="text-gray-800 font-medium">{admin.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Email</p>
            <p className="text-gray-800 font-medium">{admin.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Phone</p>
            <p className="text-gray-800 font-medium">{admin.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Role</p>
            <p className="text-gray-800 font-medium">{admin.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
