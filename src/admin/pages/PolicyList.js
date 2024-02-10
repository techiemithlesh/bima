import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import axios from "axios";
import {
  faEye,
  faPlus,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import PolicyViewModal from "./components/PolicyViewModal";

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const apiUrl =
      "https://premium.treatweb.com/public/api/admin/policies/list";

    axios
      .get(apiUrl)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setPolicies(data.policies);
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
      });
  }, []);

  function generateBreadcrumbData(rightContent = null) {
    return {
      leftItems: [
        { label: "", link: "/" },
        { label: "Policies", link: "/admin/policies" },
      ],
      middleContent: "",
      rightItems: rightContent,
    };
  }

  const searchRightContent = (
    <input
      type="text"
      placeholder="Search with name"
      onChange={(e) => console.log("Search:", e.target.value)}
      className="border border-gray-300 px-8 py-2 rounded focus:outline-none focus:border-blue-500"
    />
  );
  function handleViewDetails(policy) {
    setSelectedPolicy(policy);
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
    setSelectedPolicy(null);
  }

  return (
    <Layout
      title="Policy List"
      breadcrumbData={generateBreadcrumbData(searchRightContent)}
    >
      <Card>
        <div className="text-right flex-justify-end mb-4">
          <Link
            to={`/policy/add`}
            className="bg-indigo-500 text-white px-2 py-1 rounded"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">SI</th>
              <th className="px-4 py-2">PLAN TYPE</th>
              <th className="px-4 py-2">PARTNER</th>
              <th className="px-4 py-2">CUSTOMER NAME</th>
              <th className="px-4 py-2">CUSTOMER MOBILE</th>
              <th className="px-4 py-2">INSURER</th>
              <th className="px-4 py-2">OD PREMIUM</th>
              <th className="px-4 py-2">TP PREMIUM</th>
              <th className="px-4 py-2">NET PREMIUM</th>
              <th className="px-4 py-2">RISK START DATE</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={policy.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{/* PLAN TYPE */}</td>
                <td className="px-4 py-2">{policy.partner.name}</td>
                <td className="px-4 py-2">{policy.customer.name}</td>
                <td className="px-4 py-2">{policy.customer.mobile}</td>
                <td className="px-4 py-2">{policy.insurer.name}</td>
                <td className="px-4 py-2">{/* OD PREMIUM */}</td>
                <td className="px-4 py-2">{/* TP PREMIUM */}</td>
                <td className="px-4 py-2">{policy.net_amount}</td>
                <td className="px-4 py-2">{policy.policy_date}</td>
                <td className="px-4 py-2 flex justify-between">
                  <button
                    onClick={() => handleViewDetails(policy)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {isModalVisible && (
        <PolicyViewModal onClose={closeModal} policy={policies}>
          <h2 className="text-xl font-semibold mb-4">Policy Details</h2>
          {selectedPolicy && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Policy Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <p className="font-semibold">Policy ID:</p>
                  <p>{selectedPolicy.id}</p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Added On:</p>
                  <p>{selectedPolicy.added_on}</p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Policy Type:</p>
                  <p>{selectedPolicy.policyable.policy_type.name}</p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Plan Type:</p>
                  <p>{selectedPolicy.plan_type}</p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">OD Amount:</p>
                  <p>{selectedPolicy.od_amount}</p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">TP Amount:</p>
                  <p>{selectedPolicy.tp_amount}</p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Net Amount:</p>
                  <p>{selectedPolicy.net_amount}</p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Risk Start Date:</p>
                  <p>{selectedPolicy.risk_start_date}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mt-6">
                    Insurer Details
                  </h3>
                  <p>
                    <span className="font-semibold">Company Name:</span>{" "}
                    {selectedPolicy.insurer.company_name}
                  </p>
                  <p>
                    <span className="font-semibold">Policy Number:</span>{" "}
                    {selectedPolicy.insurer.policy_number}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mt-6">
                    Customer Details
                  </h3>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {selectedPolicy.customer.name}
                  </p>
                  <p>
                    <span className="font-semibold">Mobile:</span>{" "}
                    {selectedPolicy.customer.mobile}
                  </p>
                </div>
                {/* <div className="col-span-2">
                  <h3 className="text-lg font-semibold mt-6">
                    Vehicle Details
                  </h3>
                  <p>
                    <span className="font-semibold">Registration Number:</span>{" "}
                    {selectedPolicy.vehicle.registration_number}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    {selectedPolicy.vehicle.type}
                  </p>
                  <p>
                    <span className="font-semibold">Make:</span>{" "}
                    {selectedPolicy.vehicle.make}
                  </p>
                  <p>
                    <span className="font-semibold">Model:</span>{" "}
                    {selectedPolicy.vehicle.model}
                  </p>
                  <p>
                    <span className="font-semibold">Fuel:</span>{" "}
                    {selectedPolicy.vehicle.fuel}
                  </p>
                </div> */}
              </div>
            </div>
          )}
        </PolicyViewModal>
      )}
    </Layout>
  );
};

export default PolicyList;
