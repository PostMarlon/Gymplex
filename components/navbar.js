import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/router";

import supabase from "../lib/supabase";

const Navbar = ({ url, navLink, mobile = false }) => {
  const router = useRouter();
  const [sidebarStatus, setSidebarStatus] = React.useState(false);

  const ToggleNav = () => {
    setSidebarStatus(sidebarStatus ? false : true);
  };

  const Navigate = (page) => {
    router.push(page);
    ToggleNav();
  };

  return (
    <div className="fixed z-50">
      <header className="w-screen top-0 fixed z-30 bg-white flex justify-between items-center px-8 py-4 lg:hidden">
        <FaBars onClick={() => ToggleNav()} />
        {/* <Link href={"/"} passHref>
          <img className="object-contain h-6 w-full" src={`${window.location.origin}/images/Logo.png`} alt="logo"></img>
        </Link>  */}
      </header>

      <nav
        className="transition-all duration-300 h-full flex flex-col justify-between items-stretch bg-white py-5 drop-shadow fixed z-50 lg:flex lg:justify-evenly lg:flex-row lg:items-center lg:w-full lg:h-auto"
        style={mobile ? (sidebarStatus ? { width: "300px", marginLeft: "0" } : { width: "300px", marginLeft: "-350px" }) : null}
      >
        <div className="hidden text-black tracking-wider font-bold uppercase text-sm lg:block">
          {/* <Link href={"/"} passHref>
            <img className="object-contain h-10 w-full" src={`${window.location.origin}/images/Logo.png`} alt="logo"></img>
          </Link> */}
        </div>

        <ul className="p-4 lg:p-0">
          {navLink.map((item, index) =>
            !item.icon ? (
              <li
                onClick={() => Navigate(item.path)}
                className={`p-4 text-black no-underline tracking-wider uppercase text-sm lg:inline-block cursor-pointer lg:px-4 ${url === item.path ? "font-bold" : ""}`}
                key={item.path}
              >
                <div className="w-full cursor-pointer">{item.text}</div>
              </li>
            ) : null
          )}
        </ul>

        <ul className="display-inline justify-around p-4 lg:p-0">
          <li className="inline-block px-4 cursor-pointer">
            <Link href={"settings"} passHref>
              <AiFillSetting />
            </Link>
          </li>
          <li className="inline-block px-4 cursor-pointer">
            <Link href={"cart"} passHref>
              <FaShoppingCart />
            </Link>
          </li>
          <li
            className="inline-block px-4 cursor-pointer"
            onClick={async () => {
              supabase.auth.signOut();
              router.push("/");
            }}
          >
            <FaSignOutAlt />
          </li>
        </ul>
      </nav>

      {sidebarStatus ? <div onClick={() => ToggleNav()} className="fixed h-screen w-screen bg-gray-300 z-40 opacity-75 lg:hidden"></div> : null}
    </div>
  );
};

export default Navbar;
