import React from "react";

interface Props {
  title: string;
  value: number;
  color: string; // expects Tailwind color like "bg-indigo-600"
  full?: boolean;
}

const QuickStatCard: React.FC<Props> = ({ title, value, color, full }) => {
  return (
    <div
     className={`rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform ${color} ${
  full ? "col-span-2" : ""
}`}

    >
      <div className="flex flex-col gap-2">
        <p className="text-sm opacity-90 font-medium">{title}</p>
        <p className="text-4xl font-bold tracking-wide">{value}</p>
      </div>
    </div>
  );
};

export default QuickStatCard;
