import React from "react";

const Schedules = () => {
  return (
    <div className="w-full ml-[320px] overflow-auto">
      <div className="px-8 py-10 pb-16">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/schedblack.svg" alt="change profile" />
          <h1 className="text-2xl poppins-medium uppercase">
            Schedules (ONGOING)
          </h1>
        </div>

        <div className="schedules-table__container my-10">
          <div className="mb-8 overflow-auto">
            <table className="min-w-full border">
              <tbody>
                <tr className="border border-b">
                  <td className="px-4 py-1 font-bold">DEPARTMENT NAME</td>
                  <td className="px-4 py-1" colSpan="6">
                    College of Information Technology and Communication
                  </td>
                </tr>
                <tr className="border border-b">
                  <td className="px-4 py-1 font-bold">PROGRAM NAME</td>
                  <td className="px-4 py-1" colSpan="6">
                    Information Technology
                  </td>
                </tr>
                <tr className="border border-b">
                  <td className="px-4 py-1 font-bold">YEAR LEVEL</td>
                  <td className="px-4 py-1" colSpan="6">
                    2nd Year
                  </td>
                </tr>
                <tr className="border border-b">
                  <td className="px-4 py-1 font-bold">SEMESTER</td>
                  <td className="px-4 py-1" colSpan="6">
                    1st Semester
                  </td>
                </tr>
                <tr className="whitespace-nowrap  border">
                  <th className="px-4 py-2 text-left font-bold">TIME</th>
                  <th className="px-4 py-2 text-left font-bold">MONDAY</th>
                  <th className="px-4 py-2 text-left font-bold">TUESDAY</th>
                  <th className="px-4 py-2 text-left font-bold">WEDNESDAY</th>
                  <th className="px-4 py-2 text-left font-bold">THURSDAY</th>
                  <th className="px-4 py-2 text-left font-bold">FRIDAY</th>
                  <th className="px-4 py-2 text-left font-bold">SATURDAY</th>
                </tr>
                <tr className="whitespace-nowrap border hover:bg-gray-50">
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                </tr>
                <tr className="whitespace-nowrap border hover:bg-gray-50">
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                </tr>
                {/* Add more rows as necessary */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
