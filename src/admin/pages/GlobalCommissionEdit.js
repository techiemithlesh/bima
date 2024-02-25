import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";
import axios, { formToJSON } from "axios";
import Loading from "react-loading";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const GlobalCommissionEdit = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [commissionData, setCommissionData] = useState(null);
    const [globalOptions, setGlobalOptions] = useState(null);

    const [formData, setFormData] = useState({
        insurer: '',
        business_type: '',
        makes: '',
        coverage_type: '',
        models: '',
        vehicle_types: '',
        two_wheeler_types: '',
        fuel_types: '',
        od_percent: '',
        flat_amount: '',
        net_percent_checkbox: '',
        net_percent: '',
        tp_percent: '',
        agecapacity: []
    });


    const [errors, setErrors] = useState({
        insurer: '',
        business_type: '',
        makes: '',
        coverage_type: '',
        models: '',
        vehicle_types: '',
        two_wheeler_types: '',
        fuel_types: '',
        od_percent: '',
        flat_amount: '',
        net_percent_checkbox: '',
        net_percent: '',
        tp_percent: '',
        agecapacity: []
    });

    useEffect(() => {
        // Fetch global commission options
        const apiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/options`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log("global option", data);
                setGlobalOptions(data.global_commission_options);
            })
            .catch((error) => {
                console.error("Error fetching global commission options:", error);
            });

        const commissionApiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/${id}`;
        axios.get(commissionApiUrl)
            .then(response => {
                console.log(response.data.global_commission);
                setCommissionData(response.data.global_commission);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching global commissions:", error);
            });
    }, [id]);


    const handleSave = () => {
        
        const formDataFromForm = new FormData(document.getElementById('form'));
        const formDataJSON = formToJSON(formDataFromForm);
        console.log(formDataJSON);
        const csrfToken = Cookies.get('XSRF-TOKEN');
      
        axios.post(`https://premium.treatweb.com/public/api/admin/global-commissions/update/${id}`, formDataJSON, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': csrfToken,
            },
        }).then((res) => {
            console.log("Response", res);
            const {message, success} = res.data;
            
            if (res.data.success) {
                toast.success("Commission updated successfully!", {
                    position: 'top-right'
                });
            } else {
                setErrors(message);
                toast.error("Failed to update commission. Please try again.", {
                    position: 'top-right'
                });
            }

        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.data) {
                console.log("error",error);
                const { message } = error.response.data;
              
                const serverErrors = Object.values(message).flat().join(", ");
                setErrors(serverErrors);
                setErrors(serverErrors);
                toast.error(serverErrors, {
                    position: 'top-right'
                })
            }
        });

      
    }

    const RightContent = (
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
            Save
        </button>
    );

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        console.log(name, value);
        console.log("Previous state:", commissionData);
        setCommissionData(prevData => ({
            
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        console.log("Updated state:", commissionData);
    };
   
    return (
        <Layout title="Edit Global commission" breadcrumbData={generateBreadcrumbData(RightContent)}>
            <Card bgColor="gray">
                {loading ? (
                    <div className="loading-overlay">
                        <div className="loading">
                            <Loading type="ball-triangle" color="#4fa94d" height={100} width={100} />
                        </div>
                    </div>
                ) : (
                    <form id="form">
                        <div className="input_container">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {/* Form Element 1 */}
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600" htmlFor="insurerList">Insurer</label>
                                    <select
                                        required
                                        name="insurer"
                                        id="insurerList"
                                        value={commissionData ? commissionData.insurer : ''}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select Insurer</option>
                                        {globalOptions && globalOptions.insurers.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.text}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.insurer && (
                                        <span className="error">{errors.insurer}</span>
                                    )}
                                </div>


                                {/* Form Element 2 */}
                                {commissionData && commissionData.business_type && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600" htmlFor="businessList">Lines Of Business</label>
                                        <select
                                            required
                                            name="business_type"
                                            id="businessList"
                                            value={commissionData.business_type}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">Select Line of Business</option>
                                            {globalOptions && globalOptions.commission_types.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.business_type && (
                                            <span className="error">{errors.business_type}</span>
                                        )}
                                    </div>
                                )}

                                {commissionData && commissionData.business_type && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Vehicle Type</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="vehicle_types"
                                            id="vehicle_types"
                                            value={commissionData.vehicle_types}
                                            onChange={handleInputChange}
                                        >
                                            {globalOptions && globalOptions.vehicle_types.map((item) => {

                                                return (
                                                    <option key={item.value} value={item.value} selected={item.value === commissionData.vehicle_type}>
                                                        {item.text}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {errors.vehicle_types && (
                                            <span className="error">{errors.vehicle_types}</span>
                                        )}
                                    </div>

                                )}

                                {globalOptions && globalOptions.coverage_types && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Coverage Type</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="coverage_type"
                                            id="coverage_type"
                                            value={commissionData.coverage_type}
                                            onChange={handleInputChange}
                                        >
                                            {globalOptions.coverage_types.map((item) => (
                                                <option key={item.value} value={item.value} selected={item.value === commissionData.coverage_type}>
                                                    {item.text}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.policy_type && (
                                            <span className="error">{errors.policy_type}</span>
                                        )}
                                    </div>
                                )}


                                {globalOptions && globalOptions.coverage_types && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Two Wheeler Type</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="two_wheeler_types"
                                            id="two_wheeler_types"
                                            value={commissionData.two_wheeler_types}
                                            onChange={handleInputChange}
                                        >
                                            {globalOptions.two_wheeler_types.map((item) => (
                                                <option key={item.value} value={item.value} selected={item.value === commissionData.two_wheeler_types}>
                                                    {item.text}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.two_wheeler_types && (
                                            <span className="error">{errors.two_wheeler_types}</span>)}
                                    </div>
                                )}


                                {globalOptions && globalOptions.fuel_types && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="fuel_types"
                                            id="fuel_types"
                                            value={commissionData.fuel_types}
                                            onChange={handleInputChange}
                                        >
                                            {globalOptions.fuel_types.map((item) => (
                                                <option key={item.value} value={item.value} selected={item.value === commissionData.fuel_types}>
                                                    {item.text}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.fuel_types && (
                                            <span className="error">{errors.fuel_types}</span>)}
                                    </div>
                                )}

                                {globalOptions && globalOptions.makes && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Makes</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="makes"
                                            id="makes"
                                            value={commissionData.makes}
                                            onChange={handleInputChange}
                                        >

                                            {globalOptions.makes.map((item) => (
                                                <option key={item.value} value={item} selected={item.value === commissionData.makes}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.fuel_types && (
                                            <span className="error">{errors.fuel_types}</span>)}
                                    </div>
                                )}

                                {globalOptions && globalOptions.makes && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Model</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="models"
                                            id="models"
                                            value={commissionData.models}
                                            onChange={handleInputChange}
                                        >

                                            {globalOptions.models.map((item) => (
                                                <option key={item.value} value={item.value} selected={item.value === commissionData.models}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.fuel_types && (
                                            <span className="error">{errors.fuel_types}</span>)}
                                    </div>
                                )}



                            </div>
                        </div>

                        {/* FORM INPUT CONTAINER END HERE */}

                        {/* TABLE CONTAINER START HERE */}

                        {commissionData.vehicle_types === '1' && (
                            <div className="table_container">

                                <table className="min-w-full table-auto border-2 border-gray-300 comission">

                                    <tbody>
                                        {
                                            commissionData &&
                                            commissionData.global_commission_options.engines
                                                .filter((engine) => engine.text.toLowerCase().includes('cc') | engine.text.toLowerCase().includes('age'))
                                                .map((engine, index) => (

                                                    <tr className="shade" data-index={engine} data-index_={index == '0'}>
                                                        {index === '0' ? <th className="border-b shade p-2">{commissionData.global_commission_options.engines[0].text}</th> :
                                                            <th className=""> <input className="text-x text-center shade" value={engine.text} />
                                                            </th>
                                                        }
                                                        {commissionData &&
                                                            commissionData.global_commission_options.vehicle_ages.map((ages, sn) => (

                                                                index === 0 ? <th className="border-2 shade text-center" key={sn}>{ages.text}</th> : <td className="border-2 text-center" key={sn}>
                                                                    <input type="hidden" className={engine.value + " text-x bordersm"} value={ages.value} name={"agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                                                    <input type="hidden" value={engine.value} name={"agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />
                                                                    <input type="number" className={" text-x p-2 bordersm"} name={"agecapacity[" + engine.value + "][" + ages.value + "][value]"} min="0" />

                                                                </td>

                                                            ))}
                                                        {index === 0 ? <th className="border-2 shade text-center">DEAL</th> :
                                                            <td className="text-center">
                                                                <input type="text" className="text-x p-2 bordersm" name={"agecapacity[" + engine.value + "][deal]"} />
                                                            </td>
                                                        }
                                                    </tr>

                                                ))}
                                    </tbody>


                                </table>
                                {/* FOOTER INPUT BOX CONTAINER START HERE */}


                                <div className="footer_input_box_container mt-4 mb-24">
                                    <div className="flex">
                                        {/* First Input Box */}

                                        {!formData.net_percent_checkbox && (
                                            <div className="flex-1 mr-2">
                                                <input className="w-full p-2"
                                                    type="number"
                                                    name="od_percent" id="od_percent"
                                                    value={formData.od_percent}
                                                    onChange={handleInputChange} placeholder="OD Commission %" />
                                            </div>
                                        )}

                                        {!formData.net_percent_checkbox && (
                                            <div className="flex-1 mr-2">
                                                <input
                                                    className="w-full p-2"
                                                    name="tp_percent"
                                                    type="number"
                                                    min="0"
                                                    value={formData.tp_percent}
                                                    onChange={handleInputChange}
                                                    placeholder="TP Comission %"
                                                />
                                                {errors.tp_percent && (
                                                    <span className="error">{errors.tp_percent}</span>)}
                                            </div>

                                        )}


                                        {/* Third Input Box with Checkbox */}
                                        <div className="flex-1 flex items-center mr-2">
                                            <input
                                                type="checkbox"
                                                name="net_percent_checkbox"
                                                className="mr-2"
                                                value={formData.net_percent_checkbox}
                                                checked={formData.net_percent_checkbox}
                                                onChange={handleInputChange}
                                            />

                                            <input
                                                name="net_percent"
                                                className="w-full p-2 border"
                                                id="net_percent"
                                                type="number"
                                                min="0"
                                                value={commissionData.net_percent}
                                                onChange={handleInputChange}
                                                placeholder="Net Commission %"

                                            />
                                            {errors.net_percent && (
                                                <span className="error">{errors.net_percent}</span>)}

                                        </div>

                                        {/* Fourth Input Box */}
                                        <div className="flex-1">
                                            <input name="flat_amount"
                                                id="flat_amount"
                                                value={formData.flat_amount}
                                                onChange={handleInputChange}
                                                type="number"
                                                min="0"
                                                className="w-full p-2" placeholder="Flat Amount" />
                                            {errors.flat_amount && (
                                                <span className="error">{errors.flat_amount}</span>)}
                                        </div>


                                    </div>
                                </div>

                                {/* FOOTER INPUT BOX CONTAINER END HERE */}
                            </div>
                        )}
                        {/* TABLE CONTAINER END HERE */}

                    </form>
                )}
            </Card>
        </Layout>
    );
};

function generateBreadcrumbData(RightContent = null) {

    return {
        leftItems: [
            { label: "Global", link: "/partner/global/commision/list" },
            { label: "Commision", link: "/admin/dashboard" },
        ],
        middleContent: "",
        rightItems: RightContent,
    };
}

export default GlobalCommissionEdit;
