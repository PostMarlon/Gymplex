import React from "react";
import supabase from "../../lib/supabase";

import Footer from "../../components/footer";

const WorkoutClasses = (props) => {
  const [classes, setClasses] = React.useState(["bike-and-beats", "boxing", "circuit-traing", "pilates", "weights", "yoga"]);

  return (
    <div>
      <div className="bg-gray-100 flex flex-col items-center pt-40 pb-20 px-4 min-h-screen h-full md:px-20">
        <div className="w-full mb-12">
          <h1 className="font-bold text-4xl capitalize">{props.class.replace(/\-/g, " ")}</h1>
        </div>

        <div className="w-full bg-white border shadow-sm p-6">
          <div className="flex items-start">
            <div className="w-1/3 h-64 bg-cover bg-center" style={{ backgroundImage: `url(../images/classes/yoga/Yoga.jpg)` }}></div>

            <div className="pt-0 p-4 w-2/3">
              <h3 className="text-xl capitalize">{props.class.replace(/\-/g, " ")}</h3>
              <p className="text-gray-800">
                Yoga is a mind and body practice. Various styles of yoga combine physical postures, breathing techniques, and meditation or relaxation. ... It involves movement, meditation, and breathing
                techniques to promote mental and physical well-being. There are several types of yoga and many disciplines within the practice.
              </p>
              <p className="text-gray-800">
                Other physical benefits of yoga include: increased flexibility. increased muscle strength and tone. improved respiration, energy and vitality. maintaining a balanced metabolism. weight
                reduction. cardio and circulatory health.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between space-x-4">
            {[...Array(4)].map((item, index) => (
              <img src={`../images/classes/yoga/Yoga${index + 2}.jpg`} className="h-60 w-auto mt-4" />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ query, req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/account/signin" } };
  }
  return { props: { user, class: query.class } };
}

export default WorkoutClasses;
