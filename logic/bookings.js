import supabase from "../lib/supabase";
import moment from "moment";

export const CreateBooking = (booking) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Parse date and time into timestamp.
      let date = { ...booking }.bookingDate.split("-").slice(1);
      let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      date = `${months.indexOf(date[1]) + 1}-${date[0].replace(/\D/g, "")}-${moment().format("YYYY")}`;
      let bookingTime = moment(`${date} ${booking.bookingTime}`);

      let payload = {
        type: booking.bookingType,
        class_name: booking.className,
        time: bookingTime,
        user_id: supabase.auth.user().id,
      };

      const { data, error } = await supabase.from("Bookings").insert(payload);
      if (error) throw error;

      resolve(data);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const GetBookings = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.from("Bookings").select("*").eq("user_id", supabase.auth.user().id);
      if (error) throw error;

      resolve(data);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const DeleteBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.from("Bookings").delete().in("id", [id]);
      if (error) throw error;

      console.log(data);

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};
