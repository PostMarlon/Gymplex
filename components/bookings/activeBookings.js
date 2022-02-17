import React from "react";

const ActiveBooking = ({ booking, showHelpOverlay, deleteBooking }) => {
  return (
    <div className="md:flex bg-gray-200 p-2 py-3 rounded px-4 my-2">
      <div className="w-full md:flex">
        <p className="font-medium opacity-60">{booking.date}</p>
        <p className="md:pl-4 capitalize">{booking.type} (60 minutes)</p>
      </div>
      <div className="flex md:justify-end w-full mt-2 md:mt-0">
        <button className="font-medium opacity-75 appearance-none border-none bg-transparent" onClick={showHelpOverlay}>
          Get help
        </button>
        <p
          className=" ml-4 text-red-600 font-medium opacity-75 cursor-pointer"
          onClick={() => {
            if (confirm("Are you sure you want to delete this booking?") === true) {
              deleteBooking(booking.id);
            }
          }}
        >
          Delete
        </p>
      </div>
    </div>
  );
};

const ActiveBookings = ({ bookings, showHelpOverlay, deleteBooking }) => {
  return (
    <div className="w-full">
      <div className="xl:ml-12 xl:mr-4">
        <div className="flex flex-col bg-white p-6 rounded shadow-sm">
          <p className="text-xl font-medium mb-4">Active Bookings</p>
          <div>
            {bookings.map((item, index) => (
              <ActiveBooking key={Math.random()} booking={item} showHelpOverlay={showHelpOverlay} deleteBooking={deleteBooking} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveBookings;
