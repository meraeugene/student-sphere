import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { MdOutlinePhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { LuBuilding2 } from "react-icons/lu";
import { GiBlackBook } from "react-icons/gi";
import { BsBuildingFillCheck } from "react-icons/bs";
import { LuBookCopy } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";

const FacultyDetailsModal = ({ close, data }) => {
  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300">
      <div className="fixed-container z-20  opacity-100 transition-all duration-300  ">
        <div className=" inter text-lg">
          <div className="flex gap-4 justify-between mb-4">
            <div className="bg-white p-2 px-6 text-center text-xl font-semibold w-full rounded-[4px]">
              <h1>Faculty Information</h1>
            </div>
            <button
              onClick={close}
              className="bg-[#164e8e] hover:bg-[#133e6e] transition-colors duration-300 text-white  rounded-[4px] px-4 inter flex items-center justify-center gap-3"
            >
              Close
              <FiMinus size={26} />
            </button>
          </div>
          <div className="flex gap-4">
            <div className="left-col__container flex flex-col gap-4">
              <div className="p-6 flex items-center gap-4 bg-white rounded-[8px]">
                <div>
                  <img
                    src={data.profile_picture}
                    alt="profile pic"
                    className="w-[50px] h-[50px] object-cover rounded-sm"
                  />
                </div>
                <div>
                  <h1 className="font-semibold ">
                    {data.first_name} {data.last_name}
                  </h1>
                  <div className="flex items-center gap-1">
                    <CiLocationOn />
                    <h2 className="text-sm">{data.address}</h2>
                  </div>
                </div>
              </div>
              <div className="details__container bg-white p-6 rounded-[4px]">
                <h1 className="mb-2 font-semibold">Profile Information</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CiCalendar />
                    <h1>{data.date_of_birth}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineMail />
                    <h1>{data.email}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    {data.gender.toLowerCase() === "male" ? (
                      <BsGenderMale />
                    ) : (
                      <BsGenderFemale />
                    )}
                    <h1>{data.gender}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlinePhone />
                    <h1>{data.phone_number}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="right__container">
              <div className="details__container bg-white p-6 h-full rounded-[4px] flex flex-col  justify-around">
                <div className="department">
                  <div className="flex items-center gap-2">
                    <LuBuilding2 />
                    <h1 className="font-semibold">Department</h1>
                  </div>
                  <h1>{data.department_name}</h1>
                </div>
                <div className="program">
                  <div className="flex items-center gap-2">
                    <GiBlackBook />
                    <h1 className="font-semibold">Program</h1>
                  </div>
                  <h1>{data.program_name}</h1>
                </div>
                <div className="sections">
                  <div className="flex items-center gap-2">
                    <BsBuildingFillCheck />
                    <h1 className="font-semibold">Section</h1>
                  </div>
                  <div className="flex gap-2">
                    {data.sections.map((section, index) => (
                      <h1 key={index}>{section.section_name}</h1>
                    ))}
                  </div>
                </div>
                <div className="subjects">
                  <div className="flex items-center gap-2">
                    <LuBookCopy />
                    <h1 className="font-semibold">Subject</h1>
                  </div>
                  <div className="flex gap-2">
                    {data.subjects.map((subject, index) => (
                      <h1 key={index}>{subject.subject_name}</h1>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailsModal;
