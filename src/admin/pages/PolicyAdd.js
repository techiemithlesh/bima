import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { TabsIcon } from "../../shared/Assets";
import {
  validateBusinessType,
  validateCustomerName,
  validateFuelType,
  validateMobileNumber,
  validateNetAmount,
  validateOwnDamage,
  validatePaymentMethod,
  validatePolicyNumber,
  validatePolicyType,
  validateRegistrationNo,
  validateRiskStartDate,
  validateThirdParty,
  validateVehicleManufacture,
  validateVehicleModel,
  validateVehicleRegistrationDate,
  validateVehicleType,
} from "../../utils/Validation";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PolicyAdd = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);


  const [insurance, setInsurance] = useState(null);
  const [kycdocument, setKycDocument] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    business_type: "",
    vehicle_type: "",
    policy_type: "",
    policy_number: "",
    two_wheeler_type: "",
    coverage_type: "",
    fuel_type: "",
    registration_number: "",
    vehicle_registration_date: "",
    vehicle_manufacture: "",
    vehicle_model: "",
    payment_type: "",
    own_damage: "",
    third_party: "",
    net_amount: 0,
    risk_start_date: "",
    customer_name: "",
    customer_mobile: "",
    current_policy_file: null,
    previous_policy_file: null,
    rc_file: null,
    vehicle_photo_file: null,
    kyc_document: "",
    adhar_document: null,
    pancard_document: null,
    other_document: null,
  });

  const [errors, setErrors] = useState({
    business_type: "",
    vehicle_type: "",
    policy_type: "",
    policy_number: "",
    two_wheeler_type: "",
    coverage_type: "",
    fuel_type: "",
    registration_number: "",
    vehicle_manufacture: "",
    vehicle_model: "",
    payment_type: "",
    own_damage: "",
    third_party: "",
    net_amount: "",
    risk_start_date: "",
    customer_name: "",
    customer_mobile: "",
  });

  useEffect(() => {
    fetch(`https://premium.treatweb.com/public/api/admin/policies/options`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setInsurance(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  let isSaveDisabled = true;

  function generateBreadcrumbData(selectedTabIndex, rightContent = null) {
    let middleContent;

    let isSaveDisabled = true;

    switch (selectedTabIndex) {
      case 0:
        middleContent = "Business Details";
        break;
      case 1:
        middleContent = "Customer Details";
        isSaveDisabled = false;
        break;
      case 2:
        middleContent = "Documents";
        isSaveDisabled = false;
        break;
      case 3:
        middleContent = "Comments";
        isSaveDisabled = false;
        break;
      default:
        middleContent = "";
        break;
    }

    return {
      leftItems: [
        { label: "", link: "/" },
        { label: "Policies ", link: "/policy/list" },
        { label: "Add Policy", link: "/policy/list" },
      ],
      middleContent: middleContent,
      rightItems: (
        <button
          onClick={handleSave}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full breadcumsave ${isSaveDisabled? 'cursor-not-allowed': ''}`}
          disabled={isSaveDisabled}
        >
          Save
        </button>
      ),
    };
  }

  const validateForm = () => {
    let valid = true;
    const requiredFields = requiredFieldsByTab[selectedTabIndex];
    for (const key of requiredFields) {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        valid = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: errorMessage,
        }));
      } else if (!formData[key]) {
        valid = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: "This field is required.",
        }));
      }
    }
    return valid;
  };

  const requiredFieldsByTab = [
    ["business_type", "policy_type", "vehicle_type", "fuel_type", "registration_number", "vehicle_registration_date", "vehicle_manufacture", 
    "vehicle_model", "insurer", "policy_number", "risk_start_date", "own_damage", "third_party", "net_amount", "payment_type"],
    ["customer_name", "customer_mobile"],
    [],
    [],
  ];

  const validateField = (name, value) => {
    let errorMessage = "";
    if (!value) {
      return null;
    }

    switch (name) {
      case "business_type":
        errorMessage = validateBusinessType(value);
        break;
      case "vehicle_type":
        errorMessage = validateVehicleType(value);
        break;
      case "policy_type":
        errorMessage = validatePolicyType(value);
        break;
      case "fuel_type":
        errorMessage = validateFuelType(value);
        break;
      case "registration_number":
        errorMessage = validateRegistrationNo(value);
        break;
      case "vehicle_manufacture":
        errorMessage = validateVehicleManufacture(value);
        break;

      case "vehicle_model":
        errorMessage = validateVehicleModel(value);
        break;
      case "net_amount":
        errorMessage = validateNetAmount(value);
        break;
      case "payment_type":
        errorMessage = validatePaymentMethod(value);
        break;

      case "customer_name":
        errorMessage = validateCustomerName(value);
        break;
      case "customer_mobile":
        errorMessage = validateMobileNumber(value);
        break;
      case "policy_number":
        errorMessage = validatePolicyNumber(value);
        break;
      case "risk_start_date":
        errorMessage = validateRiskStartDate(value);
        break;
      case "vehicle_registration_date":
        errorMessage = validateVehicleRegistrationDate(value);
        break;
      case "own_damage":
        errorMessage = validateOwnDamage(value);
        break;
      case "third_party":
        errorMessage = validateThirdParty(value);
        break;

      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleKYCDocumentChange = (e) => {
    setKycDocument(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    validateField(name, files && files.length > 0 ? files[0] : value);

    const errorMessage = validateField(name, files && files.length > 0 ? files[0] : value);
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
  };

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0], 
    }));
  

    validateField(name, files && files.length > 0 ? files[0] : null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    setErrors({});
    const csrfToken = Cookies.get("XSRF-TOKEN");
    console.log("formdata", formData);
    axios
      .post(
        // "http://phpstorm.local:9000/api/admin/policies/store",

        "https://premium.treatweb.com/public/api/admin/policies/store",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      )
      .then((response) => {
        const { success, message } = response.data;
        // console.log(response);
        if (success === false) {
          setErrors(message);
          
        } else {
          toast.success(message, {
            position: "top-right",
          });

          navigate("/policy/list");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setErrors({
          server:
            "An error occurred while processing your request. Please try again later.",
        });
        
      });
  };

  const handleSaveAndNext = () => {
    console.log("Validate Form", validateForm());
    if (validateForm()) {
      setSelectedTabIndex((prev) => prev + 1);
    } else {
    }
  };

  const handleTabSelect = (index) => {
    if (index > selectedTabIndex) {
      if (validateForm()) {
        setSelectedTabIndex(index);
      }
    } else {
      setSelectedTabIndex(index);
    }
  };

  useEffect(() => {
    const ownDamage = parseFloat(formData.own_damage ?? 0);
    const thirdParty = parseFloat(formData.third_party ?? 0);

    const net_amount = ownDamage + thirdParty;

    setFormData((prevData) => ({
      ...prevData,
      net_amount: isNaN(net_amount) ? "" : net_amount,
    }));

    if (formData.net_amount) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            net_amount: "",
        }));
    }
    
  }, [formData.own_damage, formData.third_party, formData.net_amount]);




  return (
    <Layout
      title="Add Policy"
      className="policy"
      breadcrumbData={generateBreadcrumbData(selectedTabIndex)}
    >
      <Card>
        <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
          <TabList
            style={{ display: "flex", margin: 0, padding: 0 }}
            className="policytab"
          >
            {[1, 3, 4, 5].map((_, index) => (
              <Tab
                key={index}
                style={{ flex: 1, textAlign: "center", padding: "10px" }}
              >
                <span className="tabicon">
                  <img src={TabsIcon[`Tab${index + 1}`]} alt="" />
                </span>
              </Tab>
            ))}
          </TabList>

          <TabPanel className="policytabone">
            <div className="container my-4">
              <div className="flex justify-between">
                {/* DROPDOWN CONTAINER START HERE */}
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-2">
                    {/* Form Element 1 */}
                    <div className="mb-2">
                      <select
                        name="business_type"
                        id="business_type"
                        value={formData.business_type}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      >
                        {insurance &&
                          insurance.business_options.business_types.map(
                            (item) => (
                              <option key={item.value} value={item.value}>
                                {item.text}
                              </option>
                            )
                          )}
                      </select>
                      {errors.business_type && (
                        <span className="error">{errors.business_type}</span>
                      )}
                    </div>

                    {/* Form Element 2 */}

                    {formData.business_type === "1" && (
                      <div className="mb-2">
                        <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="vehicle_type"
                          value={formData.vehicle_type}
                          onChange={handleInputChange}
                        >
                          {insurance &&
                            insurance.business_options.vehicle_types.map(
                              (item) => (
                                <option key={item.value} value={item.value}>
                                  {item.text}
                                </option>
                              )
                            )}
                          {errors.vehicle_type && (
                            <span className="error">{errors.vehicle_type}</span>
                          )}
                        </select>
                      </div>
                    )}

                    {/* Form Element 3 */}
                    {formData.vehicle_type === "1" &&
                      formData.business_type === "1" && (
                        <div className="mb-2">
                          <select
                            className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            name="two_wheeler_type"
                            value={formData.two_wheeler_type}
                            onChange={handleInputChange}
                          >
                            {insurance &&
                              insurance.business_options.two_wheeler_types.map(
                                (item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.text}
                                  </option>
                                )
                              )}
                          </select>
                          {errors.two_wheeler_type && (
                            <span className="error text-red-400">
                              {errors.two_wheeler_type}
                            </span>
                          )}
                        </div>
                      )}

                    {/* Form Element 4 */}
                    {(((formData.two_wheeler_type === "1" ||
                      formData.two_wheeler_type === "2") &&
                      formData.business_type === "1") ||
                      formData.business_type === "2" ||
                      formData.business_type === "3") && (
                      <div className="mb-2">
                        <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="policy_type"
                          value={formData.policy_type}
                          onChange={handleInputChange}
                        >
                          {insurance &&
                            insurance.business_options.policy_type_list[
                              formData.business_type
                            ].map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.text}
                              </option>
                            ))}
                        </select>
                        {errors.policy_type && (
                          <span className="error text-red-400">
                            {errors.policy_type}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Form Element 5 */}
                    {(formData.policy_type === "1" ||
                      formData.policy_type === "2") && (
                      <div className="mb-2">
                        <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="coverage_type"
                          value={formData.coverage_type}
                          onChange={handleInputChange}
                        >
                          {insurance &&
                            insurance.business_options.coverage_types.map(
                              (item) => (
                                <option key={item.value} value={item.value}>
                                  {item.text}
                                </option>
                              )
                            )}
                        </select>
                        {errors.coverage_type && (
                          <span className="error text-red-400">
                            {errors.coverage_type}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Form Element 6 */}
                    {(formData.policy_type === "1" ||
                      formData.policy_type === "2" ||
                      formData.policy_type === "3") && (
                      <div className="mb-2">
                        <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="fuel_type"
                          value={formData.fuel_type}
                          onChange={handleInputChange}
                        >
                          <option value="">All</option>
                          {insurance &&
                            insurance.business_options.fuel_types.map(
                              (item) => (
                                  (formData.vehicle_type === "1") ? (
                                      (item.text=="Petrol" || item.text=="EV") && (
                                    <option key={item.value} value={item.value}>
                                      {item.text}
                                    </option>
                                      )
                                  ) :
                                    <option key={item.value} value={item.value}>
                                      {item.text}
                                    </option>
                              )
                            )}
                        </select>
                        {errors.fuel_type && (
                          <span className="error text-red-400">
                            {errors.fuel_type}
                          </span>
                        )}
                      </div>
                    )}
                    {/* Form Element 6 */}
                    {(formData.policy_type === "1" ||
                      formData.policy_type === "2" ||
                      formData.policy_type === "3") && (
                      <div className="mb-2">
                        <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="engine_type"
                          value={formData.engine_type}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Engine Type</option>
                          {insurance &&
                            insurance.business_options.engine_type_list[formData.vehicle_type][formData.fuel_type].map(
                              (item) => (
                                    <option key={item.value} value={item.value}>
                                      {item.text}
                                    </option>
                              )
                            )}
                        </select>
                        {errors.engine_type && (
                          <span className="error text-red-400">
                            {errors.engine_type}
                          </span>
                        )}
                      </div>
                    )}
                {/* DROPDOWN CONTAINER END HERE */}
                {/* DROPDOWN CONTAINER START HERE */}
                    {/* Form Element 1 */}
                    <div className="flex-1 mr-2">
                      <select
                          name="insurer"
                          id="insurerList"
                          value={formData.insurer}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      >
                        {insurance &&
                            insurance.business_options.insurers.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.text}
                                </option>
                            ))}
                      </select>
                      {(errors.insurer!=="undefined")?
                          <span className="error text-red-400">{errors.insurer}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                          className="w-full p-2"
                          name="policy_number"
                          value={formData.policy_number}
                          onChange={handleInputChange}
                          placeholder="Enter Policy Number"
                      />
                      {(errors.policy_number!=="undefined")?
                          <span className="error text-red-400">{errors.policy_number}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                          className="w-full p-2"
                          type="text"
                          name="risk_start_date"
                          value={formData.risk_start_date}
                          onChange={handleInputChange}
                          placeholder="Risk Start Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}

                      />
                      {(errors.risk_start_date!=="undefined")?
                          <span className="error text-red-400">{errors.risk_start_date}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                          className="w-full p-2"
                          name="own_damage"
                          value={formData.own_damage}
                          onChange={handleInputChange}
                          placeholder="Enter OD Amount"
                      />
                      {(errors.own_damage!=="undefined")?
                          <span className="error text-red-400">{errors.own_damage}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                          className="w-full p-2"
                          name="third_party"
                          value={formData.third_party}
                          onChange={handleInputChange}
                          placeholder="Enter TP Amount"
                      />
                      {(errors.third_party!=="undefined")?
                          <span className="error text-red-400">{errors.third_party}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                          className="w-full p-2"
                          name="net_amount"
                          value={formData.net_amount}
                          onChange={handleInputChange}
                          placeholder="Enter NET Amount"
                      />
                      {(errors.net_amount!=="undefined")?
                          <span className="error text-red-400">{errors.net_amount}</span>
                          :""}
                    </div>

                    {/* Form Element 3 */}
                    <div className="mb-2">
                      <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="partner_code"
                          value={formData.partner_code}
                          onChange={handleInputChange}
                      >
                        {insurance &&
                            insurance.partners.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.text}
                                </option>
                            ))}
                      </select>
                      {(errors.partner_code!=="undefined")?
                          <span className="error text-red-400">{errors.partner_code}</span>
                          :""}
                    </div>

                    {/* Form Element 4 */}
                    <div className="flex-1 mr-2">
                      <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="payment_type"
                          value={formData.payment_type}
                          onChange={handleInputChange}
                      >
                        {insurance &&
                            insurance.business_options.payment_types.map(
                                (item) => (
                                    <option key={item.value} value={item.value}>
                                      {item.text}
                                    </option>
                                )
                            )}
                      </select>
                      {(errors.payment_type!=="undefined")?
                          <span className="error text-red-400">{errors.payment_type}</span>
                          :""}
                  </div>
                {/* DROPDOWN CONTAINER END HERE */}
             

              {/* FOOTER INPUT BOX CONTAINER START HERE */}
                  {/* First Input Box */}
                  {(formData.policy_type === "1" ||
                    formData.policy_type === "2" ||
                    formData.policy_type === "3") && (
                    <div className="flex-1 mr-2">
                      <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="vehicle_manufacture"
                          id="makes"
                          value={formData.vehicle_manufacture}
                          onChange={handleInputChange}
                      >
                        <option value={0}>Select Vehicle Make</option>
                        {insurance.business_options &&
                            insurance.business_options.vehicle_makes.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                            ))}
                      </select>
                      {errors.makes && (
                          <span className="error">{errors.makes}</span>)}
                      {errors.vehicle_manufacture && (
                        <span className="error">
                          {errors.vehicle_manufacture}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Second Input Box */}
                  {(formData.policy_type === "1" ||
                    formData.policy_type === "2" ||
                    formData.policy_type === "3") && (
                    <div className="flex-1 mr-2">
                      <select
                          className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          name="vehicle_model"
                          id="models"
                          value={formData.vehicle_model}
                          onChange={handleInputChange}
                      >
                        <option value={0}>Select Vehicle Model</option>
                        {insurance.business_options &&
                            insurance.business_options.vehicle_models.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                            ))}
                      </select>
                      {errors.vehicle_model && (
                        <span className="error">{errors.vehicle_model}</span>
                      )}
                    </div>
                  )}
                  {(formData.policy_type === "1" ||
                    formData.policy_type === "2" ||
                    formData.policy_type === "3") && (
                    <div className="flex-1 items-center mr-2">
                      <input
                        type="text"
                        className="w-full p-2 border"
                        placeholder="Vehicle Registration No."
                        name="registration_number"
                        onChange={handleInputChange}
                        value={formData.registration_number}
                      />
                      {errors.registration_number && (

                        <span className="error block">
                          {errors.registration_number}
                        </span>
                      )}
                    </div>
                  )}
                  {/* Fourth Input Box */}
                  {(formData.policy_type === "1" ||
                    formData.policy_type === "2" ||
                    formData.policy_type === "3") && (
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full p-2"
                        name="vehicle_registration_date"
                        onChange={handleInputChange}
                        value={formData.vehicle_registration_date}
                        placeholder="Vehicle Registration Date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                      {errors.vehicle_registration_date && (
                        <span className="error">
                          {errors.vehicle_registration_date}
                        </span>
                      )}
                    </div>
                  )}

              {/* FOOTER INPUT BOX CONTAINER END HERE */}
            </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel className="policytabtwo">
            <div className="container my-4">
              <div className="flex justify-between">
                {/* DROPDOWN CONTAINER START HERE */}
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Form Element 1 */}

                    <div className="flex-1 mr-2">
                      <input
                        className="w-full p-2"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        placeholder="Customer Name"
                      />
                      {(errors.customer_name!=="undefined")?
                          <span className="error text-red-400">{errors.customer_name}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        className="w-full p-2"
                        name="customer_mobile"
                        value={formData.customer_mobile}
                        onChange={handleInputChange}
                        placeholder="Customer Mobile"
                      />
                      {(errors.customer_mobile!=="undefined")?
                          <span className="error text-red-400">{errors.customer_mobile}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        className="w-full p-2"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        placeholder="Customer Email"
                      />
                      {(errors.customer_email!=="undefined")?
                          <span className="error text-red-400">{errors.customer_email}</span>
                          :""}
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        className="w-full p-2"
                        name="customer_address"
                        value={formData.customer_address}
                        onChange={handleInputChange}
                        placeholder="Customer Address"
                      />
                      {(errors.customer_address!=="undefined")?
                          <span className="error text-red-400">{errors.customer_address}</span>
                          :""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel className="policytabtwo policytabfour">
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form Element 1 */}

                    <div className="flex-1 mr-2">
                      {/*<label for="currentpolicy">Current Policy</label>*/}
                      <input
                        type="file"
                        id="currentpolicy"
                        name="current_policy_file"
                        className="w-full p-2 custom-file-input"
                        onChange={handleFileInputChange}
                        title="s e "
                      />
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        type="file"
                        id="inscopy"
                        name="previous_policy_file"
                        className="w-full p-2 custom-file-input"
                        onChange={handleFileInputChange}
                        title="s e "
                      />
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        type="file"
                        id="rccopy"
                        name="rc_file"
                        className="w-full p-2 custom-file-input"
                        onChange={handleFileInputChange}
                        title="s e "
                      />
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        type="file"
                        id="vehiclephoto"
                        name="vehicle_photo_file"
                        className="w-full p-2 custom-file-input"
                        onChange={handleFileInputChange}
                        title="s e "
                      />
                    </div>

                    {/* KYC Document Input */}
                    <div className="flex-1 mr-2">
                      <select
                        value={FormData.kycdocument}
                        name="kyc_document"
                        onChange={handleKYCDocumentChange}
                        className="w-full p-2 custom-file-input"
                      >
                        <option value="">Select KYC Document</option>
                        <option value="adhar">Adhar</option>
                        <option value="pancard">Pancard</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {kycdocument && (
                      <div className="flex-1 mr-2">
                        <input
                          type="file"
                          id="kycdocument"
                          name={`kyc_${kycdocument}_document`}
                          className="w-full p-2"
                          title={`Upload ${kycdocument.toUpperCase()} Document`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel className="policytabtwo policytabfour">
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="flex-1 mr-2">
                      <label for="">Any Comment or Remark ?</label>
                      <textarea rows={10}
                        className="w-full p-2 custom-file-input"
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        placeholder=""
                      />
                    </div>

                  </div>
                  
                </div>
              </div>
            </div>
          </TabPanel>

          {selectedTabIndex !== 3 && (
            <div className="flex justify-center">
              <button
                onClick={handleSaveAndNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 save"
              >
                Save & Next
              </button>
            </div>
          )}
        </Tabs>
      </Card>
    </Layout>
  );
};

export default PolicyAdd;
