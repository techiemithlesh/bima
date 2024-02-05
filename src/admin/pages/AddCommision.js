import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";
import axios, { formToJSON } from "axios";
import Loading from "react-loading";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


const AddComission = () => {
  const { id } = useParams();

  const [partnerData, setPartnerData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  let [formData, setFormData] = useState({
    insurer: '',
    commission_type: '',
    vehicle_type: '',
    vehicle_subtype: '',
    fuel_type: '',
    seat: '',
    agecapacity: []
  })

  const [loading, setLoading] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSave = () => {

    const Data = new FormData(document.getElementById('form'));
    formData = formToJSON(Data);

    console.log('Form Data:', formData);

    const csrfToken = Cookies.get('XSRF-TOKEN');
    console.log('CSRF Token:', csrfToken);
    axios.post('https://premium.treatweb.com/public/api/admin/partner/commission/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': csrfToken,
      },
    }).then((response) => {
      console.log("Form Submitted", response.data.message);
      const { success, message } = response.data;
      console.log("destructure", success, message);

      if (success) {
        alert(message);
        toast("Hello", {
          position: 'bottom-right'
        })
        toast.success(message);
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


    return {
      leftItems: [
        { label: "Partners", link: "/admin/partners" },
        { label: "Commision", link: "/admin/dashboard" },
      ],
      middleContent: partner && partner.name ? ` ${partner.name}` : "User Name",
      rightItems: RightContent,
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
                    <input className="w-full p-2" name="od_percent" value={partnerData.commissions[0].od_percent} placeholder="OD Commission %" />
                  </div>

                  {/* Second Input Box */}
                  <div className="flex-1 mr-2">
                    <input className="w-full p-2" name="tp_percent" value={partnerData.commissions[0].tp_percent} placeholder="TP Comission %" />
                  </div>

                  {/* Third Input Box with Checkbox */}
                  <div className="flex-1 flex items-center mr-2">
                    <input
                      name="net_percent"
                      className="w-full p-2 border"
                      value={partnerData.commissions[0].net_percent}
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
                    <input name="flat_amount" value={partnerData.commissions[0].flat_amount} className="w-full p-2" placeholder="Flat Amount" />
                  </div>

                  <div className="flex-1">
                    <input name="partner_id" type="hidden" className="w-full p-2" value={partnerData.partner.id} />
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

export default AddComission;