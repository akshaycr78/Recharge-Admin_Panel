import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Plan {
  id: number;
  price: number;
  data: string;
  calls: string;
  sms: string;
  validity: string;
}

const RechargePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [mobile, setMobile] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/recharge")
      .then((res) => res.json())
      .then((data) => setPlans(Array.isArray(data) ? data : [data]))
      .catch((err) => console.error("Failed to fetch plan:", err));
  }, []);

  const handleRecharge = (plan: Plan) => {
    console.log("Recharging with:", plan);
  };

  return (
    <div className="min-h-screen font-medium bg-gray-50 px-4 md:px-11">
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
          <i className="fas fa-chevron-left text-xl" />
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 p-4">Recharge</h1>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search"
                className="w-full bg-gray-100 border border-gray-300 text-center font-bold rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Recent Plan */}
            {plans.length > 0 && (
              <div>
                <h3 className="text-xl font-bold py-2 text-gray-600">Recent Plan</h3>
                <div className="bg-white shadow-lg hover:shadow-xl rounded-xl p-4 space-y-2 border border-gray-200 transition-shadow duration-200">
                  <h2 className="text-xl font-bold text-blue-700">₹{plans[0].price}</h2>
                  <p className="text-gray-700">
                    {plans[0].data} · {plans[0].calls} · {plans[0].sms}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Validity for {plans[0].validity}</p>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={() => handleRecharge(plans[0])}
                    >
                      Recharge
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="text-right">
              <button className="text-md font-semibold text-gray-600">See more</button>
            </div>

            {/* Recharge History Button */}
            <button
              onClick={() => navigate("/recharge-history")}
              className="w-full bg-blue-600 text-white py-2 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              Recharge History
            </button>
          </div>

          {/* Right Column */}
          <div className="flex items-center justify-center">
            <div className="bg-white text-center shadow-lg hover:shadow-xl rounded-xl p-6 space-y-4 border border-gray-200 w-full h-full transition-shadow duration-200">
              <label className="text-lg font-bold text-gray-700">Mobile Number</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="w-full sm:w-auto border border-gray-300 px-4 py-2 rounded-md bg-gray-100 text-gray-800 text-center">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="7726001835"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Optional logo */}
              <div className="flex justify-center">
                <img
                  src=""
                  alt="Service Provider"
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Navigate to More Plans */}
              <button
                onClick={() => navigate("/more-plans")}
                className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
              >
                More Plans
              </button>
            </div>
          </div>
        </div>

        {/* Offer Plans (Search Enabled) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Offer plans</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {plans
              .filter((plan) =>
                `${plan.price} ${plan.data} ${plan.calls} ${plan.sms} ${plan.validity}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handleRecharge(plan)}
                  className="cursor-pointer bg-white border border-gray-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <h4 className="text-2xl font-bold">₹{plan.price}</h4>
                  <p className="text-md">{plan.data}</p>
                  <p className="text-md">{plan.calls}</p>
                  <p className="text-md">{plan.sms}</p>
                  <p className="text-sm text-gray-500">{plan.validity} validity</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRecharge(plan);
                      }}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Recharge
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargePage;
