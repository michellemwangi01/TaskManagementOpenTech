import React, { useRef, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from "../layout";

const ClientForm = () => {
  const { clientItems, clientID, setClientID } = useContext(DataContext);
  const [isCreatingNewClient, setIsCreatingNewClient] = useState(false);
  const [isSelectingExistingClient, setIsSelectingExistingClient] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const form = useRef();

  const showCreateNewClient = () => {
    setIsCreatingNewClient(true);
    setIsSelectingExistingClient(false);
  };

  const showSelectExistingClient = () => {
    setIsCreatingNewClient(false);
    setIsSelectingExistingClient(true);
  };

  const clientSelection = (data) => {
    const selectedClientId = data.client_id;
    setClientID(selectedClientId);
    console.log(selectedClientId);
    toast(
      `Client has been successfully selected! You may proceed to log a request for the client.`,
      {
        autoClose: 3000,
        type: "success",
      }
    );
  };

  const clientCreation = async (data) => {
    console.log(data);
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
        console.log(responseData.data.id);
        setClientID(responseData.data.id);
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
    console.log(clientID);
  };

  return (
    <fieldset className="my-4 scheduler-border border border-1 border-blue-900 w-2/3 lg:w-1/3 p-4 rounded-md mx-0">
      <legend className="scheduler-border text p-1 font-semibold">
        Client Details
      </legend>
      <div className="flex flex-col justify-start">
        <button className="mb-6" onClick={showSelectExistingClient}>
          Select an existing Client
        </button>
        <button className="mb-6" onClick={showCreateNewClient}>
          Create a New Client
        </button>
      </div>

      {isCreatingNewClient && (
        <form
          onSubmit={handleSubmit(clientCreation)}
          className="w-full"
          ref={form}
        >
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
          <button type="submit">Save New Client</button>
        </form>
      )}

      {isSelectingExistingClient && (
        <form
          onSubmit={handleSubmit(clientSelection)}
          className="w-full"
          ref={form}
        >
          <div className="SelectExistingClient">
            <div className="relative z-0 w-full mb-6 group">
              <select
                {...register("client_id", { required: true })}
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
                <span className="text text-red-500">Client is required</span>
              )}
            </div>
          </div>
          <button type="Submit">Save Selected Client</button>
        </form>
      )}
    </fieldset>
  );
};

export default ClientForm;
