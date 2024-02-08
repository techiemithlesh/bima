import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { formToJSON } from "axios";
import { TabsIcon } from "../../shared/Assets";
import { data } from "autoprefixer";

const Policy = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [kycdocument, setKycDocument] = useState('');

    const [insurance, setInsurance] = useState(null);
    const [formData, setFormData] = useState({
        business_options: '',
        vehicle_types: '',
        two_wheeler_types: '',
        vehicleSubTypes: '',
        fuelTypes: '',
        seats: '',
    });

    console.log(formData);
    useEffect(() => {
        fetch(`https://premium.treatweb.com/public/api/admin/policies/options`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setInsurance(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);



    const handleSave = () => {
        console.log('Form Data:', formData);
    };

    const handleKYCDocumentChange = (e) => {
        setKycDocument(e.target.value);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function generateBreadcrumbData(selectedTabIndex, rightContent = null) {
        let middleContent;

        switch (selectedTabIndex) {
            case 0:
                middleContent = "Business Details";
                break;
            case 1:
                middleContent = "Policy Details";
                break;
            case 2:
                middleContent = "Customer Details";
                break;
            case 3:
                middleContent = "Documents";
                break;
            case 4:
                middleContent = "Comments";
                break;
        }

        return {
            leftItems: [
                { label: "", link: "/" },
                { label: "Partners", link: "/admin/partners" },
            ],
            middleContent: middleContent,
            rightItems: RightContent
        }
    }


    const RightContent = (
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
            Save
        </button>
    );

    return (
        <Layout title="Add Policy" breadcrumbData={generateBreadcrumbData(selectedTabIndex)} className="policy">
            <Card bgColor="gray-100" >
                <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)}>
                    <TabList style={{ display: "flex", margin: 0, padding: 0 }} className="policytab">
                        <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Tab1} alt="" /></span></Tab>
                        <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Tab2} alt="" /></span></Tab>
                        <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Tab3} alt="" /></span></Tab>
                        <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Tab4} alt="" /></span></Tab>
                        <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Tab5} alt="" /></span></Tab>
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
                                                name="business_options"
                                                id="business_options"
                                                value={formData.business_options}
                                                onChange={handleInputChange}
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">Select Lines of Business</option>
                                                {insurance && insurance.business_options.business_types.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.text}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>

                                        {/* Form Element 2 */}

                                        {formData.business_options === '1' && (
                                            <div className="mb-2">
                                                <select
                                                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"

                                                    name="vehicle_types"
                                                    value={formData.vehicle_types}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Select Vehicle Type</option>
                                                    {insurance && insurance.business_options.vehicle_types.map((item) => (
                                                        <option key={item.value} value={item.value}>
                                                            {item.text}
                                                        </option>
                                                    ))}

                                                </select>
                                            </div>
                                        )}

                                        {/* Form Element 3 */}
                                        {formData.vehicle_types === '1' && (
                                            <div className="mb-2">

                                                <select
                                                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                    name="two_wheeler_types"
                                                    value={formData.two_wheeler_types}
                                                    onChange={handleInputChange}
                                                >
                                                    {insurance && insurance.business_options.two_wheeler_types.map((item) => (
                                                        <option key={item.value} value={item.value}>
                                                            {item.text}
                                                        </option>
                                                    ))}

                                                </select>
                                            </div>
                                        )}


                                        {/* Form Element 4 */}
                                        {formData.two_wheeler_types &&(
                                            <div className="mb-2">

                                                <select
                                                    className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                    name="policy_types"
                                                    value={formData.policy_types}
                                                    onChange={handleInputChange}
                                                >
                                                   {insurance && insurance.business_options.policy_types.map((item) => (
                                                        <option key={item.value} value={item.value}>
                                                            {item.text}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}


                                        {/* Form Element 5 */}
                                        <div className="mb-2">

                                            <select
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                name="fuelTypes"
                                                value={formData.fuelTypes}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Coverage Type</option>
                                            </select>
                                        </div>

                                        {/* Form Element 6 */}
                                        <div className="mb-2">

                                            <select
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                name="seats"
                                                value={formData.seats}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Fuel Type</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* DROPDOWN CONTAINER END HERE */}
                            </div>

                            {/* TABLE CONTAINER START HERE  */}
                            <table className="min-w-full table-auto border comission">
                                <thead>
                                    <tr className="bg-gray-300 shade">
                                        <div className="flex items-center">
                                            <th className="px-4 py-2 w-1/6 text-x ">Age/Capacity</th>
                                            <th className="px-4 py-2 w-1/6 text-x">New</th>
                                            <th className="px-4 py-2 w-1/6 text-x">.1-5</th>
                                            <th className="px-4 py-2 w-1/6 text-x">.5-7</th>
                                            <th className="px-4 py-2 w-1/6 text-x"> &gt; 10</th>
                                            <th className="px-4 py-2 w-1/6 text-x">DEAL</th>
                                        </div>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr >
                                        <th className="flex shade mb-4">
                                            <input className="text-center shade" value="0-75"
                                            />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                        </th>
                                    </tr>
                                    <tr >
                                        <th className="flex shade mb-4">
                                            <input className="text-center shade" value="75-150"
                                            />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                        </th>
                                    </tr>

                                    <tr >
                                        <th className="flex shade mb-4">
                                            <input className=" text-center shade " value="150-350"
                                            />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                        </th>
                                    </tr>
                                    <tr >
                                        <th className="flex shade mb-4">
                                            <input className=" text-center shade " value=">350"
                                            />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                            <input className="bordersm mx-2" />
                                        </th>
                                    </tr>

                                </tbody>
                            </table>
                            {/* TABLE CONTAINER END HERE  */}

                            {/* FOOTER INPUT BOX CONTAINER START HERE */}
                            <div className="footer_input_box_container mt-4 mb-24">
                                <div className="flex">
                                    {/* First Input Box */}
                                    <div className="flex-1 mr-2">
                                        <input className="w-full p-2" placeholder="Vehicle Make" />
                                    </div>

                                    {/* Second Input Box */}
                                    <div className="flex-1 mr-2">
                                        <input className="w-full p-2" placeholder="Vehicle Model" />
                                    </div>

                                    {/* Third Input Box with Checkbox */}
                                    <div className="flex-1 flex items-center mr-2">
                                        <input
                                            type="text"
                                            className="w-full p-2 border"
                                            placeholder="Vehicle Registration No."

                                        />

                                    </div>

                                    {/* Fourth Input Box */}
                                    <div className="flex-1">
                                        <input type="text" className="w-full p-2" placeholder="Vehicle Registration Date" />
                                    </div>
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
                                                <option value="">Select Insurer</option>

                                            </select>
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Enter Policy Number" />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Risk Start Date" />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Risk Start Date" />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Enter TP Amount" />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Enter NET Amount" />
                                        </div>

                                        {/* Form Element 3 */}
                                        <div className="mb-2">

                                            <select
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                name="vehicleTypes"
                                                value={formData.vehicleTypes}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">IMD Code</option>
                                            </select>
                                        </div>

                                        {/* Form Element 4 */}
                                        <div className="mb-2">

                                            <select
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                name="vehicleSubTypes"
                                                value={formData.vehicleSubTypes}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Payment Type</option>
                                            </select>
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
                                            <input className="w-full p-2" placeholder="Customer Name" />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Customer Mobile" />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Customer Email" />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input className="w-full p-2" placeholder="Customer Address" />
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
                                            <input type="file" id="currentpolicy" className="w-full p-2 custom-file-input" title="s e " />
                                        </div>


                                        <div className="flex-1 mr-2">
                                            <input type="file" id="inscopy" className="w-full p-2 custom-file-input" title="s e " />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input type="file" id="rccopy" className="w-full p-2 custom-file-input" title="s e " />
                                        </div>

                                        <div className="flex-1 mr-2">
                                            <input type="file" id="vehiclephoto" className="w-full p-2 custom-file-input" title="s e " />
                                        </div>

                                        {/* KYC Document Input */}
                                        <div className="flex-1 mr-2">
                                            <select value={kycdocument} onChange={handleKYCDocumentChange} className="w-full p-2 custom-file-input">
                                                <option value="">Select KYC Document</option>
                                                <option value="adhar">Adhar</option>
                                                <option value="pancard">Pancard</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        {kycdocument && (
                                            <div className="flex-1 mr-2">
                                                <input type="file" id="kycdocument" className="w-full p-2" title={`Upload ${kycdocument.toUpperCase()} Document`} />
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
                                            <textarea className="w-full p-2 custom-file-input w-full" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </TabPanel>

                    <div className="flex justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 save">
                            Save & Next
                        </button>
                    </div>
                </Tabs>
            </Card>
        </Layout >
    );
}

export default Policy;
