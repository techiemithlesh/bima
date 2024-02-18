import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { TabsIcon } from "../../shared/Assets";
import axios, { formToJSON } from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const Policy = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [kycdocument, setKycDocument] = useState("");
  const navigate = useNavigate();

  const [insurance, setInsurance] = useState(null);
  const [formData, setFormData] = useState({
    business_type: "",
    vehicle_type: "",
    policy_type: "",
    two_wheeler_type: "",
    coverage_type: "",
    fuel_type: "",
    agecapacity: [],
  });
  // const errors = [];
  // const setErrors = (message)=>{
  //   console.log(4,message);
  //   // errors=0;
  // }

  const [errors, setErrors] = useState({
    vehicle_manufacture: "",
    vehicle_model: "",
    registration_number: "",
    vehicle_registration_date: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.vehicle_manufacture) {
      newErrors.vehicle_manufacture = "Vehicle Make is required.";
      valid = false;
    }

    if (!formData.vehicle_model) {
      newErrors.vehicle_model = "Vehicle Model is required.";
      valid = false;
    }

    if (!formData.registration_number) {
      newErrors.registration_number = "Vehicle Registration No. is required.";
      valid = false;
    }

    if (!formData.vehicle_registration_date) {
      newErrors.vehicle_registration_date =
        "Vehicle Registration Date is required.";
      valid = false;
    }

    setErrors({ ...errors, ...newErrors });

    return valid;
  };

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

  const handleKYCDocumentChange = (e) => {
    setKycDocument(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevData) => ({
      ...prevData,
     [name]:"",
    }));

    let checkclass = document.querySelectorAll(".policytabone #form");
    if (checkclass.length > 0) {
      const Data = new FormData(document.getElementById("form"));
      const updatedFormData = formToJSON(Data);
      if (Object.keys(updatedFormData).length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          "agecapacity": updatedFormData.agecapacity,
          "engines": Object.assign({},updatedFormData.engines),
          "ages": Object.assign({},updatedFormData.ages)
        }));
     }
      console.log(Object.assign({},updatedFormData.engines));

    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function generateBreadcrumbData(selectedTabIndex, rightContent = null) {
    let middleContent;
    let isSaveDisabled = true;

    switch (selectedTabIndex) {
      case 0:
        middleContent = "Business Details";
        break;
      case 1:
        middleContent = "Policy Details";
        break;
      case 2:
        middleContent = "Customer Details";
        isSaveDisabled = false;
        break;
      case 3:
        middleContent = "Documents";
        isSaveDisabled = false;
        break;
      case 4:
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
        { label: "Policies", link: "/policy/list" },
      ],
      middleContent: middleContent,
      rightItems: (
        <button
          onClick={handleSave}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full ${isSaveDisabled? 'cursor-not-allowed': ''}`}
          disabled={isSaveDisabled}
        >
          Save
        </button>
      ),
    };
  }

  const handleSave = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    setErrors({});
    const csrfToken = Cookies.get("XSRF-TOKEN");
    console.log(formData);
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
        if (success===false) {
          setErrors(message);
          alert('one or more filed is blank or invalid.')
        } else {
          alert(message);
          toast.success(message, {
            position: "top-right",
          });
          navigate('/policy/list');
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
    const isValid = validateForm();

    if (isValid) {
      setSelectedTabIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Layout
      title="Add Policy"
      breadcrumbData={generateBreadcrumbData(selectedTabIndex)}
      className="policy"
    >
      <Card bgColor="gray-100">
        <Tabs
          selectedIndex={selectedTabIndex}
          onSelect={(index) => setSelectedTabIndex(index)}
        >
          <TabList
            style={{ display: "flex", margin: 0, padding: 0 }}
            className="policytab"
          >
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}>
              <span className="tabicon">
                <img src={TabsIcon.Tab1} alt="" />
              </span>
            </Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}>
              <span className="tabicon">
                <img src={TabsIcon.Tab2} alt="" />
              </span>
            </Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}>
              <span className="tabicon">
                <img src={TabsIcon.Tab3} alt="" />
              </span>
            </Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}>
              <span className="tabicon">
                <img src={TabsIcon.Tab4} alt="" />
              </span>
            </Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}>
              <span className="tabicon">
                <img src={TabsIcon.Tab5} alt="" />
              </span>
            </Tab>
          </TabList>

          <TabPanel className="policytabone">
            <div className="container my-4">
              <div className="flex justify-between">
                {/* DROPDOWN CONTAINER START HERE */}
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12">
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
                          {insurance &&
                            insurance.business_options.fuel_types.map(
                              (item) => (
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
                  </div>
                </div>
                {/* DROPDOWN CONTAINER END HERE */}
              </div>

              {/* TABLE CONTAINER START HERE  */}
              {(formData.policy_type === "1" ||
                formData.policy_type === "2" ||
                formData.policy_type === "3") && (
                <form id="form">
                  <table className="min-w-full table-auto border comission">
                    <tbody>
                      {insurance &&
                        insurance.business_options.engines
                          .filter(
                            (engine) =>
                              engine.text.toLowerCase().includes("cc") |
                              engine.text.toLowerCase().includes("age")
                          )
                          .map((engine, index) => (
                            <tr className="shade">
                              {index === 0 ? (
                                <th className="border-b shade p-2">
                                  {insurance.business_options.engines[0].text}
                                  <input type="hidden" name={"engines[0]"}
                                         className="text-x text-center shade"
                                         value={engine.text}
                                  />
                                </th>
                              ) : (
                                <th className="">
                                  {" "}
                                  <input name={"engines["+engine.value+"]"}
                                    className="text-x text-center shade"
                                    value={engine.text}
                                  />
                                </th>
                              )}
                              {insurance &&
                                insurance.business_options.vehicle_ages.map(
                                  (ages, sn) =>
                                    index === 0 ? (
                                      <th
                                        className="border-2 shade text-center"
                                        key={sn}
                                      >
                                        {ages.text}
                                        <input
                                            className="text-x text-center shade" type="hidden"
                                            name={"ages["+ages.value+"]"}
                                            value={ages.text}
                                        />
                                      </th>
                                    ) : (
                                      <td
                                        className="border-2 text-center"
                                        key={sn}
                                      >
                                        <input
                                          type="hidden"
                                          className={
                                            engine.value + " text-x bordersm"
                                          }
                                          value={ages.value}
                                          name={
                                            "agecapacity[" +
                                            engine.value +
                                            "][" +
                                            ages.value +
                                            "][age]"
                                          }
                                        />
                                        <input
                                          type="hidden"
                                          value={engine.value}
                                          name={
                                            "agecapacity[" +
                                            engine.value +
                                            "][" +
                                            ages.value +
                                            "][capacity]"
                                          }
                                        />
                                        <input
                                          type="number"
                                          className={" text-x p-2 bordersm"}
                                          name={
                                            "agecapacity[" +
                                            engine.value +
                                            "][" +
                                            ages.value +
                                            "][value]"
                                          }
                                        />
                                      </td>
                                    )
                                )}
                              {index === 0 ? (
                                <th className="border-2 shade text-center">
                                  DEAL
                                </th>
                              ) : (
                                <td className="text-center">
                                  <input
                                    type="text"
                                    className="text-x p-2 bordersm"
                                    name={
                                      "agecapacity[" + engine.value + "][deal]"
                                    }
                                  />
                                </td>
                              )}
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </form>
              )}

              {/* TABLE CONTAINER END HERE  */}

              {/* FOOTER INPUT BOX CONTAINER START HERE */}
              <div className="footer_input_box_container mt-4 mb-24">
                <div className="flex">
                  {/* First Input Box */}
                  {(formData.policy_type === "1" ||
                    formData.policy_type === "2" ||
                    formData.policy_type === "3") && (
                    <div className="flex-1 mr-2">
                      <input
                        className="w-full p-2"
                        placeholder="Vehicle Make"
                        onChange={handleInputChange}
                        name="vehicle_manufacture"
                      />
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
                      <input
                        className="w-full p-2"
                        placeholder="Vehicle Model"
                        onChange={handleInputChange}
                        name="vehicle_model"
                      />
                      {errors.vehicle_model && (
                        <span className="error">{errors.vehicle_model}</span>
                      )}
                    </div>
                  )}
                  {(formData.policy_type === "1" ||
                    formData.policy_type === "2" ||
                    formData.policy_type === "3") && (
                    <div className="flex-1 flex items-center mr-2">
                      <input
                        type="text"
                        className="w-full p-2 border"
                        placeholder="Vehicle Registration No."
                        name="registration_number"
                        onChange={handleInputChange}
                      />
                      {errors.registration_number && (
                        <span className="error">
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
                        type="date"
                        className="w-full p-2"
                        name="vehicle_registration_date"
                        onChange={handleInputChange}
                        placeholder="Vehicle Registration Date"
                      />
                      {errors.vehicle_registration_date && (
                        <span className="error">
                          {errors.vehicle_registration_date}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER INPUT BOX CONTAINER END HERE */}
            </div>
          </TabPanel>

          <TabPanel className="policytabtwo">
            <div className="container my-4">
              <div className="flex justify-between">
                {/* DROPDOWN CONTAINER START HERE */}
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Form Element 1 */}
                    <div className="mb-2">
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
                        type="date"
                        name="risk_start_date"
                        value={formData.risk_start_date}
                        onChange={handleInputChange}
                        placeholder="Risk Start Date"
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
                    <div className="mb-2">
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
                  </div>
                </div>
                {/* DROPDOWN CONTAINER END HERE */}
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
                        className="w-full p-2 custom-file-input"
                        title="s e "
                      />
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        type="file"
                        id="inscopy"
                        className="w-full p-2 custom-file-input"
                        title="s e "
                      />
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        type="file"
                        id="rccopy"
                        className="w-full p-2 custom-file-input"
                        title="s e "
                      />
                    </div>

                    <div className="flex-1 mr-2">
                      <input
                        type="file"
                        id="vehiclephoto"
                        className="w-full p-2 custom-file-input"
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
                      <textarea
                        className="w-full p-2 custom-file-input w-full"
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
          {formData.policy_type && selectedTabIndex !== 4 && (
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
export default Policy;
