import React from "react";

const StatisticCard = ({ icon, title, count }) => (
  <div className="w-full shadow-blue-200 shadow-sm border hover:shadow-lg  hover:shadow-blue-200 transition-all duration-300 ease-in-out rounded-md p-5">
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="flex items-center gap-4">
        {typeof icon === "string" ? (
          <img src={icon} alt={title} />
        ) : (
          <div className="icon">{icon}</div>
        )}
        <h1 className="text-lg">{title}</h1>
      </div>
      <h1 className="text-4xl text-center">{count}</h1>
    </div>
  </div>
);

export default StatisticCard;
