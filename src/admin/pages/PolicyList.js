import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import axios from "axios";
import { faCircleChevronLeft, faCircleChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { TabsIcon } from "../../shared/Assets";

import ViewDetailsModal from "./components/ViewDetailsModal";

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10); // Change this value as needed

  useEffect(() => {
    const apiUrl = `https://premium.treatweb.com/public/api/admin/policies/list?currentPage=${currentPage}&perPage=${perPage}`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("Response", res);
        const data = res.data;
        setPolicies(data.policies.data);
        setTotalPages(data.policies.last_page);
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
      });
  }, [currentPage, perPage]);

  function generateBreadcrumbData(rightContent = null) {
    return {
      leftItems: [
        { label: "", link: "/" },
        { label: "Policies", link: "/policy/list" },
      ],
      middleContent: "",
      rightItems: rightContent,
    };
  }

  const searchRightContent = (
    <>
      <Link to={'/policy/add/'}>
        <img src={TabsIcon.addpartner} alt="Add Policy" />
      </Link>
    </>
  );

  function handleViewDetails(policy) {
    setSelectedPolicy(policy);
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
    setSelectedPolicy(null);
  }

  let handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  let handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <Layout
      title="Policy List"
      breadcrumbData={generateBreadcrumbData(searchRightContent)}
    >
      <Card>
        <table className="min-w-full table-auto border border-gray-300 tablez">
          <thead className="shade">
            <tr>
              <th className="px-4 py-2">SI</th>
              <th className="px-4 py-2">Plan Type</th>
              <th className="px-4 py-2">Policy Type</th>
              <th className="px-4 py-2">Partner</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Customer Mobile</th>
              <th className="px-4 py-2">Insurer</th>
              <th className="px-4 py-2">OD Premium</th>
              <th className="px-4 py-2">TP Premium</th>
              <th className="px-4 py-2">NET Premium</th>
              <th className="px-4 py-2">Risk Start Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={policy.id}>
                <td className="px-4 py-2">{(currentPage - 1) * perPage + index + 1}</td>
                <td className="px-4 py-2">
                  {policy.policyable.policy_type.business_type.name}
                </td>
                <td className="px-4 py-2">
                  {policy.policyable.policy_type.name}
                </td>
                <td className="px-4 py-2">{policy.partner.name}</td>
                <td className="px-4 py-2">{policy.customer.name}</td>
                <td className="px-4 py-2">{policy.customer.mobile}</td>
                <td className="px-4 py-2">{policy.insurer.name}</td>
                <td className="px-4 py-2">{policy.policyable.own_damage}</td>
                <td className="px-4 py-2">{policy.policyable.third_party}</td>
                <td className="px-4 py-2">{policy.net_amount}</td>
                <td className="px-4 py-2">{policy.policy_date}</td>
                <td className="px-4 py-2 flex justify-between w-120">
                  <button onClick={() => handleViewDetails(policy)} className="text-white rounded mr-2">
                    <img src={TabsIcon.eye} alt="View Details" className={"actionicon"}/>
                  </button>
                  <button className="text-white rounded mr-2">
                    <Link to={`/policy/edit/${policy.id}`} className="px-1">
                      <img src={TabsIcon.editpartner} alt="Edit Details" className={"actionicon"}/>
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <div>
            Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, policies.length)} of {totalPages * perPage} entries
          </div>
          <div>
            <button onClick={handlePrevPage} className="px-2 text-xl py-2">
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>
            <button onClick={handleNextPage} className="px-2 text-xl py-2">
              <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>
          </div>
        </div>
      </Card>

      {isModalVisible && (
        <ViewDetailsModal onClose={closeModal} policy={selectedPolicy} title="Policy Details">
          {selectedPolicy && (
            <div className="mt-1">
              {/* Business Details */}
              <h2 className="text-xl font-semibold subtitle">
                Business Details
              </h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Business Type:</p>
                  <span className="labelvalue">
                    {selectedPolicy.policyable.policy_type.business_type.name}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Policy Type:</p>
                  <span className="labelvalue">
                    {selectedPolicy.policyable.policy_type.name}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">TP Amount:</p>
                  <span className="labelvalue">{selectedPolicy.policyable.third_party}</span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">OD Amount:</p>
                  <span className="labelvalue">{selectedPolicy.policyable.own_damage}</span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Net Amount:</p>
                  <span className="labelvalue">
                    {selectedPolicy.net_amount}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Risk Start Date:</p>
                  <span className="labelvalue">
                    {selectedPolicy.policy_date}
                  </span>
                </div>
              </div>

              {/* Insurer Details */}
              <h2 className="text-xl font-semibold subtitle">
                Insurer Details
              </h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Company Name:</p>
                  <span className="labelvalue">
                    {selectedPolicy.insurer.name ?? "NA"}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Policy Number:</p>
                  <span className="labelvalue">
                    {selectedPolicy.insurer_policy_number ?? "NA"}
                  </span>
                </div>
              </div>

              {/* Partner Details */}
              <h2 className="text-xl font-semibold subtitle">
                Partner Details
              </h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Partner Code:</p>
                  <span className="labelvalue">
                    {selectedPolicy.partner.partner_code}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Partner Name:</p>
                  <span className="labelvalue">
                    {selectedPolicy.partner.name}
                  </span>
                </div>
              </div>

              {/* Customer Details */}
              <h2 className="text-xl font-semibold subtitle">
                Customer Details
              </h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Name:</p>
                  <span className="labelvalue">
                    {selectedPolicy.customer.name}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Mobile:</p>
                  <span className="labelvalue">
                    {selectedPolicy.customer.mobile}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Email:</p>
                  <span className="labelvalue">
                    {selectedPolicy.customer.email}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Address:</p>
                  <span className="labelvalue">
                    {selectedPolicy.customer.address}
                  </span>
                </div>
              </div>

              {/* Vehicle Details */}
              <h2 className="text-xl font-semibold subtitle">Vehicle Details</h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold">Registration Number:</p>
                  <span className="labelvalue">
                    {selectedPolicy.policyable.registration_number}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Type:</p>
                  <span className="labelvalue">
                    {selectedPolicy.policyable.vehicle_type.name}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Make:</p>
                  <span className="labelvalue">
                    {selectedPolicy.policyable.vehicle_make.name}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Model:</p>
                  <span className="labelvalue">
                    {selectedPolicy.policyable.vehicle_model.name}
                  </span>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Fuel:</p>
                  <span>{selectedPolicy.policyable.fuel_type.name}</span>
                </div>
                <div className="col-span-1"></div>
              </div>
              <div className="grid gap-1 mb-2">
                <table className="min-w-full table-auto border tablecommission">
                  <tbody>
                    {
                      (selectedPolicy.policyable.capacities != null) &&
                      Object.keys(selectedPolicy.policyable.capacities).length > 0 ? (
                        Object.entries(selectedPolicy.policyable.capacities).map((capacity, c_index) => (
                          <tr key={c_index}>
                            {c_index === 0 ?
                              <th>{capacity[1]}</th>
                              :
                              <th>{capacity[1]}</th>
                            }
                            {
                              Object.entries(selectedPolicy.policyable.ages).map((age, index) => (
                                c_index === 0 ? (
                                  <th key={index}>{age[1]}</th>
                                ) : (
                                  <td key={index}>{selectedPolicy.policyable.agecapacity[capacity[0]][age[0]].value}</td>
                                )
                              ))
                            }
                            {c_index === 0 ? (
                              <th className="border-2 shade text-center">
                                DEAL
                              </th>
                            ) : (
                              <td>{selectedPolicy.policyable.agecapacity[capacity[0]].deal}</td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr><td style={{ display: 'none' }}>No Age Capacity found.</td></tr>
                      )}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold">Comments/Remarks:</p>
                  <span>{selectedPolicy.comments}</span>
                </div>
              </div>
            </div>
          )}
        </ViewDetailsModal>
      )}
    </Layout>
  );
};

export default PolicyList;
