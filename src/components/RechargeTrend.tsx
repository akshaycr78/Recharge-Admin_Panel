import React from "react";

interface RechargeTrendProps {
  percentage?: number;
}

const RechargeTrend: React.FC<RechargeTrendProps> = ({ percentage = 12 }) => {
  const isPositive = percentage > 0;
  const isNegative = percentage < 0;

  const color = isPositive
    ? "text-green-600"
    : isNegative
    ? "text-red-600"
    : "text-yellow-600";

  const bgColor = isPositive
    ? "bg-green-50"
    : isNegative
    ? "bg-red-50"
    : "bg-yellow-50";

  return (
    <div
      className={`mt-6 p-6 rounded-2xl border border-gray-300 ${bgColor} w-full max-w-sm shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer`}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-3 tracking-wide">
        Recharge Trend
      </h3>
      <div className={`text-4xl font-extrabold ${color}`}>
        {percentage > 0 ? "+" : ""}
        {percentage}%
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Last 7 Days:{" "}
        <span className={`${color} font-semibold`}>{percentage}%</span>
      </p>
    </div>
  );
};

export default RechargeTrend;
