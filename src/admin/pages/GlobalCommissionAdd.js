import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import Loading from "react-loading";
import axios, { formToJSON } from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const GlobalCommissionAdd = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [partnerData, setPartnerData] = useState(null);

    const [formData, setFormData] = useState({
        insurer: '',
        business_type: '',
        makes: '',
        policy_type: '',
        models: '',
        vehicle_types: '0',
        two_wheeler_types: '',
        fuel_types: '',
        od_agecapacity: [],
        tp_agecapacity: [],
        flatamount_agecapacity: []
    });

        const [disabled, setDisabled] = useState(true);
        const handleDoubleClick = (e) => {
            e.stopPropagation();
            if(e.target.tagName=="INPUT"){
                if (e.target.disabled===false)
                {
                    e.target.value='';
                    e.target.disabled=true;
                    e.target.style.zIndex=-1;
                }else{
                    e.target.disabled=false;
                    e.target.style.zIndex=0;
                }
                return 1;
            }
            if (e.target.querySelector('input').disabled===false)
            {
                e.target.querySelector('input').value='';
                console.log(e.target);
                e.target.querySelector('input').disabled=true;
                e.target.querySelector('input').style.zIndex=-1;
            }else{
                e.target.querySelector('input').disabled=false;
                e.target.querySelector('input').style.zIndex=0;
            }
        };

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
        // const apiUrl = `http://127.0.0.1:9000/api/admin/global-commissions/options`;
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
        formDataJSON.engines=Object.assign({},formDataJSON.engines);
        formDataJSON.ages=Object.assign({},formDataJSON.ages);
        console.log("formdata", formDataJSON);
        const csrfToken = Cookies.get('XSRF-TOKEN');

        // axios.post('https://premium.treatweb.com/public/api/admin/global-commissions/store', formDataJSON, {
            axios.post('https://premium.treatweb.com/public/api/admin/global-commissions/store', formDataJSON, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': csrfToken,
            },
        }).then((res) => {
            console.log("Response", res);
            const { message, success } = res.data;

            if (res.data.success) {
                toast.success("Commission saved successfully!", {
                    position: 'top-right'
                });
                navigate('/global/commision/list');

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

        console.log("before", formData);


        setFormData((prevData) => {
            const updateFormData = {
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }
            console.log("After", updateFormData);
            return updateFormData;
        })

        setErrors({});
    };



    const handleInputValidation = (e) => {
        let value = e.target.value;

        value = value.replace(/^0+(?=\d)/, '');

        const isFractional = /^\d*\.?\d{0,2}$/.test(value);
        const floatValue = parseFloat(value);
    
        if (!isFractional || value.length > 7 || floatValue > 100) {
            if (!isFractional) {
              
                e.target.value = value.slice(0, 3);
            } else if (floatValue > 100) {
                // If the value is greater than 100, set it to 100
                e.target.value = '100';
            }
        }

        const [engineValue, ageValue] = e.target.name.match(/\[(\d+)\]/g).map(val => val.replace(/\[|\]/g, ''));

    
    if (e.target.name.startsWith('od_agecapacity')) {
        document.querySelector(`input[name="tp_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
        document.querySelector(`input[name="flatamount_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
        document.querySelector(`input[name="flatamount_agecapacity[${engineValue}][${ageValue}][value]"]`).disabled = false;
    } else if (e.target.name.startsWith('tp_agecapacity')) {
        document.querySelector(`input[name="od_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
        document.querySelector(`input[name="flatamount_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
        document.querySelector(`input[name="flatamount_agecapacity[${engineValue}][${ageValue}][value]"]`).disabled = false;
    } else if (e.target.name.startsWith('flatamount_agecapacity')) {
        document.querySelector(`input[name="od_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
        document.querySelector(`input[name="tp_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
    }
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
                                        <label className="block text-sm font-medium text-gray-600">Lines of Business</label>
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
                                { formData.business_type == '1' && (formData.vehicle_types === '1' || formData.vehicle_types === '0') && (
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
                                {formData.business_type == '1' && (formData.vehicle_types === '1' || formData.vehicle_types === '0') && (
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
                                {formData.business_type == '1' && (formData.vehicle_types === '1' ) && (
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
                                                partnerData.global_commission_options.fuel_type_list[formData.vehicle_types].map((item) => (
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
                                {formData.business_type == '1' && (formData.vehicle_types === '1' || formData.vehicle_types === '0') && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Makes</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="makes"
                                            id="makes"
                                            value={formData.makes}
                                            onChange={handleInputChange}
                                        >
                                            <option value={0}>All</option>
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
                                {formData.business_type == '1' && (formData.vehicle_types === '1' || formData.vehicle_types === '0') && (
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-600">Model</label>
                                        <select
                                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            name="models"
                                            id="models"
                                            value={formData.models}
                                            onChange={handleInputChange}
                                        >
                                            <option value={0}>All</option>
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

                        {((formData.vehicle_types === '1' || formData.vehicle_types === '0') && (formData.fuel_types!=0)) && (
                            <div className="table_container">

                                <table className="min-w-full table-auto border-2 border-gray-300 comission">
                                    <tbody>
                                    {
                                        partnerData &&
                                        partnerData.global_commission_options.engine_type_list[formData.vehicle_types][formData.fuel_types]
                                            .map((engine, index) => (

                                                <tr className="shade">
                                                    {index === 0 ? <th className="border-b shade th p-2">{partnerData.global_commission_options.engine_type_list[formData.vehicle_types][formData.fuel_types][0].text}
                                                            <input type="hidden" name={"engines[0]"} className="text-x text-center shade" value={engine.text}/>
                                                        </th> :
                                                        <th className="th"> <input className="text-x text-center  shade" name={"engines["+engine.value+"]"} value={engine.text} /> </th>
                                                    }
                                                    {partnerData &&
                                                        partnerData.global_commission_options.age_type_list[formData.vehicle_types][formData.fuel_types].map((ages, sn) => (

                                                            index === 0 ? <th className="border-2 shade text-center" key={sn}>{ages.text}
                                                                    <input
                                                                        className="text-x text-center shade" type="hidden"
                                                                        name={"ages["+ages.value+"]"}
                                                                        value={ages.text}/></th> :
                                                                <td className="border-2 text-center" key={sn}>
                                                                    <div className="flex mx-2">
                                                                        <input type="hidden"  className={engine.value + " text-x bordersm"} value={ages.value} name={"od_agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                                                        <input type="hidden" value={engine.value} name={"od_agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />
                                                                        <input type="hidden"  className={engine.value + " text-x bordersm"} value={ages.value} name={"tp_agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                                                        <input type="hidden" value={engine.value} name={"tp_agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />
                                                                        <input type="hidden"  className={engine.value + " text-x bordersm"} value={ages.value} name={"flatamount_agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                                                        <input type="hidden" value={engine.value} name={"flatamount_agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />

                                                                       <div className={'od'}>
                                                                           <input type="number" required max={100} step={0.01} className={" text-x p-2 bordersm"} name={"od_agecapacity[" + engine.value + "][" + ages.value + "][value]"} min="0"
                                                                                  onInput={handleInputValidation}
                                                                        />
                                                                           <label>OD</label>
                                                                       </div>
                                                                        <div className={'tp'}>
                                                                            <input type="number" required max={100} step={0.01}  className={" text-x p-2 bordersm"} name={"tp_agecapacity[" + engine.value + "][" + ages.value + "][value]"} min="0"
                                                                                   onInput={handleInputValidation}/>
                                                                            <label>TP</label>
                                                                        </div>
                                                                        <div className={'flatamount'} onDoubleClick={handleDoubleClick}>
                                                                            <input max={100} type="number" required className={" text-x p-2 bordersm"} name={"flatamount_agecapacity[" + engine.value + "][" + ages.value + "][value]"} min="0"
                                                                                   disabled={true}
                                                                                   step={0.01}
                                                                                   onInput={handleInputValidation}
                                                                                //    onChange={(e) => handleFlatAmountChange(engine.value, ages.value, e.target.value)}
                                                                            />
                                                                            <label>Flat</label>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                        ))}

                                                </tr>

                                            ))}
                                    </tbody>


                                </table>
                                {/* FOOTER INPUT BOX CONTAINER START HERE */}

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
            { label: "Global", link: "/global/commision/list" },
            { label: "Commision", link: "/admin/dashboard" },
        ],
        middleContent: "",
        rightItems: RightContent,
    };
}

export default GlobalCommissionAdd;