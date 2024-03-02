import React, { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const OptionModel = ({ onClose, onYesClick }) => {
    const [step, setStep] = useState(1);
    const [selectedCommissions, setSelectedCommissions] = useState([]);
    const [globalCommissions, setGlobalCommissions] = useState([]);
    const [commissionData, setCommissionData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (step === 3) {
            fetchGlobalCommissions();
        }
    }, [step]);


    const fetchGlobalCommissions = () => {
        const apiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/list?currentPage=${currentPage}`;

        axios.get(apiUrl)
            .then(response => {
                console.log(response);
                const responseData = response.data.global_commissions.data;
                setCommissionData(responseData);
                setTotalPages(response.data.global_commissions.last_page);
            })
            .catch(error => {
                console.error("Error fetching global commissions:", error);
            });
    };


    const handleYesClick = () => {
        setStep(2);
    };

    const handleCreateNew = () => {
        console.log("Redirecting to create new commission...");
    };

    const handleSelectGlobal = () => {
        setStep(3);
        console.log("Showing list of global commissions...");
    };


    const handleCheckboxChange = (commissionId) => {
       
        setSelectedCommissions((prevSelectedCommissions) => {
            if (prevSelectedCommissions.includes(commissionId)) {
               
                return prevSelectedCommissions.filter((id) => id !== commissionId);
            } else {
                
                return [...prevSelectedCommissions, commissionId];
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-1/3 p-8 policymodal">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                    </button>
                </div>
                {step === 1 && (
                    <div>
                        <h1>Do you wish to continue with commission ad?</h1>
                        <div className="option-buttons mt-4 space-x-4">
                            <button onClick={handleYesClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Yes</button>
                            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">No</button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h1>How do you want to add commission?</h1>
                        <div className="option-buttons mt-4 space-x-4">
                            <button onClick={handleCreateNew} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create New</button>
                            <button onClick={handleSelectGlobal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Select from Global</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h1 className="py-4">Global commission List</h1>
                        <ul className="">
                            {commissionData.map((commission) => (
                                <li key={commission.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedCommissions.includes(commission.id)}
                                            onChange={() => handleCheckboxChange(commission.id)}
                                        />
                                        {commission.insurer.name}
                                    </label>
                                    
                                </li>
                                
                            ))}
                            
                        </ul>
                        <button className="px-4 my-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">SUBMIT</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OptionModel;
