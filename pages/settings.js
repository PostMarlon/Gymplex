import Footer from "../components/footer";
import SelectBox from "../components/shared/select";
import supabase from "../lib/supabase";

const Settings = (props) => {
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col items-center">
      <div className="xl:flex p-20">
        <div className="xl:w-screen">
          <div className=" w-full pl-20">
            <div className="pb-8 md:py-8 xl:pl-12 xl:pr-4">
              <div className="flex flex-col bg-white p-6 rounded shadow-sm">
                <p>Choose a personal trainer to get assigned to</p>
                <SelectBox defaultOption={"Select personal trainer"} name={"trainer"} options={["George", "Hamilton", "Manny", "Pacquiao", "Harry", "Marlon"]} />
                <button className="w-full text-white mt-8 bg-blue-600 p-2 rounded">Submit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:w-full">
          <div className="w-full">
            <div className="pb-8 md:py-8 xl:pl-12 xl:pr-4">
              <div className="flex flex-col bg-white p-6 rounded shadow-sm">
                <p>Account Management</p>
                <div>
                  <p className="mb-0.5">First name</p>
                  <input className="w-full bg-gray-200 p-2 rounded mb-4" type="text" placeholder="First name" />

                  <p className="mb-0.5">Last name</p>
                  <input className="w-full bg-gray-200 p-2 rounded mb-4" type="text" placeholder="Last name" />

                  <p className="mb-0.5">Email</p>
                  <input className="w-full bg-gray-200 p-2 rounded mb-4" type="email" placeholder="email@emailaddress.com" />

                  <p className="mb-0.5">Password</p>
                  <input className="w-full bg-gray-200 p-2 rounded mb-2" type="password" placeholder="Password" />
                </div>

                <div>
                  <button className="w-full text-white mt-8 bg-blue-600 p-2 rounded mb-2">Update Information</button>
                </div>

                <div className="text-center">
                  <p className="font-bold">Permentantly delete this account</p>
                  <p className="text-red-500 ">Delete account</p>
                </div>

                <div className="text-center">
                  <p>Dark Mode</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-screen">
        <Footer />
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

export default Settings;
