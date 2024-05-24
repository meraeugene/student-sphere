import React from "react";

const Header = () => {
  return (
    <header className="h-[55px] sticky w-full top-0 z-10  bg-white py-7 px-10 pl-0  border-b border flex justify-between items-center">
      <div className="search__container relative ml-[330px]">
        <input
          type="search"
          placeholder="Search"
          className="border pl-9 pr-4 bg-[#F5F6F8] text-[#495D72] outline-none w-[300px] h-[34px] rounded-md font-medium"
        />
        <div
          className="absolute  top-1/2 left-[10px] transform  -translate-y-1/2
 "
        >
          <img src="/images/search.png" alt="search" />
        </div>
      </div>
      <div className="nav__containe flex items-center gap-6">
        <img src="/images/message.png" alt="message" />
        <img src="/images/notif.png" alt="notif" />
        <img
          src="/images/profile.jpg"
          alt="profile"
          className="w-[35px] h-[35px] rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
