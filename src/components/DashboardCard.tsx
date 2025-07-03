import React from "react";

interface Props {
  title: string;
  value: string | number;
  change: string;
  changeColor?: string;
}

const DashboardCard: React.FC<Props> = ({
  title,
  value,
  change,
  changeColor = "text-green-600",
}) => {
  return (
    <div className="border border-black rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className={`text-sm font-medium mt-1 ${changeColor}`}>{change}</p>
    </div>
  );
};

export default DashboardCard;
