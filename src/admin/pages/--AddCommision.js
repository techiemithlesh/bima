import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";
import { data } from "autoprefixer";


const AddComission = () => {
  const { id } = useParams();

  const [partnerData, setPartnerData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    insurer: '',
    businessTypes: '',
    vehicleTypes: '',
    vehicleSubTypes: '',
    fuelTypes: '',
    seats: '',
    ageCapacity: {},
  })



  const handleInputChange = (e, engineValue, index, rowIndex) => {
    const { name, value } = e.target;

    const updatedAgeCapacity = {
      ...formData.ageCapacity,
      [engineValue]: formData.ageCapacity[engineValue] || Array(5).fill(''), 
    };

    updatedAgeCapacity[engineValue][index] = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ageCapacity: updatedAgeCapacity,
    }));
  };

  const handleSave = () => {

    console.log('Form Data:', formData);
  };

  useEffect(() => {

    const apiUrl = `https://premium.treatweb.com/public/api/admin/partner/commissionoptions/${id}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPartnerData(data);
      })
      .catch((error) => {
        console.error("Error fetching partner data:", error);
      });
  }, [id]);

  function generateBreadcrumbData(data, rightContent = null) {
    const { partner } = data || {};


    return {
      leftItems: [
        { label: "Partners", link: "/admin/partners" },
        { label: "Commision", link: "/admin/dashboard" },
      ],
      middleContent: partner && partner.name ? ` ${partner.name}` : "User Name",
      rightItems: rightContent,
    };
  }

  const RightContent = (
    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
      Save
    </button>
  );

  return (
    <Layout title="Add Partner Comission" breadcrumbData={generateBreadcrumbData(partnerData, RightContent)}>
      <Card bgColor="gray">

        {/* FORM INPUT CONTAINER START HERE */}
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
                <option value="">Select Insurer</option>
                {partnerData && partnerData.commission_options.insurer_list.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>


            {/* Form Element 2 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Lines Of Business</label>
              <select
                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                disabled={!formData.insurer}
                name="businessTypes"
                id="business_types"
                value={formData.businessTypes}
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

            {/* Form Element 3 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Veicle Type</label>
              <select
                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                name="vehicleTypes"
                id="vehicle_types"
                value={formData.vehicleTypes}
                onChange={handleInputChange}
              >
                {partnerData &&
                  partnerData.commission_options.makes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
              </select>
            </div>

            {/* Form Element 4 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Veicle Sub Type</label>
              <select
                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                name="vehicleSubTypes"
                id="vehicle_sub_types"
                value={formData.vehicleSubTypes}
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

            {/* Form Element 5 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
              <select
                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                name="fuelTypes"
                id="fuel_types"
                value={formData.fuelTypes}
                onChange={handleInputChange}
              >
                {partnerData &&
                  partnerData.commission_options.fuel_types.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
              </select>
            </div>

            {/* Form Element 6 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Seating Capacity</label>
              <select
                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                name="seats"
                id="seats"
                value={formData.seats}
                onChange={handleInputChange}
              >
                {partnerData &&
                  partnerData.commission_options.seats.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
              </select>
            </div>

          </div>
        </div>

        {/* FORM INPUT CONTAINER END HERE */}

        {/* TABLE CONTAINER START HERE */}
        <div className="table_container">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-300">
                <div className="flex items-center">
                  {partnerData &&
                    partnerData.commission_options.vehicle_ages.map((item) => (
                      <th key={item.value} className="px-4 py-2 w-1/6 text-x">
                        {item.text}
                      </th>
                    ))}

                  <th className="px-4 py-2 w-1/6 text-x">DEAL</th>
                </div>
              </tr>
            </thead>

            <tbody>
            {partnerData &&
                partnerData.commission_options.engines.map((engine, rowIndex) => (
                  <tr key={engine.value}>
                    <td className="flex max-w-screen-md mb-4">
                      <input className="bg-gray-300 text-white p-2" value={engine.text} readOnly />
                      {[1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          className="p-2 mx-2"
                          onChange={(e) => handleInputChange(e, engine.value,index, rowIndex)}
                        />
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>

          {/* FOOTER INPUT BOX CONTAINER START HERE */}
          <div className="footer_input_box_container mt-4 mb-24">
            <div className="flex">
              {/* First Input Box */}
              <div className="flex-1 mr-2">
                <input className="w-full p-2" placeholder="OD Commission %" />
              </div>

              {/* Second Input Box */}
              <div className="flex-1 mr-2">
                <input className="w-full p-2" placeholder="TP Comission %" />
              </div>

              {/* Third Input Box with Checkbox */}
              <div className="flex-1 flex items-center mr-2">
                <input
                  className="w-full p-2 border"
                  placeholder="Net Commission %"
                  disabled={!isChecked}
                />
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
              </div>

              {/* Fourth Input Box */}
              <div className="flex-1">
                <input className="w-full p-2" placeholder="Flat Amount" />
              </div>
            </div>
          </div>

          {/* FOOTER INPUT BOX CONTAINER END HERE */}
        </div>
        {/* TABLE CONTAINER END HERE */}



      </Card>
    </Layout >

  )
}

export default AddComission;