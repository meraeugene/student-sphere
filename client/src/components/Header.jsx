import React from "react";

const Header = () => {
  return (
    <header className="h-[55px] sticky w-full top-0 z-10  bg-white py-7 px-8 pl-0  border-b border flex justify-between items-center">
      <div />
      <div className="nav__container flex items-center gap-6">
        <img
          src="/images/profile.png"
          alt="profile"
          className="w-[25px] h-[25px] rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
