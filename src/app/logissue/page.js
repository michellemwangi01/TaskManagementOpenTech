import React from "react";
import IssueForm from "../Components/IssueForm";

const page = () => {
  return (
    <div>
      <div className="landing-page-form flex flex-col justify-center align-middle my-auto">
        <h2 className="h1 font-bold text-xl leading-tight">
          Submit an Inquiry or Issue
        </h2>
      </div>
      <IssueForm />
    </div>
  );
};

export default page;
