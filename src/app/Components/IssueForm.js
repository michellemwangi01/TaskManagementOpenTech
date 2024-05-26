"use client";
import React, { useRef, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from "../layout";

const IssueForm = () => {
  const { taskListItems, setTaskListItems, clientItems } =
    useContext(DataContext);
  const [isCreatingNewClient, setIsCreatingNewClient] = useState(false);
  const [isSelectingExistingClient, setIsSelectingExistingClient] =
    useState(false);

  const showCreateNewClient = () => {
    setIsCreatingNewClient(true);
    setIsSelectingExistingClient(false);
  };

  const showSelectExistingClient = () => {
    setIsCreatingNewClient(false);
    setIsSelectingExistingClient(true);
  };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const form = useRef();

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

  const handleAddTask = async (data) => {
    let newClient_id;

    // post a new client
    const newClient = {
      name: data.client_name,
      email: data.client_email,
      phone: data.client_phone,
      company_name: data.company_name,
      preferred_contact: data.preferred_contact,
      client_location: data.client_location,
    };
    try {
      const response = await fetch("http://localhost:5000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      if (response.ok) {
        const responseData = await response.json();
        newClient_id = responseData.data.id;
        toast(`Client has been successfully created!`, {
          autoClose: 3000,
          type: "success",
        });
      } else {
        console.error("Failed to add client:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }

    // post a new task
    const newTask = {
      description: data.description,
      completed: 1,
      category: data.category,
      platform: data.platform,
      severity: data.severity,
      status: data.status,
      assigned_to: data.assigned_to,
      client_id: newClient_id,
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
        toast(`Task has been successfully created!`, {
          autoClose: 3000,
          type: "success",
        });
        setTaskListItems([...taskListItems, data]);
        sendEmail(data);
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
  };

  return (
    <div
      style={{ color: "#567c23" }}
      className="par w-full flex flex-col justify-center items-center m-auto border-solid rounded-lg border-blue-900"
    >
      <form
        onSubmit={handleSubmit(handleIssueSubmission)}
        className="w-full"
        ref={form}
      >
        <div className="flex align-middle justify-center m-auto w-5/6 flex-wrap lg:flex-nowrap">
          {/* Client Details */}
          <fieldset className="my-4 scheduler-border border border-1 border-blue-900 w-2/3 lg:w-1/3 p-4 rounded-md mx-0">
            <legend className="scheduler-border text p-1 font-semibold">
              Client Details
            </legend>
            <div className="flex flex-col">
              <button className="mb-6" onClick={showCreateNewClient}>
                Create a New Client
              </button>

              <button className="mb-6" onClick={showSelectExistingClient}>
                Select an existing Client
              </button>
            </div>
            {isCreatingNewClient && (
              <div id="CreateNewClient">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    {...register("client_name", { required: true })}
                    className="block text-black rounded-md py-2.5 px-0 w-full text-md bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    style={{ borderBottom: "1px solid #0b2250" }}
                  />
                  <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Client Name
                  </label>
                  {errors.client_name && (
                    <span className="text text-red-500">
                      Client Name is required
                    </span>
                  )}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    {...register("client_email", { required: true })}
                    className="block text-black rounded-md py-2.5 px-0 w-full text-md bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    style={{ borderBottom: "1px solid #0b2250" }}
                  />
                  <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Client Email
                  </label>
                  {errors.client_email && (
                    <span className="text text-red-500">
                      Client Email is required
                    </span>
                  )}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="tel"
                    {...register("client_phone", { required: true })}
                    className="block text-black rounded-md py-2.5 px-0 w-full text-md bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    style={{ borderBottom: "1px solid #0b2250" }}
                  />
                  <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Client Phone Number
                  </label>
                  {errors.client_phone && (
                    <span className="text text-red-500">
                      Client Phone Number is required
                    </span>
                  )}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    {...register("company_name")}
                    className="block text-black rounded-md py-2.5 px-0 w-full text-md bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    style={{ borderBottom: "1px solid #0b2250" }}
                  />
                  <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Company Name (if applicable)
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    {...register("client_location")}
                    className="block text-black rounded-md py-2.5 px-0 w-full text-md bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    style={{ borderBottom: "1px solid #0b2250" }}
                  />
                  <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Client Location
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <select
                    {...register("preferred_contact", { required: true })}
                    className="text-black block py-2.5 px-0 w-full rounded-md text-md bg-transparent border-0 border-b-2 border-blue-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    style={{ borderBottom: "1px solid #0b2250" }}
                  >
                    <option value="select" disabled selected>
                      Select
                    </option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                  <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Preferred Contact Method
                  </label>
                  {errors.preferred_contact && (
                    <span className="text text-red-500">
                      Preferred Contact Method is required
                    </span>
                  )}
                </div>
              </div>
            )}

            {isSelectingExistingClient && (
              <div className="SelectExistingClient">
                <div className="relative z-0 w-full mb-6 group">
                  <select
                    {...register("client_id")}
                    className="text-black block py-2.5 px-0 w-full rounded-md text-md bg-transparent border-0 border-b-2 border-blue-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    style={{ borderBottom: "1px solid #0b2250" }}
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    {clientItems.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Select a Client
                  </label>
                  {errors.client_id && (
                    <span className="text text-red-500">
                      Client is required
                    </span>
                  )}
                </div>
              </div>
            )}
          </fieldset>

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
                <option value="Technical Issue">Technical Issue</option>
                <option value="Feature Request">Feature Request</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Account/Billing Inquiry">
                  Account/Billing Inquiry
                </option>
                <option value="Service Outage/Disruption">
                  Service Outage/Disruption
                </option>
                <option value="Feedback/Suggestions">
                  Feedback/Suggestions
                </option>
                <option value="Follow-up">Follow-up</option>
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
                <span className="text text-red-500">
                  Description is required
                </span>
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
                <option value="inprogress">In Progress</option>
                <option value="complete">Complete</option>
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
                <option value="Michelle Mwangi">Michelle Mwangi</option>
                <option value="Selina Musau">Selina Musau</option>
                <option value="John Doe">John Doe</option>
              </select>
              <label className="peer-focus:font-medium absolute text-normal font-serif font-normal duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Assigned to
              </label>
              {errors.severity && (
                <span className="text text-red-500">
                  Assigned to is required
                </span>
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
    </div>
  );
};

export default IssueForm;
