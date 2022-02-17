import React from "react";
import { SignUp, InsertUserDetails } from "../../logic/auth";
import { useRouter } from "next/router";

import styles from "../../styles/Auth.module.css";

const signup = () => {
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authUser = async () => {
    try {
      await SignUp(email, password);
      await InsertUserDetails(firstName, lastName);

      router.push("/bookings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <img className="object-contain mb-8 h-10 w-full" src="../../images/Logo.png" alt="logo"></img>
      </div>
      <div className="border-2 border-slate-400 w-2/3 p-6">
        <div>
          <p className="mb-0.5">First name</p>
          <input className="w-full bg-gray-200 p-2 rounded mb-4" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <p className="mb-0.5">Last name</p>
          <input className="w-full bg-gray-200 p-2 rounded mb-4" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <p className="mb-0.5">Email</p>
          <input className="w-full bg-gray-200 p-2 rounded mb-4" type="email" placeholder="email@emailaddress.com" value={email} onChange={(e) => setEmail(e.target.value)} />

          <p className="mb-0.5">Password</p>
          <input className="w-full bg-gray-200 p-2 rounded mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button className="w-full text-white mt-8 bg-blue-600 p-2 rounded mb-2" onClick={() => authUser()}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default signup;
