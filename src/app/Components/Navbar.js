"use client";
import React, { useState, useEffect } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const router = useRouter();

  useEffect(() => {
    if (router) {
      // Set the active item based on the current path
      const path = router.pathname;
      switch (path) {
        case "/":
          setActiveItem("home");
          break;
        case "/tasks":
          setActiveItem("tasks");
          break;
        case "/logissue":
          setActiveItem("logissue");
          break;
        default:
          setActiveItem("home");
      }
    }
  }, [router?.pathname]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName); // Update active item state on click
  };
  return (
    <nav className="  w-full z-10 top-0 bg-transparent font-serif">
      <div className=" max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div
          className="items-center justify-end hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li
              className={`hover:text-green-600 ${
                activeItem === "home" ? "active" : ""
              }`}
            >
              <Link
                href="/"
                className="block py-2 px-3 md:p-0  text-xl  rounded"
                onClick={() => handleItemClick("home")}
              >
                Home
              </Link>
            </li>
            <li
              className={`hover:text-green-600 ${
                activeItem === "home" ? "active" : ""
              }`}
            >
              <Link
                href="/logissue"
                className="block py-2 px-3 md:p-0  text-xl  rounded"
                onClick={() => handleItemClick("logissue")}
              >
                Create Task
              </Link>
            </li>
            <li
              className={`hover:text-green-600 ${
                activeItem === "home" ? "active" : ""
              }`}
            >
              <Link
                href="/tasks"
                className="block py-2 px-3 md:p-0  text-xl  rounded"
                onClick={() => handleItemClick("tasks")}
              >
                Tasks List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
