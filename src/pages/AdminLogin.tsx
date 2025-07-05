import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@zecser.com" && password === "admin123") {
      localStorage.setItem("admin_token", "mock_token");
      navigate("/admin-home");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#2563eb] flex items-center justify-center px-4">
      <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-md w-full transition-transform duration-300 hover:scale-[1.01]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Admin Panel</h1>
          <p className="text-sm text-white/80">Welcome back. Please login to continue.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm text-center py-2 px-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 bg-white/80 text-gray-800 placeholder-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 bg-white/80 text-gray-800 placeholder-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-white/80 text-sm">
          © {new Date().getFullYear()} Zecser Admin Portal
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
