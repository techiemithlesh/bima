import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { useLocation, useParams } from "react-router-dom";
import axios, { formToJSON } from "axios";
import Loading from "react-loading";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { validateAgeCapacity, validateCommission, validateFuelType, validateInsurer, validateVehicleSubType, validateVehicleType } from "../../utils/Validation";
import { useNavigate } from 'react-router-dom';


const AddComission = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    branch_name: '',
    image: '',
    partner_status: ''
  })

  const [partnerData, setPartnerData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  let [formData, setFormData] = useState({
    insurer: '',
    commission_type: '',
    vehicle_type: '',
    vehicle_subtype: '',
    fuel_type: '',
    seat: '',
    od_agecapacity: [],
    tp_agecapacity: [],
    flatamount_agecapacity: []
  })

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

  const [loading, setLoading] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.insurer = validateInsurer(formData.insurer);
    newErrors.commission_type = validateCommission(formData.commission_type);

    if (formData.vehicle_type === 'two-wheeler') {
      newErrors.vehicle_type = validateVehicleType(formData.vehicle_type);
      newErrors.vehicle_subtype = validateVehicleSubType(formData.vehicle_subtype);
      newErrors.fuel_type = validateFuelType(formData.fuel_type);
    }

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);
    return isValid;

  }

  const handleSave = () => {

    const Data = new FormData(document.getElementById('form'));
    formData = formToJSON(Data);
    formData.ages = Object.assign({}, formData.ages);
    formData.engines = Object.assign({}, formData.engines);
    console.log('Form Data:', formData);
    const csrfToken = Cookies.get('XSRF-TOKEN');
    axios.post('https://premium.treatweb.com/public/api/admin/partner/commission/save', formData, {
      // axios.post('http://127.0.0.1:9000/api/admin/partner/commission/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': csrfToken,
      },
    }).then((response) => {
      console.log("Form Submitted", response.data.message);
      const { success, message } = response.data;
      if (success) {
        // alert(message);
        setFormData({
          insurer: '',
          commission_type: '',
          vehicle_type: '',
          vehicle_subtype: '',
          fuel_type: '',
          seat: '',
          od_percent: '',
          flat_amount: '',
          net_percent: '',
          tp_percent: '',
          agecapacity: []
        });
        toast.success(message);
        navigate('/admin/partners');

      } else {
        toast.error("Oops! Something Went Wrong");
      }

    })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  useEffect(() => {

    const apiUrl = `https://premium.treatweb.com/public/api/admin/partner/commissionoptions/${id}`;
    // const apiUrl = `http://127.0.0.1:9000/api/admin/partner/commissionoptions/${id}`;
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
  }, [id]);


  function generateBreadcrumbData(data, RightContent = null) {

    const { partner } = data || {};

    const isActive = location.pathname.includes('/admin/partners') && location.pathname.includes('/addcommision');

    return {
      leftItems: [
        { label: "Partners", link: "/admin/partners", className: isActive ? "active" : "" },
        { label: "Commision", link: "/admin/dashboard" },
      ],
      middleContent: partner && partner.name ? `You are adding revenue for ${partner.name}` : "User Name",
      rightItems: RightContent,
    };
  }

  const RightContent = (
    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
      Save
    </button>
  );

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
    <Layout title="Add Partner Commission" breadcrumbData={generateBreadcrumbData(partnerData, RightContent)}>
      <Card bgColor="gray">
        {/* FORM INPUT CONTAINER START HERE */}
        {loading ? <div className="loading-overlay">
          <div className="loading">
            <Loading type="ball-triangle" color="#4fa94d" height={100} width={100} />
          </div>
        </div> : <form id="form">
          <div className="input_container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Form Element 1 */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600" htmlFor="insurerList">Insurer</label>
                <select
                  name="insurer"
                  id="insurerList"
                  value={formData.insurer}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  {partnerData && partnerData.commission_options.insurer_list.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
              </div>


              {/* Form Element 2 */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Lines of Business</label>
                <select
                  className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  disabled={!formData.insurer}
                  name="commission_type"
                  id="business_types"
                  value={formData.commission_type}
                  onChange={handleInputChange}
                >
                  {partnerData &&
                    partnerData.commission_options.business_types.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                </select>

              </div>

              {/* Form Element 3 (Vehicle Type) */}
              {formData.commission_type === 'motor' && (
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-600">Vehicle Type</label>
                  <select
                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="vehicle_type"
                    id="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleInputChange}
                  >
                    {partnerData &&
                      partnerData.commission_options.vehicle_types.map((item) => (
                        <option key={item.value} value={item.value} data-vid={item.id}>
                          {item.text}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Form Element 4 (Vehicle Sub Type) */}
              {formData.vehicle_type === 'two-wheeler' && (
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-600">Vehicle Sub Type</label>
                  <select
                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="vehicle_subtype"
                    id="vehicle_sub_types"
                    value={formData.vehicle_subtype}
                    onChange={handleInputChange}
                  >
                    {partnerData &&
                      partnerData.commission_options.vehicle_subtype_list['two-wheeler'].map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Form Element 5 */}
              {formData.vehicle_type === 'two-wheeler' && (
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
                  <select
                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="fuel_type"
                    id="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                  >
                    {console.log(formData.vehicle_type, partnerData.commission_options.fuel_type_list[formData.vehicle_type])}
                    {partnerData &&
                      partnerData.commission_options.fuel_type_list[formData.vehicle_type].map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                  </select>
                </div>
              )}


              {/* Form Element 6 */}
              {formData.vehicle_type === 'two-wheeler' && (
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-600">Seating Capacity</label>
                  <select
                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="seat"
                    id="seat"
                    value={formData.seat}
                    onChange={handleInputChange}
                  >
                    <option value="2">2</option>
                    {/*{partnerData &&*/}
                    {/*  partnerData.commission_options.seats.map((item) => (*/}
                    {/*    <option key={item.value} value={item.value}>*/}
                    {/*      {item.text}*/}
                    {/*    </option>*/}
                    {/*  ))}*/}
                  </select>
                </div>
              )}


            </div>
          </div>

          {/* FORM INPUT CONTAINER END HERE */}

          {/* TABLE CONTAINER START HERE */}
          {(formData.vehicle_type === 'two-wheeler' && formData.fuel_type != 0) && (
            <div className="table_container">
              <table className="min-w-full table-auto border-2 border-gray-300 comission">

                <tbody>
                  {
                    partnerData &&
                    partnerData.commission_options.engine_type_list[formData.vehicle_type][formData.fuel_type]
                      .map((engine, index) => (

                        <tr className="shade" data-index={engine} data-index_={index === 0}>
                          {index === 0 ? <th className="border-b shade p-2">{partnerData.commission_options.engine_type_list[formData.vehicle_type][formData.fuel_type][0].text}
                            <input type="hidden" name={"engines[0]"} className="text-x text-center shade" value={engine.text} />
                          </th> :
                            <th className=""> <input className="text-x text-center shade" name={"engines[" + engine.value + "]"} value={engine.text} />
                            </th>
                          }
                          {partnerData &&
                            partnerData.commission_options.age_type_list[formData.vehicle_type][formData.fuel_type].map((ages, sn) => (

                              index === 0 ? <th className="border-2 shade text-center">{ages.text}  <input
                                className="text-x text-center shade" type="hidden"
                                name={"ages[" + ages.value + "]"}
                                value={ages.text} />
                              </th> : <td className="border-2 text-center">
                                <div className="flex mx-2">
                                  <input type="hidden" className={engine.value + " text-x bordersm"} value={ages.value} name={"agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                  <input type="hidden" value={engine.value} name={"agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />
                                  <div className={'od'}>
                                    <input type="number" className={" text-x p-2 bordersm"} name={"od_agecapacity[" + engine.value + "][" + ages.value + "][value]"} 
                                    step={0.01}
                                    onInput={handleInputValidation}/>
                                    <label>OD</label>
                                  </div>

                                  <div className={'tp'}>
                                    <input type="number" className={" text-x p-2 bordersm"} name={"tp_agecapacity[" + engine.value + "][" + ages.value + "][value]"} 
                                    step={0.01}
                                    onInput={handleInputValidation}/>
                                    <label>TP</label>
                                  </div>

                                  <div className={'flatamount'} onDoubleClick={handleDoubleClick}>
                                    <input type="number" className={" text-x p-2 bordersm"} name={"flatamount_agecapacity[" + engine.value + "][" + ages.value + "][value]"} 
                                    disabled={true}
                                    step={0.01}
                                    onInput={handleInputValidation}/>
                                    <label>Flat Amount</label>
                                  </div>
                                </div>

                              </td>
                            ))}

                        </tr>

                      ))}
                </tbody>


              </table>



            </div>
          )}


        </form>}
      </Card>
    </Layout >

  )
}

export default AddComission;