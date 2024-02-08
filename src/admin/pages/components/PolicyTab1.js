import React from "react";
import { TabPanel } from "react-tabs";



const PolicyTab1 = ({formData, handleInputChange}) => {
    return (
        <TabPanel className="policytabone">
                        <div className="container my-4">
                            <div className="flex justify-between">
                                {/* DROPDOWN CONTAINER START HERE */}
                                <div className="input_container w-full">
                                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12">
                                        {/* Form Element 1 */}
                                        <div className="mb-2">

                                            <select
                                                name="insurer"
                                                id="insurerList"
                                                value={formData.insurer}
                                                onChange={handleInputChange}
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">Select Lines of Business</option>

                                            </select>
                                        </div>

                                        {/* Form Element 2 */}
                                        <div className="mb-2">

                                            <select
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                disabled={!formData.insurer}
                                                name="businessTypes"
                                                value={formData.businessTypes}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Vehicle Type</option>
                                            </select>
                                        </div>

                                        {/* Form Element 3 */}
                                        <div className="mb-2">

                                            <select
                                                className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                name="vehicleTypes"
                                                value={formData.vehicleTypes}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Wheeler Type</option>
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
                                                <option value="">Select Policy Type</option>
                                            </select>
                                        </div>

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
    )
}

export default PolicyTab1;