import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {count} from "react-table/src/aggregations";

const OptionModel = ({ onClose, partnerId }) => {
    
    const [showGlobalList, setShowGlobalList] = useState(false);
    const [selectedCommissions, setSelectedCommissions] = useState([]);
    const [commissionData, setCommissionData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate(`/partner/addcommision/${partnerId}`);
    };

    const handleSelectGlobal = () => {
        // Show global list when clicked on "Select from Global"
        setShowGlobalList(true);
        fetchGlobalCommissions();
    };

    const fetchGlobalCommissions = () => {
        const apiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/list?currentPage=${currentPage}`;

        axios.get(apiUrl)
            .then(response => {
                console.log("globalcommission Form Response", response);
                const responseData = response.data.global_commissions.data;
                
                setCommissionData(responseData);
                setTotalPages(response.data.global_commissions.last_page);
            })
            .catch(error => {
                console.error("Error fetching global commissions:", error);
            });
    };

    const handleCheckboxChange = (commissionId) => {
        if (selectedCommissions.includes(commissionId)) {
            // If the commission is already selected, deselect it
            setSelectedCommissions(selectedCommissions.filter(id => id !== commissionId));
        } else {
            // Otherwise, select it and clear previously selected commissions
            setSelectedCommissions([commissionId]);
        }
    };

    const handleSubmit = () => {
        const apiUrl = `https://premium.treatweb.com/public/api/admin/partner/set/globalcommission`;
    
        const formData = {
            partnerid: partnerId,
            globalid: selectedCommissions[0],
        };
    
        console.log("Global Form Submitted", formData);
        axios.post(apiUrl, formData)
            .then(response => {
                console.log("Form submitted successfully:", response);
                const { status, message } = response.data; 
                toast.success(message, {
                    position: 'top-right'
                });
                setTimeout(() => {
                    navigate('/admin/partners');
                }, 1500);
              
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                // Display error toast
                toast.error('An error occurred while submitting the form. Please try again later.', {
                    position: 'top-right'
                });
            });
    };
    
    

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-auto p-8 policymodal">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                    </button>
                </div>
                {!showGlobalList && (
                    <div>
                        <h1>How do you want to add commission?</h1>
                        <div className="option-buttons mt-4 space-x-4">
                            <button onClick={handleSelectGlobal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Global Commission</button>
                            <button onClick={handleCreateNew} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Specific</button>
                        </div>
                    </div>
                )}
                {showGlobalList && (

                    <div>
                        <h1 className="py-4 px-4 text-xl font-bold">Global commission List</h1>
                        <table className="min-w-full table-auto border border-gray-300 tablez mb-3" style={{ tableLayout: 'auto' }}>
                            <thead className="shade">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Commission Type</th>
                                    <th className="px-4 py-2">Company name</th>
                                    <th className="px-4 py-2">Coverage Type</th>
                                    <th className="px-4 py-2">Vehicle Type</th>
                                    <th className="px-4 py-2">OD %</th>
                                    <th className="px-4 py-2">TP %</th>
                                    <th className="px-4 py-2">NET %</th>
                                    <th className="px-4 py-2">Flat Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissionData.map((commission) => (
                                    <tr key={commission.id}>
                                        <td className="px-4 py-2"><input
                                            type="checkbox"
                                            name="globalid"
                                            checked={selectedCommissions.includes(commission.id)}
                                            onChange={() => handleCheckboxChange(commission.id)}
                                        /></td>
                                        <td className="px-4 py-2">{commission.commission_type.name ?? 'NA'}</td>
                                        <td className="px-4 py-2">{commission.insurer.name ?? 'NA'}</td>
                                        <td className="px-4 py-2">{(commission.coverage_type)?commission.coverage_type.name : 'NA'}</td>
                                        <td className="px-4 py-2">{(commission.vehicle_type)?commission.vehicle_type.name : 'NA'}</td>
                                        <td className="px-4 py-2">{commission.od_percent ?? 'NA'}</td>
                                        <td className="px-4 py-2">{commission.tp_percent ?? 'NA'}</td>
                                        <td className="px-4 py-2">{commission.net_percent ?? 'NA'}</td>
                                        <td className="px-4 py-2">{commission.flat_amount ?? 'NA'}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        
                        <button onClick={handleSubmit} className="text-white mt-3 rounded save">SUBMIT</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OptionModel;
