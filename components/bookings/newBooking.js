import React, { useEffect } from "react";
import SelectBox from "../shared/select.js";
import moment from "moment";

const Booking = ({ state, setState, onSubmitForm }) => {
  const [times, setTimes] = React.useState([]);

  useEffect(() => {
    let times = [...Array(24)].map((item, index) => (index < 10 ? `0${index}:00` : `${index}:00`)).slice(6);

    if (state.bookingDate === moment().format("dddd-Do-MMMM").toString().toLowerCase()) {
      times = [];
      let currentTime = moment().add(1, "hours").format("HH:00");
      times.push(currentTime);

      while (times[times.length - 1] !== "00:00") {
        let currentTime = moment()
          .add(times.length + 1, "hours")
          .format("HH:00");
        times.push(currentTime);
      }
    }

    setTimes(times);
  }, [state.bookingDate]);

  return (
    <div className="w-full">
      <div className="pb-8 md:py-8 xl:pl-12 xl:pr-4">
        <div className="flex flex-col bg-white p-6 rounded shadow-sm">
          <p className="text-xl font-medium mb-4">New Booking</p>
          <p className="mb-0.5">Choose a booking type</p>
          <SelectBox
            state={state.bookingType}
            defaultOption={"Choose Booking type"}
            name={"BookingType"}
            options={["Class", "Gym Session"]}
            onSelect={(e) => {
              setState({ bookingType: e.target.value, className: "", bookingTime: "" });
            }}
          />

          {state.bookingType === "class" ? (
            <SelectBox
              state={state.className}
              name={"className"}
              options={["Yoga", "Cardio", "Boxing", "Bike-Beats", "weight", "pilates"]}
              defaultOption={"Choose a class"}
              onSelect={(e) => {
                setState({ ...state, className: e.target.value });
              }}
            />
          ) : null}

          {state.bookingType == "gym-session" || state.className !== "" ? (
            <SelectBox
              state={state.bookingDate}
              name={"bookingDate"}
              options={[...Array(7)].map((item, index) => moment().add(index, "days").format("dddd Do MMMM"))}
              defaultOption={"Choose a booking date"}
              onSelect={(e) => {
                setState({ ...state, bookingDate: e.target.value });
              }}
            />
          ) : null}

          {state.bookingType == "gym-session" || state.className !== "" ? (
            <SelectBox
              state={state.bookingTime}
              name={"bookingTime"}
              options={times}
              defaultOption={"Choose a booking time"}
              onSelect={(e) => {
                setState({ ...state, bookingTime: e.target.value });
              }}
            />
          ) : null}

          <div>
            <button className="w-full text-white mt-8 bg-blue-600 p-2 rounded mb-2" onClick={onSubmitForm}>
              Book Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
