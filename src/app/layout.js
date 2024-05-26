"use client";

import React, { createContext, useState, useEffect } from "react";
export const DataContext = createContext();
import axios from "axios";

import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [taskListItems, setTaskListItems] = useState([]);
  const [clientItems, setclientItems] = useState([]);
  const [clientID, setClientID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get All Tasks
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTaskListItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError(error);
        setLoading(false);
      });

    // Get All Clients
    axios
      .get("http://localhost:5000/clients")
      .then((response) => {
        setclientItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
        setError(error);
        setLoading(false);
      });
  }, [taskListItems]);

  // console.log(taskListItems);
  // console.log(clientItems);

  // if (loading) {
  //   return (
  //     <html>
  //       <body>Loading...</body>
  //     </html>
  //   );
  // }

  // if (error) {
  //   return (
  //     <html>
  //       <body>Error...</body>
  //     </html>
  //   );
  // }

  const data = {
    taskListItems,
    setTaskListItems,
    clientItems,
    clientID,
    setClientID,
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
