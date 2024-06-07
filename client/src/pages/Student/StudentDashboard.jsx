import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useState } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import ShortcutCard from "@/components/ShortcutCard";

const StudentDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost/student-sphere/server/Users/get_user_profile.php?user_id=${userInfo.user_id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
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
    <main className=" w-full  flex  ml-[320px] h-screen bg-gray-50 ">
      <div className=" py-6 px-8 w-full ">
        <div className="welcome__container  ">
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

        <div className="flex mt-8 gap-10 min-h-[350px] poppins-regular">
          <div className="grid grid-cols-3 gap-8 w-full">
            <ShortcutCard
              image="/images/admin-dashboard/enrolled-subjects.svg"
              title="Enrolled Subjects"
              alt="grades"
              link="/student/subjects-enrolled"
            />
            <ShortcutCard
              image="/images/admin-dashboard/grades.svg"
              title="Grades"
              alt="grades"
              link="/student/grades"
            />
            <ShortcutCard
              image="/images/admin-dashboard/profile.svg"
              title="Personal Details"
              alt="Personal Details"
              link="/profile-management"
            />
            <ShortcutCard
              image="/images/admin-dashboard/password.svg"
              title="Password & Security"
              alt="password"
              link="/change-password"
            />
          </div>

          <div className="calendar shadow-blue-200 shadow-sm border hover:shadow-lg  hover:shadow-blue-200 transition-all duration-300 ease-in-out rounded-md">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentDashboard;
