import React, { useRef, useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DataContext } from "../layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = () => {
  const form = useRef();
  const { taskListItems, setTaskListItems, clientID } = useContext(DataContext);
  const router = useRouter();

  const userRoles = [
    "Administrator",
    "Manager",
    "Supervisor",
    "Team Leader",
    "Specialist",
    "Analyst",
    "Coordinator",
    "Technician",
    "Assistant",
    "Operator",
  ];

  const issueCategories = [
    "Technical Issue",
    "Feature Request",
    "General Inquiry",
    "Account/Billing Inquiry",
    "Service Outage/Disruption",
    "Feedback/Suggestions",
    "Follow-up",
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddTask = async (data) => {
    // post a new task
    const newTask = {
      description: data.description,
      completed: 1,
      category: data.category,
      platform: data.platform,
      severity: data.severity,
      status: data.status,
      assigned_to: data.assigned_to,
      client_id: clientID,
    };
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        toast(`Task has been successfully created! Wait to be redirected...`, {
          autoClose: 5000,
          type: "success",
        });
        setTaskListItems([...taskListItems, data]);
        router.push("/tasks");
        reset();
      } else {
        console.error("Failed to add task:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  const handleIssueSubmission = (data) => {
    handleAddTask(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleIssueSubmission)}
      className="w-full"
      ref={form}
    >
      <div className="flex align-middle justify-center m-auto w-5/6 flex-wrap lg:flex-nowrap">
        {/* Issue Details */}
        <fieldset className=" my-4  scheduler-border border border-1 border-blue-900 w-2/3 lg:w-1/3 p-4 rounded-md mx-4">
          <legend className="scheduler-border text p-1 font-semibold">
            Issue Details
          </legend>
          <div className="relative z-0 w-full mb-6 group">
            <select
              {...register("category", { required: true })}
              className="text-black block py-2.5 px-0 w-full rounded-md text-md bg-transparent border-0 border-b-2 border-blue-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              style={{ borderBottom: "1px solid #0b2250" }}
            >
              <option value="" disabled selected>
                Select
              </option>
              {issueCategories.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Category
            </label>
            {errors.category && (
              <span className="text text-red-500">Category is required</span>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              {...register("platform", { required: true })}
              className="text-black block py-2.5 px-0 w-full rounded-md text-md bg-transparent border-0 border-b-2 border-blue-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              style={{ borderBottom: "1px solid #0b2250" }}
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Software">Software</option>
              <option value="Service">Service</option>
              <option value="Product">Product</option>
            </select>
            <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Platform
            </label>
            {errors.platform_service_product && (
              <span className="text text-red-500">Platform is required</span>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              {...register("severity", { required: true })}
              className="text-black block py-2.5 px-0 w-full rounded-md text-md bg-transparent border-0 border-b-2 border-blue-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              style={{ borderBottom: "1px solid #0b2250" }}
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Critical">Critical</option>
              <option value="Major">Major</option>
              <option value="Minor">Minor</option>
            </select>
            <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Severity
            </label>
            {errors.severity && (
              <span className="text text-red-500">Severity is required</span>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              {...register("description", { required: true })}
              className="block text-black rounded-md py-2.5 px-0 w-full text-md bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              style={{
                borderBottom: "1px solid #0b2250",
                minHeight: "100px",
              }}
            />
            <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Description
            </label>
            {errors.issue_description && (
              <span className="text text-red-500">Description is required</span>
            )}
          </div>
        </fieldset>

        {/* Task Details */}
        <fieldset className="my-4 scheduler-border border border-1 border-blue-900 w-2/3 lg:w-1/3 p-4 rounded-md mx-0">
          <legend className="scheduler-border text p-1 font-semibold">
            Task Details
          </legend>

          <div className="relative z-0 w-full mb-6 group">
            <select
              {...register("status", { required: true })}
              className="text-black block py-2.5 px-0 w-full rounded-md text-md bg-transparent border-0 border-b-2 border-blue-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              style={{ borderBottom: "1px solid #0b2250" }}
            >
              <option value="In progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Status
            </label>
            {errors.preferred_contact && (
              <span className="text text-red-500">Status</span>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              {...register("assigned_to", { required: true })}
              className="text-black block py-2.5 px-0 w-full rounded-md text-md bg-transparent border-0 border-b-2 border-blue-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              style={{ borderBottom: "1px solid #0b2250" }}
            >
              <option value="" disabled selected>
                Select
              </option>
              {userRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Assigned to
            </label>
            {errors.severity && (
              <span className="text text-red-500">Assigned to is required</span>
            )}
          </div>
        </fieldset>
      </div>

      {/* Submit Button*/}
      <div className="flex justify-center m-auto w-full">
        <button
          type="submit"
          className="button  text-white rounded w-1/6 p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-1 hover:border-blue-900 text-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
