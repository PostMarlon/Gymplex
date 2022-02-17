import React from "react";

// Booking history component
const ActiveBooking = ({ booking }) => {
  return (
    <div className="flex bg-gray-200 p-2 py-3 rounded px-4 my-2">
      <div className="w-full md:flex">
        <p className="font-medium opacity-60">{booking.date}</p>
        <p className="md:pl-4 capitalize">{booking.type} (60 minutes)</p>
      </div>
    </div>
  );
};

const BookingsHistory = ({ history }) => {
  return (
    <div className="w-full">
      <div className="py-8 xl:pr-12 xl:pl-4 ">
        <div className="flex flex-col bg-white p-6 rounded shadow-sm">
          <p className="text-xl font-medium mb-4">Booking History</p>
          <div>
            {history.map((item, index) => (
              <ActiveBooking booking={item} key={Math.random()} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsHistory;
