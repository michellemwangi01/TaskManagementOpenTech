"use client";
import React from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientForm from "./ClientForm";
import TaskForm from "./TaskForm";

const IssueForm = () => {
  const sendEmail = (data) => {
    emailjs
      .sendForm(
        "service_qqiovkg",
        "template_anbk7dx",
        form.current,
        "Et-gQwpscuzgDG164"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          toast(
            "Your message has been successfully sent! Please await our response.",
            { autoClose: 3000, type: "success" }
          );
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div
      style={{ color: "#567c23" }}
      className="par w-full flex flex-col justify-center items-center m-auto border-solid rounded-lg border-blue-900"
    >
      {/* -------------------- Client Form -------------------- */}
      <ClientForm />

      {/* -------------------- Task Form -------------------- */}
      <TaskForm />
    </div>
  );
};

export default IssueForm;
