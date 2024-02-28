import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import Loading from "react-loading";
import axios, { formToJSON } from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


const GlobalCommissionAdd = () => {
    const [loading, setLoading] = useState(true);
    const [partnerData, setPartnerData] = useState(null);

    const [formData, setFormData] = useState({
        insurer: '',
        business_type: '',
        makes: '',
        policy_type: '',
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
        policy_type: '',
        models: '',
        vehicle_types: '',
        two_wheeler_types: '',
        fuel_types: '',
        od_percent: '',
        flat_amount: '',
        net_percent_checkbox: '',
        net_percent: '',
        tp_percent: '',
    });


    useEffect(() => {

        const apiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/options`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPartnerData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching partner data:", error);
            });
    }, []);


    const handleSave = () => {

        const formDataFromForm = new FormData(document.getElementById('form'));
        const formDataJSON = formToJSON(formDataFromForm);

        console.log("formdata",  formDataJSON);
        const csrfToken = Cookies.get('XSRF-TOKEN');

        axios.post('https://premium.treatweb.com/public/api/admin/global-commissions/store', formDataJSON, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': csrfToken,
            },
        }).then((res) => {
            console.log("Response", res);
            const {message, success} = res.data;
            
            if (res.data.success) {
                toast.success("Commission saved successfully!", {
                    position: 'top-right'
                });
            } else {
                setErrors(message);
                toast.error("Failed to save commission. Please try again.", {
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

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,

        }));

        
        setErrors({});
    };

    return (
        <Layout title="Global Comission Setting" breadcrumbData={generateBreadcrumbData(RightContent)}>
            <Card bgColor="gray">
                {/* FORM INPUT CONTAINER START HERE */}
                {loading ? <div className="loading-overlay">
                    <div className="loading">
                        <Loading type="ball-triangle" color="#4fa94d" height={100} width={100} />
                    </div>
                </div> : 
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
                                    value={formData.insurer}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Insurer</option>
                                    {partnerData && partnerData.global_commission_options.insurers.map((item) => (
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
                            {formData.insurer && (
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600">Lines Of Business</label>
                                    <select
                                        required
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        name="business_type"
                                        id="business_type"
                                        value={formData.business_type}
                                        onChange={handleInputChange}
                                    >
                                        {partnerData &&
                                            partnerData.global_commission_options.commission_types.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.business_type && (
                                    <span className="error">{errors.business_type}</span>)}

                                </div>
                            )}


                            {/* Form Element 3 (Vehicle Type) */}
                            {formData.business_type == '1' && (
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600">Vehicle Type</label>
                                    <select
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        name="vehicle_types"
                                        id="vehicle_types"
                                        value={formData.vehicle_types}
                                        onChange={handleInputChange}
                                    >
                                        {partnerData &&
                                            partnerData.global_commission_options.vehicle_types.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.vehicle_types && (
                                    <span className="error">{errors.vehicle_types}</span>)}
                                </div>
                            )}

                            {/* Form Element 4 (Coverage Type) */}
                            {formData.vehicle_types === '1' && (
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600">Coverage Type</label>
                                    <select
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        name="policy_type"
                                        id="policy_type"
                                        value={formData.policy_type}
                                        onChange={handleInputChange}
                                    >
                                        {partnerData &&
                                            partnerData.global_commission_options.coverage_types.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.policy_type && (
                                    <span className="error">{errors.policy_type}</span>)}
                                </div>
                            )}

                            {/* Form Element 4 (Vehicle Sub Type) */}
                            {formData.vehicle_types === '1' && (
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600">Two Wheeler Type</label>
                                    <select
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        name="two_wheeler_types"
                                        id="two_wheeler_types"
                                        // value={formData.vehicle_subtype}
                                        onChange={handleInputChange}
                                    >
                                        {partnerData &&
                                            partnerData.global_commission_options.two_wheeler_types.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.two_wheeler_types && (
                                    <span className="error">{errors.two_wheeler_types}</span>)}
                                </div>
                            )}



                            {/* Form Element 5 */}
                            {formData.vehicle_types === '1' && (
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
                                    <select
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        name="fuel_types"
                                        id="fuel_types"
                                        value={formData.fuel_types}
                                        onChange={handleInputChange}
                                    >
                                        {partnerData &&
                                            partnerData.global_commission_options.fuel_types.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.fuel_types && (
                                    <span className="error">{errors.fuel_types}</span>)}
                                </div>
                            )}

                            {/* Form Element 5 */}
                            {formData.vehicle_types === '1' && (
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600">Makes</label>
                                    <select
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        name="makes"
                                        id="makes"
                                        value={formData.makes}
                                        onChange={handleInputChange}
                                    >
                                        {partnerData &&
                                            partnerData.global_commission_options.makes.map((item, index) => (
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.makes && (
                                    <span className="error">{errors.makes}</span>)}
                                </div>
                            )}


                            {/* Form Element 5 */}
                            {formData.vehicle_types === '1' && (
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-600">Model</label>
                                    <select
                                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        name="models"
                                        id="models"
                                        value={formData.models}
                                        onChange={handleInputChange}
                                    >
                                        {partnerData &&
                                            partnerData.global_commission_options.models.map((item, index) => (
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.models && (
                                    <span className="error">{errors.models}</span>)}
                                </div>
                            )}

                            {/* Form Element 6 */}

                        </div>
                    </div>

                    {/* FORM INPUT CONTAINER END HERE */}

                    {/* TABLE CONTAINER START HERE */}

                    {formData.vehicle_types === '1' && (
                        <div className="table_container">

                            <table className="min-w-full table-auto border-2 border-gray-300 comission">

                                <tbody>
                                    {
                                        partnerData &&
                                        partnerData.global_commission_options.engines
                                            .filter((engine) => engine.text.toLowerCase().includes('cc') | engine.text.toLowerCase().includes('age'))
                                            .map((engine, index) => (

                                                <tr className="shade" data-index={engine} data-index_={index == '0'}>
                                                    {index === '0' ? <th className="border-b shade p-2">{partnerData.global_commission_options.engines[0].text}</th> :
                                                        <th className=""> <input className="text-x text-center shade" value={engine.text} />
                                                        </th>
                                                    }
                                                    {partnerData &&
                                                        partnerData.global_commission_options.vehicle_ages.map((ages, sn) => (

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
                                            value={formData.net_percent}
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

                </form>}
            </Card>
        </Layout >
    )
}


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

export default GlobalCommissionAdd;