import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import {useNavigate, useParams} from "react-router-dom";
import axios, { formToJSON } from "axios";
import Loading from "react-loading";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const GlobalCommissionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [globalOptions, setGlobalOptions] = useState(null);

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

  const handleFlatAmountChange = (engineValue, ageValue, value) => {
    // Update od and tp inputs to 0 for the same key
    document.querySelector(`input[name="od_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
    document.querySelector(`input[name="tp_agecapacity[${engineValue}][${ageValue}][value]"]`).value = 0;
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

        e.target.value = '100';
      }
    }
  };

  const [commissionData, setCommissionData] = useState({
    insurer: '',
    business_type: '',
    vehicle_type: 0,
    coverage_type: '',
    two_wheeler_type: '',
    fuel_type:0,
    make: '',
    model: '',
    agecapacity: '',
  });
  function isset (ref) { return typeof ref !== 'undefined' }
  const [errors, setErrors] = useState({
    insurer: "",
    business_type: "",
    makes: "",
    coverage_type: "",
    models: "",
    vehicle_types: "",
    two_wheeler_types: "",
    fuel_types: "",
    od_percent: "",
    flat_checkbox: "",
    flat_amount: "",
    net_percent_checkbox: "",
    net_percent: "",
    tp_percent: "",
    agecapacity: [],
  });

  useEffect(() => {
    // Fetch global commission options
    const apiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/options`;
    // const apiUrl = `http://127.0.0.1:9000/api/admin/global-commissions/options`;
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
    // const commissionApiUrl = `http://127.0.0.1:9000/api/admin/global-commissions/${id}`;
    axios
        .get(commissionApiUrl)
        .then((response) => {
          console.log("Response from server", response.data.global_commission);

          const commissionDataFromServer = response.data.global_commission;

          if (commissionDataFromServer.vehicle_type === null) {
            commissionDataFromServer.vehicle_type = 0;
          }
          if (commissionDataFromServer.fuel_type === null) {
            commissionDataFromServer.fuel_type = 0;
          }

          setCommissionData(commissionDataFromServer);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching global commissions:", error);
        });
  }, [id]);
  

  const handleSave = () => {

    const csrfToken = Cookies.get("XSRF-TOKEN");
    const formDataFromForm = new FormData(document.getElementById('form'));
    const formDataJSON = formToJSON(formDataFromForm);
    commissionData.engines=Object.assign({},formDataJSON.engines);
    commissionData.ages=Object.assign({},formDataJSON.ages);
    commissionData.agecapacity=Object.assign({},formDataJSON.agecapacity);
    axios
      .post(
        `https://premium.treatweb.com/public/api/admin/global-commissions/update/${id}`,
        // `http://127.0.0.1:9000/api/admin/global-commissions/update/${id}`,
        commissionData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      )
      .then((res) => {
        console.log("Response", res);
        const { message, success } = res.data;

        if (res.data.success) {
          toast.success("Commission updated successfully!", {
            position: "top-right",
          });
          navigate('/global/commision/list');

        } else {
          setErrors(message);
          toast.error("Failed to update commission. Please try again.", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data) {
          console.log("error", error);
          const { message } = error.response.data;

          const serverErrors = Object.values(message).flat().join(", ");
          
          setErrors(serverErrors);
          toast.error(serverErrors, {
            position: "top-right",
          });
        }
      });
  };

  const RightContent = (
    <button
      onClick={handleSave}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full"
    >
      Save
    </button>
  );


  const handleInputChange = (event) => {
    let val =
      event.target.value * 1 !== NaN
        ? event.target.value * 1
        : event.target.value;

    if (event.target.name === "net_percent_checkbox" || event.target.name === "flat_checkbox") {
      val = event.target.checked;
    }

    console.log("Vehicle Type Value BEFORE:", commissionData.vehicle_type);
    setCommissionData((prevCommissionData) => {
      const updatedCommissionData = {
        ...prevCommissionData,
        [event.target.name]: val,
      };
  
      console.log("Vehicle Type Value AFTER:", updatedCommissionData.vehicle_type);
  
      return updatedCommissionData;

    });

  };

  console.log(commissionData.agecapacity, ">>>>commissionData in globalCommissionEdit");
  console.log(globalOptions, ">>>>globalOptions in globalCommissionEdit", );
  return (
    <Layout
      title="Edit Global commission"
      breadcrumbData={generateBreadcrumbData(RightContent)}
    >
      <Card bgColor="gray">
        {loading ? (
          <div className="loading-overlay">
            <div className="loading">
              <Loading
                type="ball-triangle"
                color="#4fa94d"
                height={100}
                width={100}
              />
            </div>
          </div>
        ) : (
          <form id="form">
            <div className="input_container">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Form Element 1 */}
                <div className="mb-2">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="insurerList"
                  >
                    Insurer
                  </label>
                  <select
                    required
                    name="insurer"
                    id="insurerList"
                    value={
                      commissionData.insurer == null ||
                        commissionData.insurer == 0
                        ? 0
                        : commissionData.insurer * 1
                    }
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    {/* <option value="">Select Insurer</option> */}
                    {globalOptions &&
                      globalOptions.insurers.map((item) => (
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
                    <label
                      className="block text-sm font-medium text-gray-600"
                      htmlFor="businessList"
                    >
                      Lines of Business
                    </label>
                    <select
                      required
                      name="business_type"
                      id="businessList"
                      value={
                        commissionData.business_type == null ||
                          commissionData.business_type == 0
                          ? 0
                          : commissionData.business_type * 1
                      }
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >

                      {globalOptions &&
                        globalOptions.commission_types.map((item) => (
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
                    <label className="block text-sm font-medium text-gray-600">
                      Vehicle Type
                    </label>
                    <select
                      className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      name="vehicle_type"
                      id="vehicle_types"
                      value={
                        commissionData.vehicle_type == null ||
                          commissionData.vehicle_type == 0
                          ? 0
                          : commissionData.vehicle_type * 1
                      }
                      onChange={handleInputChange}
                    >
                      {globalOptions &&
                        globalOptions.vehicle_types.map((item) => {
                          return (
                            <option
                              key={item.value}
                              value={item.value}

                            >
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

                {globalOptions && (commissionData.business_type===1 && (commissionData.vehicle_type === 1 || commissionData.vehicle_type === 0)) && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">Coverage Type</label>
                    <select
                      className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      name="coverage_type"
                      id="coverage_type"
                      value={
                        commissionData.vehicle_type === 0 ? '0' :
                        commissionData.coverage_type == null ||
                          commissionData.coverage_type == 0
                          ? 0
                          : commissionData.coverage_type * 1
                      }
                      onChange={handleInputChange}
                    >
                      {globalOptions.coverage_types.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        //   selected={item.value === commissionData.coverage_type}
                        >
                          {item.text}
                        </option>
                      ))}
                    </select>
                    {errors.coverage_type && (
                      <span className="error">{errors.coverage_type}</span>
                    )}
                  </div>
                )}

                {globalOptions && (commissionData.business_type===1 && (commissionData.vehicle_type === 1 || commissionData.vehicle_type === 0)) && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Two Wheeler Type
                    </label>
                    <select
                      className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      name="two_wheeler_type"
                      id="two_wheeler_type"
                      value={
                        commissionData.vehicle_type === 0 ? '0' :
                        commissionData.two_wheeler_type == null ||
                          commissionData.two_wheeler_type == 0
                          ? 0
                          : commissionData.two_wheeler_type * 1
                      }
                      onChange={handleInputChange}
                    >
                      {globalOptions.two_wheeler_types.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                    {errors.two_wheeler_types && (
                      <span className="error">{errors.two_wheeler_types}</span>
                    )}
                  </div>
                )}
                {globalOptions && (commissionData.business_type === 1 && (commissionData.vehicle_type === 1 || commissionData.vehicle_type === 0)) && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
                    <select
                      className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      name="fuel_type"
                      id="fuel_types"
                      value={
                        commissionData.vehicle_type === 0
                          ? '0'
                          : commissionData.fuel_type == null || commissionData.fuel_type === 0
                          ? '0'
                          : commissionData.fuel_type
                      }
                      onChange={handleInputChange}
                    >
                      {((commissionData.vehicle_type!=0 && globalOptions.fuel_type_list[commissionData.vehicle_type])
                      || (commissionData.vehicle_type==0 && globalOptions.fuel_types))
                          .map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        >
                          {item.text}
                        </option>
                      ))}
                    </select>
                    {errors.fuel_types && (
                      <span className="error">{errors.fuel_types}</span>
                    )}
                  </div>
                )}

                {globalOptions && (commissionData.vehicle_type == '0' ||commissionData.vehicle_type == '1') && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Makes
                    </label>
                    <select
                      className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      name="make"
                      id="make"
                      value={
                        commissionData.make == "" || commissionData.make == null
                          ? globalOptions.makes[0]
                          : commissionData.make
                      }
                      onChange={handleInputChange}
                    >
                      {globalOptions.makes.map((item) => (
                        <option
                          key={item.value}
                          value={item}
                        //   selected={item.value === commissionData.makes}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.fuel_types && (
                      <span className="error">{errors.fuel_types}</span>
                    )}
                  </div>
                )}

                {globalOptions && (commissionData.vehicle_type == '0' ||commissionData.vehicle_type == '1') && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Model
                    </label>
                    <select
                      className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      name="model"
                      id="model"
                      //   value={commissionData.models}
                      value={
                        commissionData.model == "" ||
                          commissionData.model == null
                          ? globalOptions.models[0]
                          : commissionData.model
                      }
                      onChange={handleInputChange}
                    >
                      {globalOptions.models.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                          selected={item.value === commissionData.model}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.fuel_types && (
                      <span className="error">{errors.fuel_types}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* FORM INPUT CONTAINER END HERE */}

            {/* TABLE CONTAINER START HERE */}
            {globalOptions && (commissionData.vehicle_type === 1) && (commissionData.fuel_type!=0) && (
              <div className="table_container">
                <table className="min-w-full table-auto border-2 border-gray-300 comission">
                  <tbody>
                    {globalOptions &&
                      globalOptions.engine_type_list[commissionData.vehicle_type][commissionData.fuel_type]
                        .map((engine, index) => (
                          <tr className="shade">
                            {index === "0" ? (
                              <th className="border-b shade p-2">
                                {
                                  globalOptions
                                    .engines[0].text
                                }
                              </th>
                            ) : (
                              <th className="th">
                                {" "}
                                <input
                                  className="text-x text-center shade"
                                  value={engine.text}
                                />
                              </th>
                            )}
                            {globalOptions &&
                              globalOptions.age_type_list[commissionData.vehicle_type][commissionData.fuel_type].map(
                                (ages, sn) =>
                                  index === 0 ? (
                                    <th className="border-2 shade text-center ">{ages.text}</th>
                                  ) : (
                                    <td className="border-2 text-center">
                                      <div className="flex mx-2">

                                        <input type="hidden"  className={engine.value + " text-x bordersm"} value={ages.value} name={"od_agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                        <input type="hidden" value={engine.value} name={"od_agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />
                                        <input type="hidden"  className={engine.value + " text-x bordersm"} value={ages.value} name={"tp_agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                        <input type="hidden" value={engine.value} name={"tp_agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />
                                        <input type="hidden"  className={engine.value + " text-x bordersm"} value={ages.value} name={"flatamount_agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                        <input type="hidden" value={engine.value} name={"flatamount_agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />

                                      <div className={'od'}>
                                        <input type="number" required max={100} step={0.01}
                                               value={(isset(commissionData.od_agecapacity[engine.value])?commissionData.od_agecapacity[engine.value][ages.value].value??"":"")}
                                               className={" text-x p-2 bordersm"} name={"od_agecapacity[" + engine.value + "][" + ages.value + "][value]"} min="0"
                                               onInput={handleInputValidation}
                                        />
                                        <label>OD</label>
                                      </div>
                                      <div className={'tp'}>
                                        <input type="number" required max={100} step={0.01}
                                               value={(isset(commissionData.tp_agecapacity[engine.value])?commissionData.tp_agecapacity[engine.value][ages.value].value??"":"")}
                                               className={" text-x p-2 bordersm"} name={"tp_agecapacity[" + engine.value + "][" + ages.value + "][value]"} min="0"
                                               onInput={handleInputValidation}/>
                                        <label>TP</label>
                                      </div>
                                      <div className={'flatamount'} onDoubleClick={handleDoubleClick}>
                                        <input max={100} type="number" required className={"text-x p-2 bordersm"} name={"flatamount_agecapacity[" + engine.value + "][" + ages.value + "][value]"} min="0"
                                               step={0.01}
                                               onInput={handleInputValidation}
                                               onChange={(e) => handleFlatAmountChange(engine.value, ages.value, e.target.value)}
                                               value={(isset(commissionData.flatamount_agecapacity[engine.value])?commissionData.flatamount_agecapacity[engine.value][ages.value].value??"":"")}
                                               disabled={(isset(commissionData.flatamount_agecapacity[engine.value])?
                                                   isset(commissionData.flatamount_agecapacity[engine.value][ages.value].value)?false:true :
                                                   true)}
                                               style={{
                                                 zIndex: (isset(commissionData.flatamount_agecapacity[engine.value]) ?
                                                     isset(commissionData.flatamount_agecapacity[engine.value][ages.value].value)?0 : -1 :
                                                     -1)
                                               }}
                                        />
                                        <label>Flat Amount</label>
                                      </div>
                                      </div>
                                    </td>
                                  )
                              )}
                          </tr>
                        ))}
                  </tbody>
                </table>
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
