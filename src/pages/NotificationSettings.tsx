import React, { useState } from "react";

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    inApp: false,
    email: false,
    sms: false,
    maintenance: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Settings saved");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Top Blue Bar */}
      <div className="w-full bg-blue-600 px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-white">Notification Settings</h1>
      </div>

      {/* Page Content */}
      <div className="w-full px-8 py-6">
        {/* Notification Channels */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Notification Channels</h2>
          <div className="space-y-5">
            {[
              { key: "inApp", label: "In-App", desc: "Receive notifications within the app" },
              { key: "email", label: "Email", desc: "Receive notifications via email" },
              { key: "sms", label: "SMS", desc: "Receive notifications via SMS" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>

                {/* Working Sliding Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={settings[item.key as keyof typeof settings]}
                    onChange={() => toggle(item.key as keyof typeof settings)}
                  />
                  <div className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out
                      ${settings[item.key as keyof typeof settings] ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                    <div className="bg-white w-4 h-4 rounded-full shadow-md transition-transform" />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Notification Types */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Notification Types</h2>

          {/* Recharge */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Recharge Notifications</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Recharge Successful</p>
                <p className="text-sm text-gray-500">Notify when a recharge is successful</p>
              </div>
              <div>
                <p className="font-medium">Recharge Failed</p>
                <p className="text-sm text-gray-500">Notify when a recharge fails</p>
              </div>
            </div>
          </div>

          {/* User */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">User Notifications</h3>
            <div>
              <p className="font-medium">New User Registered</p>
              <p className="text-sm text-gray-500">Notify when a new user registers</p>
            </div>
          </div>

          {/* Wallet */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Wallet Alerts</h3>
            <div>
              <p className="font-medium">Low Balance</p>
              <p className="text-sm text-gray-500">Notify when the wallet balance is low</p>
            </div>
          </div>

          {/* System Alerts */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">System Alerts</h3>
              <p className="font-medium">Maintenance Scheduled</p>
              <p className="text-sm text-gray-500">
                Notify about scheduled system maintenance
              </p>
            </div>

            {/* Sliding Switch */}
            <label className="relative inline-flex items-center cursor-pointer mt-2">
              <input
                type="checkbox"
                className="sr-only"
                checked={settings.maintenance}
                onChange={() => toggle("maintenance")}
              />
              <div className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out
                ${settings.maintenance ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="bg-white w-4 h-4 rounded-full shadow-md transition-transform" />
              </div>
            </label>
          </div>
        </section>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
