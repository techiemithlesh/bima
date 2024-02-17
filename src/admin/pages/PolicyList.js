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
import {json, Link} from "react-router-dom";
import { TabsIcon } from "../../shared/Assets";

import PolicyViewModal from "./components/PolicyViewModal";

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const apiUrl =
      "https://premium.treatweb.com/public/api/admin/policies/list";
    // "http://phpstorm.local:9000/api/admin/policies/list";

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
        <table className="min-w-full table-auto border border-gray-300 tablez">
          <thead className="shade">
            <tr>
              <th className="px-4 py-2">SI</th>
              <th className="px-4 py-2">PLAN TYPE</th>
              <th className="px-4 py-2">POLICY TYPE</th>
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
                <td className="px-4 py-2">{policy.policyable.policy_type.business_type.name}</td>
                <td className="px-4 py-2">{policy.policyable.policy_type.name}</td>
                <td className="px-4 py-2">{policy.partner.name}</td>
                <td className="px-4 py-2">{policy.customer.name}</td>
                <td className="px-4 py-2">{policy.customer.mobile}</td>
                <td className="px-4 py-2">{policy.insurer.name}</td>
                <td className="px-4 py-2">{policy.policyable.own_damage}</td>
                <td className="px-4 py-2">{policy.policyable.third_party}</td>
                <td className="px-4 py-2">{policy.net_amount}</td>
                <td className="px-4 py-2">{policy.policy_date}</td>
                <td className="px-4 py-2 flex justify-between">
                  <button
                    onClick={() => handleViewDetails(policy)}
                    className=" text-white rounded mr-2" >
                    <img src={TabsIcon.eye} alt=""/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {isModalVisible && (
        <PolicyViewModal onClose={closeModal} policy={policies}>
          {selectedPolicy && (
            <div className="mt-1">
              <h2 className="text-xl font-semibold subtitle">Business Details</h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Business Type:
                  <span className="labelvalue">{selectedPolicy.policyable.policy_type.business_type.name}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Policy Type:
                  <span className="labelvalue">{selectedPolicy.policyable.policy_type.name}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">TP Amount:
                  <span className="labelvalue">{selectedPolicy.tp_amount}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">OD Amount:
                  <span className="labelvalue">{selectedPolicy.od_amount}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Net Amount:
                  <span className="labelvalue">{selectedPolicy.net_amount}</span>
                </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Risk Start Date:
                  <span className="labelvalue">{selectedPolicy.risk_start_date}</span>
                </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold subtitle">Insurer Details</h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Company Name:
                  <span className="labelvalue">{selectedPolicy.insurer.company_name??"NA"}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Policy Number:
                  <span className="labelvalue">{selectedPolicy.insurer.policy_number??"NA"}</span>
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold subtitle">Partner Details</h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Partner Code:
                  <span className="labelvalue">{selectedPolicy.partner.partner_code}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Partner Name:
                  <span className="labelvalue">{selectedPolicy.partner.name}</span>
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold subtitle">Customer Details</h2>
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold label">Name:
                  <span className="labelvalue">{selectedPolicy.customer.name}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Mobile:
                  <span className="labelvalue">{selectedPolicy.customer.mobile}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Email:
                  <span className="labelvalue">{selectedPolicy.customer.email}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold label">Address:
                  <span className="labelvalue">{selectedPolicy.customer.address}</span>
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold subtitle">Vehicle Details</h2>

              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="col-span-1">
                  <p className="font-semibold">Registration Number:
                  <span className="labelvalue">{selectedPolicy.policyable.registration_number}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Type:
                  <span className="labelvalue">{selectedPolicy.policyable.type}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Make:
                  <span className="labelvalue">{selectedPolicy.policyable.make}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Model:
                  <span className="labelvalue">{selectedPolicy.policyable.model}</span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-semibold">Fuel:
                  <span>{selectedPolicy.policyable.fuel}</span>
                  </p>
                </div>
                <div className="col-span-1"></div>
                  <div className="col-span-1">
                    {/*{JSON.stringify((selectedPolicy.policyable.capacities).length)}*/}
                  <table>
                    <tr>
                      {/*{(() => {*/}
                      {/*if((selectedPolicy.policyable.agecapacity).length>0){*/}
                      {/*  {JSON.parse(selectedPolicy.policyable.agecapacity)}*/}
                      {/*   //  selectedPolicy.policyable.ages.forEach( (val,k)=>{*/}
                      {/*   //    <td>{JSON.parse(val)}</td>*/}
                      {/*   // })*/}
                      {/*}*/}
                      {/*})()}*/}
                    </tr>
                  </table>
                </div>

                </div>
            </div>
          )}
        </PolicyViewModal>
      )}
    </Layout>
  );
};

export default PolicyList;
