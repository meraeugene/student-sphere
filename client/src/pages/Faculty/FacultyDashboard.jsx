import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useState } from "react";
import axios from "axios";

const FacultyDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost/student-sphere/server/Users/getUserProfile.php?user_id=${userInfo.user_id}`
        );
        setProfile(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserProfile();
  }, [userInfo.user_id]);

  // Check if profile is null before accessing its properties
  const firstName = profile ? capitalizeFirstLetter(profile.first_name) : "";
  const lastName = profile ? capitalizeFirstLetter(profile.last_name) : "";

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  });

  return (
    <main className=" w-full  flex  ml-[320px] h-screen  ">
      <div className="left__container basis-[80%] ">
        <div className="welcome__container py-6 px-8 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <img src="/images/hello.png" alt="" />
              <h1 className="text-2xl poppins-regular">
                Welcome, {firstName} {lastName}!
              </h1>
            </div>
            <h1 className="poppins-regular text-[#495D72] text-sm">
              {currentDate}
            </h1>
          </div>
        </div>
      </div>

      <div className="right__container basis-[20%] bg-gray-100 h-full"></div>
    </main>
  );
};

export default FacultyDashboard;
