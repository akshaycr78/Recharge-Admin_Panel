import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const settings = [
    {
      icon: <i className="fas fa-user-cog text-lg text-indigo-600" />,
      title: "Admin Profile",
      description: "Manage your profile information",
      onClick: () => navigate("/profile"),
    },
    {
      icon: <i className="fas fa-user-shield text-lg text-indigo-600" />,
      title: "Sub-Admin Roles",
      description: "Manage sub-admin roles and permissions",
      onClick: () => navigate("/sub-admin-list"),
    },
    {
      icon: <i className="fas fa-bell text-lg text-indigo-600" />,
      title: "Notification Settings",
      description: "Configure notification settings",
      onClick: () => navigate("/notification"),
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 px-6 pt-8">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-600 transition">
          <i className="fas fa-arrow-left text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        {/* Account Section */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Account
          </h3>
          <div className="space-y-4">
            {settings.slice(0, 2).map((item, i) => (
              <button
                key={i}
                className="w-full flex items-start gap-4 bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out"
                onClick={item.onClick}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="text-left">
                  <div className="text-base font-semibold text-gray-800">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            <button
              className="w-full flex items-start gap-4 bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out"
              onClick={settings[2].onClick}
            >
              <div className="flex-shrink-0">{settings[2].icon}</div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800">{settings[2].title}</div>
                <div className="text-sm text-gray-500">{settings[2].description}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
