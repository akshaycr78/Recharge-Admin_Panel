import React, { useState, useEffect, useRef, ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
import type { IconBaseProps } from "react-icons";

const ArrowLeftIcon = FiArrowLeft as ComponentType<IconBaseProps>;
const SearchIcon = FiSearch as ComponentType<IconBaseProps>;
const CloseIcon = FiX as ComponentType<IconBaseProps>;

type Plan = {
  id: number;
  category: string;
  price: number;
  data: string;
  calls: string;
  sms: string;
  validity: string;
};

const RechargePlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navigate = useNavigate();

  // Fetch plans
  useEffect(() => {
    fetch("http://localhost:5000/plans")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        if (data.length > 0) {
          setActiveTab(data[0].category); // Set first category as default
        }
      })
      .catch((err) => console.error("Failed to fetch plans", err));
  }, []);

  // Tabs from unique categories
  const tabs = Array.from(new Set(plans.map((p) => p.category)));

  // Scroll active tab into view
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [activeTab]);

  // Filter plans
  const filteredPlans = plans.filter((plan) => {
    const searchable = `${plan.price} ${plan.data} ${plan.calls} ${plan.sms} ${plan.validity}`.toLowerCase();
    const matchesSearch = searchable.includes(searchQuery.toLowerCase());

    if (searchQuery.trim() !== "") {
      return matchesSearch; // search across all
    }

    return plan.category === activeTab; // default tab filter
  });

  return (
    <div className="w-full px-4 py-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <ArrowLeftIcon
              className="text-2xl hover:text-gray-600 cursor-pointer transition"
              onClick={() => navigate("/recharge-home")}
            />
            <h1 className="text-lg md:text-xl font-semibold">More plans</h1>
          </div>

          {searchVisible ? (
            <div className="relative w-full max-w-[200px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <CloseIcon
                className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                onClick={() => {
                  setSearchVisible(false);
                  setSearchQuery("");
                }}
              />
            </div>
          ) : (
            <SearchIcon
              className="text-2xl hover:text-gray-600 cursor-pointer transition"
              onClick={() => setSearchVisible(true)}
            />
          )}
        </div>

        {/* Tabs */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-center w-max md:w-full gap-3 px-2 py-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery("");
                }}
                className={`px-5 py-1.5 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-black shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-black">₹{plan.price}</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-full shadow-sm transition">
                    Recharge
                  </button>
                </div>
                <p className="text-sm text-gray-700">
                  {plan.data} | {plan.calls} | {plan.sms}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Validity for {plan.validity}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No plans found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RechargePlans;
