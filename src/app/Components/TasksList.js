import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const data = [
  {
    client_name: "Michelle Mwangi",
    client_email: "michellemwangim@gmail.com",
    client_phone: "0700562291",
    company_name: "Sensei",
    client_location: "MasaiMara",
    preferred_contact_method: "Email",
    category: "Technical Issue",
    platform_service_product: "Service",
    severity: "Critical",
    issue_description: "this is the details of the issue / task",
  },
  {
    client_name: "Michelle Mwangi",
    client_email: "michellemwangim@gmail.com",
    client_phone: "0700562291",
    company_name: "Sensei",
    client_location: "MasaiMara",
    preferred_contact_method: "Email",
    category: "Technical Issue",
    platform_service_product: "Service",
    severity: "Critical",
    issue_description: "this is the details of the issue / task",
  },
  {
    client_name: "Michelle Mwangi",
    client_email: "michellemwangim@gmail.com",
    client_phone: "0700562291",
    company_name: "Sensei",
    client_location: "MasaiMara",
    preferred_contact_method: "Email",
    category: "Technical Issue",
    platform_service_product: "Service",
    severity: "Critical",
    issue_description: "this is the details of the issue / task",
  },
  {
    client_name: "Michelle Mwangi",
    client_email: "michellemwangim@gmail.com",
    client_phone: "0700562291",
    company_name: "Sensei",
    client_location: "MasaiMara",
    preferred_contact_method: "Email",
    category: "Technical Issue",
    platform_service_product: "Service",
    severity: "Critical",
    issue_description: "this is the details of the issue / task",
  },
];
const TasksList = ({}) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 text-center rounded-sm">
        <thead style={{ backgroundColor: "#567c23" }}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Request ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Client Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Client Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Client Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Company Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Client Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Preferred Contact Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Platform/Service/Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Severity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Issue Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              <MdEdit />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center ">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-center">{`00${
                index + 1
              }`}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.client_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.client_email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.client_phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.company_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.client_location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.preferred_contact_method}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.platform_service_product}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.severity}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.issue_description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-green-800">
                <MdDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
