import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div style={{ backgroundImage: "url(./images/Background.jpg)", height: "100vh", width: "100vw" }}>
      <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "rgba(0,0,0,0.70)" }}>
        <div className="text-center">
          <h1 className="text-white text-5xl font-bold uppercase sm:text-7xl md:text-8xl">
            Welcome to <br /> Gymplex
          </h1>
        </div>

        <div className="text-center pt-12 pb-20 text-xl">
          <p className="text-white font-medium text-base px-6 sm:text-lg md:text-xl md:px-0">
            This is a website where you can join the gym called GymPlex
            <br className="hidden md:block" />
            and book your gymtime/classes. Here you can also find the right workout plan for you
            <br className="hidden md:block" />
            and more!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between ">
          <div className="mb-8 md:mr-12 md:mb-0">
            <Link href="/account/signin" passhref>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold hover:text-white py-2 px-4 border-none hover:border-transparent rounded w-80 h-10 sm:h-12">Sign in</button>
            </Link>
          </div>

          <div>
            <Link href="/account/signup" passhref>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold hover:text-white py-2 px-4 border-none hover:border-transparent rounded w-80 h-10 sm:h-12">Join now</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-screen">
        <Footer />
      </div>
    </div>
  );
}
