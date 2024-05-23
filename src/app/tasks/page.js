import React from "react";
import TasksList from "../Components/TasksList";

const page = () => {
  return (
    <div className="relative">
      <div className="landing-page-form flex flex-col justify-center align-middle my-auto">
        <h2 className="h1 text-white font-bold text-xl leading-tight">
          Task List
        </h2>
      </div>
      <div className="text-gray-700 par m-auto my-8 w-5/6 shadow-md shadow-green-100 absolute top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TasksList />
      </div>
    </div>
  );
};

export default page;
