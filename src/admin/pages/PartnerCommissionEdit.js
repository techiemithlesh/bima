import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { useParams } from "react-router-dom";



const PartnerComissionEdit = () => {
    const { id } = useParams();
    const [partnerData, setPartnerData] = useState();
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    let handleSave = () => {
        console.log("Clicked");
     }

    function generateBreadcrumbData(data, RightContent = null) {

        const { partner } = data || {};
        return {
            leftItems: [
                { label: "Partners", link: '#'},
                { label: "Edit Commision", link: "#" },
            ],
            middleContent: partner && partner.name ? ` ${partner.name}` : "User Name",
            rightItems: [RightContent],
        };
    }

    const RightContent = (
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
            Save
        </button>
    );


    



    return (
        <Layout title="Edit Commission" breadcrumbData={generateBreadcrumbData({}, RightContent)}>
           <form id="form">
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
                        <option key={item.value} value={item.value}>
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
                    {partnerData &&
                      partnerData.commission_options.fuel_types.map((item) => (
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
                    {partnerData &&
                      partnerData.commission_options.seats.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                  </select>
                </div>
              )}


            </div>
          </div>

          {/* FORM INPUT CONTAINER END HERE */}

          {/* TABLE CONTAINER START HERE */}
          {formData.vehicle_type === 'two-wheeler' && (
            <div className="table_container">
              <table className="min-w-full table-auto border-2 border-gray-300 comission">

                <tbody>
                  {
                    partnerData &&
                    partnerData.commission_options.engines
                      .filter((engine) => engine.text.toLowerCase().includes('cc') | engine.text.toLowerCase().includes('age'))
                      .map((engine, index) => (

                        <tr className="shade" data-index={engine} data-index_={index == '0'}>
                          {index === '0' ? <th className="border-b shade p-2">{partnerData.commission_options.engines[0].text}</th> :
                            <th className=""> <input className="text-x text-center shade" value={engine.text} />
                            </th>
                          }
                          {partnerData &&
                            partnerData.commission_options.vehicle_ages.map((ages, sn) => (

                              index === 0 ? <th className="border-2 shade text-center" key={sn}>{ages.text}</th> : <td className="border-2 text-center" key={sn}>
                                <input type="hidden" className={engine.value + " text-x bordersm"} value={ages.value} name={"agecapacity[" + engine.value + "][" + ages.value + "][age]"} />
                                <input type="hidden" value={engine.value} name={"agecapacity[" + engine.value + "][" + ages.value + "][capacity]"} />
                                <input type="number" className={" text-x p-2 bordersm"} name={"agecapacity[" + engine.value + "][" + ages.value + "][value]"} />

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
                  <div className="flex-1 mr-2">
                    <input className="w-full p-2" 
                    name="od_percent" id="od_percent" 
                    value={formData.od_precent} 
                    onChange={handleInputChange} placeholder="OD Commission %" />
                  </div>

                  {/* Second Input Box */}
                  <div className="flex-1 mr-2">
                    <input className="w-full p-2"
                      name="tp_percent"
                      value={formData.tp_percent}
                      onChange={handleInputChange}
                      placeholder="TP Comission %" />
                  </div>

                  {/* Third Input Box with Checkbox */}
                  <div className="flex-1 flex items-center mr-2">
                    <input
                      name="net_percent"
                      className="w-full p-2 border"
                      id="net_percent"
                      value={formData.net_percent}
                      onChange={handleInputChange}
                      placeholder="Net Commission %"
                      disabled={!isChecked}
                    />
                    <input
                      type="checkbox"
                      name="net_percent_checkbox"
                      className="ml-2"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                  </div>

                  {/* Fourth Input Box */}
                  <div className="flex-1">
                    <input name="flat_amount"
                      id="flat_amount"
                      value={formData.flat_amount}
                      onChange={handleInputChange}
                      className="w-full p-2" placeholder="Flat Amount" />
                  </div>

                  <div className="flex-1">
                    <input name="partner_id" on type="hidden" className="w-full p-2" value={partnerData.partner.id} />
                  </div>
                </div>
              </div>

              {/* FOOTER INPUT BOX CONTAINER END HERE */}
            </div>
          )}

          {/* TABLE CONTAINER END HERE */}

        </form>
        </Layout>
    )
}

export default PartnerComissionEdit;