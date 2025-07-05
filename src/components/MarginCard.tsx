import React from "react";

interface Props {
  amount: string;
  label: string;
}

const MarginCard: React.FC<Props> = ({ amount, label }) => {
  return (
    <div className="border border-gray-200 rounded-2xl px-4 sm:px-6 py-6 sm:py-8 text-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 transform cursor-pointer bg-white">
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 mb-2 sm:mb-3 tracking-tight break-words">
        {amount}
      </div>
      <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
        {label}
      </p>
    </div>
  );
};

export default MarginCard;
