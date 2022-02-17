import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import router, { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import supabase from "../lib/supabase";
import { ToastContainer } from "react-toastify";

const handleAuthChange = async (event, session) => {
  await fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [url, setUrl] = useState("");
  const navLink = [
    { text: "Bookings", path: "/bookings" },
    { text: "Check Progression", path: "/checkprogression" },
    { text: "Workout Plans", path: "/workoutplans" },
    { text: "Classes", path: "/classes" },
    { text: "Shop", path: "/shop" },
    { text: "Admin", path: "/admin" },
    { text: "Super Admin", path: "/superadmin" },
    { text: "Settings", path: "/settings", icon: true },
    { text: "Cart", path: "/cart", icon: true },
  ];

  // Useffect runs on page load. Similar to $('document').on('ready').
  useEffect(() => {
    setUrl(window.location.pathname);

    // Gets events from router, runs a function on 'routeChangeStart'
    router.events.on("routeChangeStart", setUrl);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", setUrl);
    };
  }, []);
  //make sure you have callback array to stop the function

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      await handleAuthChange(event, session);
      if (event === "SIGNED_IN") {
        router.push("/bookings");
      }
      setUser(session?.user || {});
    });
    setUser(supabase.auth?.user() || {});
    return () => authListener.unsubscribe();
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover />

      <div>
        <div className="lg:hidden">{user ? <Navbar url={url} navLink={navLink} mobile={true} /> : null}</div>
        <div className="hidden lg:block">{user ? <Navbar url={url} navLink={navLink} /> : null}</div>
      </div>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
