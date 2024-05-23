import React from "react";
import IssueForm from "../Components/IssueForm";
import Navbar from "../Components/Navbar";

const page = () => {
  return (
    <div>
      <div className="z-10 absolute top-0 right-0 pr-4 py-4">
        <Navbar />
      </div>
      <div className="landing-page-form flex flex-col justify-center align-middle my-auto">
        <h2 className="h1 text-white font-bold text-xl leading-tight">
          Submit an <span>Inquiry</span> or <span>Issue</span>
        </h2>
      </div>
      <IssueForm />
    </div>
  );
};

export default page;
