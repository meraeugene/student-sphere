import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdmins } from "../../features/users/adminsSlice";

const Users = () => {
  const adminUsers = useSelector((state) => state.admins.adminUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  return (
    <div className="w-full ml-[300px] overflow-auto ">
      <div className="px-8 py-10 ">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/user-black.svg" alt="users" />
          <h1 className="text-2xl poppins-medium uppercase ">
            Users Management
          </h1>
        </div>

        <div className="admin-table__container ">
          {adminUsers.length > 0 ? (
            <div className="overflow-auto ">
              <table className=" min-w-full shadow-sm   ">
                <thead>
                  <tr className="whitespace-nowrap shadow-sm shadow-blue-200  border">
                    <th className="px-4 py-2  text-left font-bold">USERNAME</th>
                    <th className="px-4 py-2  text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      LAST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">EMAIL</th>
                    <th className="px-4 py-2  text-left font-bold">
                      PHONE NUMBER
                    </th>
                    <th className="px-4 py-2  text-left font-bold">GENDER</th>
                    <th className=" px-4  py-2 text-left font-bold">
                      DATE OF BIRTH
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="whitespace-nowrap   hover:bg-gray-50 border"
                    >
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.first_name}</td>
                      <td className="px-4 py-2">{user.last_name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phone_number}</td>
                      <td className="px-4 py-2">{user.gender}</td>
                      <td className="px-4 py-2">{user.date_of_birth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex  bg-red-100 rounded-md items-center   play-regular text-lg px-4 py-3 font-bold gap-2 text-red-800">
              <MdErrorOutline color="red" />
              <h1> No Admin Users</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
