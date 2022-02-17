import Link from "next/link";

const WorkoutPlan = ({ showOverlay = () => {}, recommendation }) => {
  return (
    <div className="fixed top-0 flex items-center justify-center h-screen w-screen z-50" style={{ backgroundColor: "rgba(0,0,0,.72)" }}>
      <div className="bg-white w-2/3 lg:w-1/2 -mt-40  rounded">
        <div className="flex">
          <div style={{ minHeight: 350, minWidth: 350, backgroundImage: `url(./images/plans/${recommendation.type}/img${recommendation.level}.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />

          <div className="w-full p-6 flex flex-col justify-between">
            <div>
              <p className="font-bold text-2xl">{recommendation.title}</p>
              <p>{recommendation.description}</p>
            </div>
            <div>
              <a href={`./pdf/plans/${recommendation.type}/plan${recommendation.level}.pdf`} target="__blank">
                <button className="w-full text-white mt-8 bg-blue-600 p-2 rounded">Download PDF file</button>
              </a>
              <button className="w-full text-black mt-4 bg-gray-200 p-2 rounded mb-2" onClick={showOverlay}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkoutPlan;
