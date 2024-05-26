"use client";
import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { DataContext } from "../layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TasksList = () => {
  const { taskListItems, setTaskListItems } = useContext(DataContext);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTaskListItems(taskListItems.filter((task) => task.id !== taskId));
      toast(`Task No.${taskId} has been successfully deleted!`, {
        autoClose: 3000,
        type: "success",
      });
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 text-center rounded-sm">
        <thead style={{ backgroundColor: "#567c23" }}>
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Request ID
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Category
            </th>

            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Severity
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Platform
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Issue Description
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Status
            </th>

            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Assigned to
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Client Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Client Email
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Client Phone
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Company Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Client Location
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Preferred Contact Method
            </th>

            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              <MdEdit />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center ">
          {taskListItems
            .slice()
            .reverse()
            .map((item, index) => {
              const clientDetails = item.client_details
                ? JSON.parse(item.client_details)
                : null;

              const rowStyle =
                item.status === "In progress"
                  ? { backgroundColor: "lightyellow" }
                  : item.status === "Complete"
                  ? { backgroundColor: "lightgreen" }
                  : {};

              return (
                <tr key={index} style={rowStyle}>
                  <td className="px-6 py-4 whitespace-nowrap">{`#${item.id}`}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.category}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.severity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.platform}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.assigned_to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clientDetails && clientDetails.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clientDetails && clientDetails.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clientDetails && clientDetails.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clientDetails && clientDetails.company_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clientDetails && clientDetails.client_location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {clientDetails && clientDetails.preferred_contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-800">
                    <MdDelete onClick={() => handleDeleteTask(item.id)} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
