import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="ml-[330px] flex items-center justify-center flex-col w-full mt-[200px] gap-6 ">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h1 className="font-bold  text-lg">
        Ooops! This page could not be found
      </h1>
      <p className="text-lg font-medium md:w-1/2 md:text-center lg:w-1/3">
        Sorry, but the page you are looking for does not exist, has been
        removed, name changed, or temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-[#164e8e] text-white h-[50px] w-[200px] rounded-md  px-4 inter flex items-center justify-center  mt-2"
      >
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default ErrorPage;
