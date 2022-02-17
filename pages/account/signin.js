import React from "react";
import { SignIn } from "../../logic/auth";
import { useRouter } from "next/router";

import styles from "../../styles/Auth.module.css";

const signin = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authUser = () => {
    SignIn(email, password)
      .then((response) => {
        router.push("/bookings");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <img className="object-contain mb-8 h-10 w-full" src="../../images/Logo.png" alt="logo"></img>
      </div>
      <div className="border-2 border-slate-400 w-2/3 p-6">
        <div className=" ">
          <p className="mb-0.5">Email</p>
          <input className="w-full bg-gray-200 p-2 rounded mb-4" type="email" placeholder="email@emailaddress.com" value={email} onChange={(e) => setEmail(e.target.value)} />

          <p className="mb-0.5">Password</p>
          <input className="w-full bg-gray-200 p-2 rounded mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <p className="text-right opacity-75">Forgot password?</p>
        </div>

        <div>
          <button className="w-full text-white mt-8 bg-blue-600 p-2 rounded mb-2" onClick={() => authUser()}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default signin;
