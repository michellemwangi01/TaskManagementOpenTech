import React from "react";
import TasksList from "../Components/TasksList";
import Navbar from "../Components/Navbar";

const page = () => {
  return (
    <div className="relative">
      <div className="z-10 absolute top-0 right-0 pr-4 py-4">
        <Navbar />
      </div>
      <div className="landing-page-form flex flex-col justify-center align-middle my-auto">
        <h2 className="h1 text-white font-bold text-xl leading-tight">
          Task List
        </h2>
      </div>
      <div className="text-gray-700 par m-auto my-8 w-5/6 shadow-md shadow-green-100 absolute top-52 left-1/2 transform -translate-x-1/2 ">
        <TasksList />
      </div>
    </div>
  );
};

export default page;
