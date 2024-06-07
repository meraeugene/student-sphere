import React from "react";
import { Link } from "react-router-dom";

const ShortcutCard = ({ image, alt, title, link }) => {
  return (
    <Link
      to={link}
      className="w-full  p-5 max-h-[200px] shadow-blue-200 shadow-sm border hover:shadow-lg  hover:shadow-blue-200 transition-all duration-300 ease-in-out rounded-md "
    >
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="flex items-center gap-4">
          <img src={image} alt={alt} />
          <h1 className="text-2xl ">{title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ShortcutCard;
