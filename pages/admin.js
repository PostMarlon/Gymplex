import React from "react";
import moment from "moment";
import supabase from "../lib/supabase";
import { GetUserDetails, UpdateUserDetails } from "../logic/auth";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

const Admin = () => {
  const [users, setUsers] = React.useState([]);
  const [updateDetails, setUpdateDetails] = React.useState({});

  React.useEffect(() => {
    const run = async () => {
      try {
        const users = await GetUserDetails();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    run();
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-center pt-20 pb-20 px-4 min-h-screen h-full md:pt-40 md:px-0">
      <div className="w-full h-full p-2 md:p-8 lg:w-2/3 lg:p-0">
        <div className="mb-6">
          <p className="font-bold text-4xl">Admin</p>
        </div>
        <div className="flex flex-col justify-end items-end">
          <div className="w-full h-1/2 bg-white rounded-sm">
            <table className="w-full">
              <thead className="w-full">
                <tr>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    First name
                  </th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Last name
                  </th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Email</th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Joined
                  </th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-gray-700">{user.first_name}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-gray-700">{user.last_name}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-gray-700">{user.email}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-gray-700">{moment(user.created_at).format("Do MMM YYYY, HH:mma")}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-gray-700 flex justify-end space-x-3">
                      <span className="hover:text-blue-500 cursor-pointer transition">
                        <BsFillPencilFill onClick={() => setUpdateDetails(user)} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col space-y-4 bg-white p-6 rounded-sm w-full mt-4 md:w-1/2">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                name="first_name"
                id="first_name"
                placeholder="First name"
                className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
                value={updateDetails.first_name}
                onChange={(e) => setUpdateDetails({ ...updateDetails, first_name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                name="last_name"
                id="last_name"
                placeholder="Last name"
                className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
                value={updateDetails.last_name}
                onChange={(e) => setUpdateDetails({ ...updateDetails, last_name: e.target.value })}
              />
            </div>
            <div>
              <button
                onClick={async () => {
                  try {
                    await UpdateUserDetails(updateDetails);
                    const newUsers = users.map((user) => (user.user_id === updateDetails.user_id ? updateDetails : user));
                    setUsers(newUsers);
                    setUpdateDetails({});
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="inline-flex items-center text-white px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent bg-blue-600 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black w-full justify-center"
              >
                Update user details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/account/signin" } };
  }
  return { props: { user } };
}

export default Admin;
