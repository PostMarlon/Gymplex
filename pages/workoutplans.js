import React from "react";
import Footer from "../components/footer";
import SelectBox from "../components/shared/select";
import WorkoutPlan from "../components/workoutPlans/workoutplan";
import supabase from "../lib/supabase";

import Recommendation from "../logic/workoutplan";

const WorkoutPlans = (props) => {
  const [state, setState] = React.useState({
    aim: "",
    gymTime: "",
    level: "",
    height: 0,
    weight: 0,
    age: 0,
  });
  const [recommendation, setRecommendation] = React.useState({});

  const [workoutPlanOverlay, setWorkoutPlanOverlay] = React.useState(false);

  return (
    <div>
      <div className="bg-gray-100 flex flex-col items-center pt-20 pb-20" style={{ minHeight: "100vh" }}>
        <div className="w-full flex flex-col items-center mb-8 lg:mb-0">
          <div className="flex flex-col justify-between items-center w-full px-4 lg:flex-row-reverse lg:w-2/3 lg:px-0">
            <div className="w-full flex justify-center items-center md:w-2/3 lg:w-1/2">
              <img src="./images/image1.png" className="w-9/12" />
            </div>
            <div className="text-center lg:text-left">
              <p className="font-bold text-5xl mb-4">New to the gym?</p>
              <p className="text-2xl font-light">
                We can make your goal come true <br className="hidden lg:block" /> by recieving your own personalised workout plan now!
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center lg:flex-row">
          <div className="hidden w-full justify-center items-center md:w-1/2 md:flex">
            <img src="./images/image2.png" className="w-9/12" />
          </div>

          <div className="flex justify-between items-center w-full p-6 md:p-12 lg:w-2/3">
            <div className="w-full">
              <p>What is your aim?</p>
              <SelectBox
                state={state.aim}
                defaultOption={"What is your aim?"}
                name={"aims"}
                options={["Lose fat", "Gain strength", "Gain muscles"]}
                onSelect={(e) => {
                  setState({ ...state, aim: e.target.value });
                }}
              />
              <p>How long do you spend exercising at the gym per week?</p>
              <SelectBox
                onSelect={(e) => {
                  setState({ ...state, gymTime: e.target.value });
                }}
                state={state.gymTime}
                defaultOption={"Time spent exercising per week?"}
                name={"gymtime"}
                options={["0 hours", "1-3 hours", "5+ hours"]}
              />
              <p>What is your training level?</p>
              <SelectBox
                onSelect={(e) => {
                  setState({ ...state, level: e.target.value });
                }}
                state={state.level}
                defaultOption={"What is your training level?"}
                name={"level"}
                options={["No experience", "Beginner", "Intermediate", "Professional"]}
              />
              <div className="flex flex-col justify-between sm:flex-row">
                <div className="sm:pr-2 sm:w-1/3">
                  <p className="mb-0.5">What is your height?</p>
                  <input
                    className="w-full bg-gray-200 p-2 rounded mb-4"
                    type="number"
                    placeholder="centimetres"
                    onChange={(event) => {
                      setState({ ...state, height: event.target.value });
                    }}
                  />
                </div>

                <div className="sm:px-2 sm:w-1/3">
                  <p className="mb-0.5">what is your weight?</p>
                  <input
                    className="w-full bg-gray-200 p-2 rounded mb-2"
                    type="number"
                    placeholder="Kilograms"
                    onChange={(event) => {
                      setState({ ...state, weight: event.target.value });
                    }}
                  />
                </div>

                <div className="sm:pl-2 sm:w-1/3">
                  <p className="mb-0.5">what is your age?</p>
                  <input
                    className="w-full bg-gray-200 p-2 rounded mb-2"
                    type="number"
                    placeholder="Age"
                    onChange={(event) => {
                      setState({ ...state, age: event.target.value });
                    }}
                  />
                </div>
              </div>
              <button
                className="w-full text-white mt-8 bg-blue-600 p-2 rounded"
                onClick={() => {
                  const newRecommendation = Recommendation(state);
                  setRecommendation(newRecommendation);
                  setWorkoutPlanOverlay(true);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {workoutPlanOverlay ? (
        <WorkoutPlan
          recommendation={recommendation}
          showOverlay={() => {
            setWorkoutPlanOverlay(false);
          }}
        />
      ) : null}

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

export default WorkoutPlans;
