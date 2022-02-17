import React from "react";
import Link from "next/link";
import supabase from "../../lib/supabase";

import Footer from "../../components/footer";

const WorkoutClasses = (props) => {
  const [classes, setClasses] = React.useState(["bike-and-beats", "boxing", "circuit-traing", "pilates", "weights", "yoga"]);

  return (
    <div>
      <div className="bg-gray-100 flex flex-col items-center pt-40 pb-20 px-4 min-h-screen h-full md:px-0">
        <div className="w-2/3 mb-12">
          <h1 className="font-bold text-4xl">Classes</h1>
        </div>
        <div className="w-2/3 grid gap-6 grid-cols-1 lg:gap-8 lg:grid-cols-2 xl:gap-12 xl:grid-cols-2">
          {classes.map((item, index) => (
            <Link href={`/classes/${item}`}>
              <div className="w-full bg-white border shadow-sm transform transition duration-1000 cursor-pointer hover:shadow-md hover:scale-105 hover:z-50">
                <div className="h-auto w-full bg-blue-500 bg-center bg-cover bg-no-repeat">
                  <img src={"./images/classes/yoga/Yoga2.jpg"} className="w-full h-auto" />
                </div>
                <p className="text-lg p-6 capitalize">{item.replace("-", " ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
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

export default WorkoutClasses;
