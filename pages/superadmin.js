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
      <div className="w-screen h-screen p-2 md:p-8 lg:w-2/3 lg:p-0">
        <div className="mb-6">
          <p className="font-bold text-4xl"> Super Admin</p>
        </div>

        <div className="flex flex-col space-y-4 bg-white p-6 rounded-sm w-full mt-4 md:w-full bg">
          <div>
            <label htmlFor="Name_class" className="block text-sm font-medium text-gray-700">
              Add bew classes to the page
            </label>
            <input
              name="Name_class"
              placeholder="Name of class"
              className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
            />
          </div>
          <div>
            <input
              name="Description_class"
              placeholder="Description of the class"
              className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
            />
          </div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Import images
          </label>
          <div>
            <input type="file" id="myfile" name="myfile" multiple />
          </div>
          <div>
            <button className="float-right inline-flex items-center text-white px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent bg-blue-600  hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black w-1/2 justify-center">
              Add to page
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 bg-white p-6 rounded-sm w-full mt-4 md:w-full bg">
          <div>
            <label htmlFor="Name_item" className="block text-sm font-medium text-gray-700">
              Add bew classes to the page
            </label>
            <input
              name="Name_item"
              placeholder="Name of item"
              className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
            />
          </div>
          <div>
            <input
              name="Item_price"
              placeholder="Price"
              className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
            />
          </div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Import images
          </label>
          <div>
            <input type="file" id="myfile" name="myfile" multiple />
          </div>
          <div>
            <button className="float-right inline-flex items-center text-white px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent bg-blue-600  hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black w-1/2 justify-center">
              Add to store
            </button>
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
