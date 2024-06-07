import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import ShortcutCard from "@/components/ShortcutCard";
import { CiCalendar } from "react-icons/ci";

const FacultyDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Fetch user profile
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

  useEffect(() => {
    // Fetch faculty schedule
    const fetchFacultySchedule = async () => {
      try {
        const response = await axios.get(
          `http://localhost/student-sphere/server/Schedule/faculty_schedule.php?facultyId=${userInfo.faculty_id}`
        );
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching faculty schedule:", error);
      }
    };

    fetchFacultySchedule();
  }, [userInfo.faculty_id]);

  // Check if profile is null before accessing its properties
  const firstName = profile ? capitalizeFirstLetter(profile.first_name) : "";
  const lastName = profile ? capitalizeFirstLetter(profile.last_name) : "";

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  });

  // Organize schedule into separate arrays for each day of the week and time slot
  const dayTimeSlotSchedules = {};

  schedule.forEach((item) => {
    const key = `${item.day_of_week}`;
    if (!dayTimeSlotSchedules[key]) {
      dayTimeSlotSchedules[key] = [];
    }
    dayTimeSlotSchedules[key].push({
      section: item.section_name,
      timeSlot: item.time_slot,
    });
  });

  return (
    <main className="w-full flex ml-[320px] h-screen bg-gray-50">
      <div className="py-6 px-8 w-full">
        <div className="welcome__container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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
          <div className="flex flex-col w-full">
            <div className="flex gap-8 h-full">
              <ShortcutCard
                image="/images/admin-dashboard/grades.svg"
                title="Grades"
                alt="grades"
                link="/faculty/grades"
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

            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <CiCalendar size={25} />
                <h2 className="text-2xl ">Schedule</h2>
              </div>

              <div className="grid grid-cols-6 gap-6">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div key={day}>
                    <h3 className="text-lg   mb-4 shadow-blue-200 shadow-sm border hover:shadow-lg  hover:shadow-blue-200 transition-all duration-300 ease-in-out rounded-md p-2 text-center">
                      {day}
                    </h3>
                    <ul>
                      {dayTimeSlotSchedules[day]?.map(
                        ({ section, timeSlot }, index) => (
                          <li
                            className="shadow-blue-200 shadow-sm border hover:shadow-lg  hover:shadow-blue-200 transition-all   duration-300 ease-in-out rounded-md p-2 px-4 text-center flex flex-col gap-1"
                            key={index}
                          >
                            <p className="text-base">{section}</p>
                            <p className="text-sm">{timeSlot}</p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="calendar shadow-blue-200 shadow-sm border hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 ease-in-out rounded-md">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FacultyDashboard;
