import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import axios from "axios";
import { faEye, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"; 
import Modal from "./components/Modal";

const PolicyList = () => {
    const [policies, setPolicies] = useState([]);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const apiUrl = 'https://premium.treatweb.com/public/api/admin/policies/list';

        axios.get(apiUrl)
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
            rightItems: rightContent
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
        <Layout title="Policy List" breadcrumbData={generateBreadcrumbData(searchRightContent)}>
            <Card>
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
                                   
                                    <Link
                                        to={`/policy/add`}
                                        className="bg-indigo-500 text-white px-2 py-1 rounded"
                                    >
                                        <FontAwesomeIcon icon={faUser} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {isModalVisible && (
                <Modal onClose={closeModal}>
                   
                    <h2 className="text-xl font-semibold mb-4">Policy Details</h2>
                    {selectedPolicy && (
                        <div>
                            <p>Policy ID: {selectedPolicy.id}</p>
                            
                        </div>
                    )}
                </Modal>
            )}

        </Layout>
    );
}

export default PolicyList;
