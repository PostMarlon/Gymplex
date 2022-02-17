import React, { useEffect } from "react";
import Footer from "../components/footer";
import moment from "moment";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Logic
import { CreateBooking, GetBookings, DeleteBooking } from "../logic/bookings";

// Components
import NewBooking from "../components/bookings/newBooking";
import ActiveBookings from "../components/bookings/activeBookings";
import BookingsHistory from "../components/bookings/bookingsHistory";
import GetHelp from "../components/bookings/getHelp";
import supabase from "../lib/supabase";

const Booking = (props) => {
  const [state, setState] = React.useState({
    showHelpOverlay: false,
  });

  const [bookings, setBookings] = React.useState({ all: [], active: [], history: [] });

  const [newBooking, setNewBooking] = React.useState({
    bookingType: "",
    className: "",
    bookingDate: "",
    bookingTime: "",
  });

  useEffect(async () => {
    const bookings = await GetBookings();

    const all = [...bookings].map((item) => ({ date: moment(item.time).format("Do MMM YYYY, HH:mm"), type: item.type === "gym-session" ? "Gym Session" : `${item.class_name} Session`, id: item.id }));
    const active = [...bookings]
      .filter((item, index) => moment().isBefore(item.time))
      .map((item) => ({ date: moment(item.time).format("Do MMM YYYY, HH:mm"), type: item.type === "gym-session" ? "Gym Session" : `${item.class_name} Session`, id: item.id }));
    const history = [...bookings]
      .filter((item, index) => moment().isAfter(item.time))
      .map((item) => ({ date: moment(item.time).format("Do MMM YYYY, HH:mm"), type: item.type === "gym-session" ? "Gym Session" : `${item.class_name} Session`, id: item.id }));

    setBookings({ all, active, history });
  }, []);

  return (
    <div>
      <div className="bg-gray-100 pt-20 pb-20" style={{ minHeight: "100vh" }}>
        {state.showHelpOverlay ? (
          <GetHelp
            showHelpOverlay={() => {
              setState({ ...state, showHelpOverlay: false });
            }}
          />
        ) : null}

        <div className="xl:flex p-6">
          <div className="xl:w-1/2">
            <NewBooking
              state={newBooking}
              setState={setNewBooking}
              onSubmitForm={async () => {
                toast.promise(CreateBooking(newBooking), {
                  pending: "Creating new booking",
                  success: {
                    render({ data }) {
                      let booking = { date: moment(data[0].time).format("Do MMM YYYY, HH:mm"), type: data[0].type === "gym-session" ? "Gym Session" : `${data[0].class_name} Session`, id: data[0].id };
                      setBookings({ ...bookings, active: [...bookings.active, booking] });
                      setNewBooking({
                        bookingType: "",
                        className: "",
                        bookingDate: "",
                        bookingTime: "",
                      });
                      return "New booking created 👌";
                    },
                  },
                  error: {
                    render({ data }) {
                      return `${JSON.stringify(data)} 🤯`;
                    },
                  },
                });
              }}
            />
            <ActiveBookings
              bookings={bookings.active}
              showHelpOverlay={() => {
                setState({ ...state, showHelpOverlay: true });
              }}
              deleteBooking={async (id) => {
                await DeleteBooking(id);
                const newBookings = [...bookings.active].filter((item) => item.id !== id);
                setBookings({ ...bookings, active: newBookings });
              }}
            />
          </div>

          <div className="xl:w-1/2">
            <BookingsHistory history={bookings.history} />
          </div>
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

export default Booking;
