import React from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";


const AddComission = () => {
  function generateBreadcrumbData(rightContent = null) {

    return {
      leftItems: [
        { label: "Partners", link: "/admin/partners" },
        { label: "Commision", link: "/admin/dashboard" },
      ],
      middleContent: "User Name",
      rightItems: rightContent,
    };
  }

  const RightContent = (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
      Save
    </button>
  );

  return (
    <Layout title="Add Partner Comission" breadcrumbData={generateBreadcrumbData(RightContent)}>
      <Card bgColor="gray">

        {/* FORM INPUT CONTAINER START HERE */}
        <div className="input_container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form Element 1 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Insurer</label>
              <select className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option>SBI General Insurance</option>
                <option>HDFC General Insurance</option>
              </select>
            </div>

            {/* Form Element 2 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Lines Of Business</label>
              <select className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option>Motor</option>
                <option>Gadget</option>
              </select>
            </div>

            {/* Form Element 3 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Veicle Type</label>
              <select className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option>Motor</option>
                <option>Gadget</option>
              </select>
            </div>

            {/* Form Element 4 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Veicle Sub Type</label>
              <select className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option>Motor</option>
                <option>Gadget</option>
              </select>
            </div>

            {/* Form Element 5 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
              <select className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option>Motor</option>
                <option>Gadget</option>
              </select>
            </div>

            {/* Form Element 6 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600">Seating Capacity</label>
              <select className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option>2</option>
                <option>3</option>
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
                  <th className="px-4 py-2 w-1/6 text-x">Age/Capacity</th>
                  <th className="px-4 py-2 w-1/6 text-x">New</th>
                  <th className="px-4 py-2 w-1/6 text-x">.1-5</th>
                  <th className="px-4 py-2 w-1/6 text-x">.5-7</th>
                  <th className="px-4 py-2 w-1/6 text-x"> &gt; 10</th>
                  <th className="px-4 py-2 w-1/6 text-x">DEAL</th>
                </div>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="flex max-w-screen-md mt-4 mb-4">
                  {/* First Input with Background Color */}
                  <input className="bg-gray-300 text-white p-2 " value=".0-75" />

                  {/* Second Input with White Background */}
                  <input className="bg-white p-2 mr-2" />

                  {/* Third Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fourth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fifth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Sixth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />
                </td>
              </tr>

              <tr>
                <td className="flex max-w-screen-md mb-4">
                  {/* First Input with Background Color */}
                  <input className="bg-gray-300 text-white p-2" value=".0-75" />

                  {/* Second Input with White Background */}
                  <input className="bg-white p-2 mr-2" />

                  {/* Third Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fourth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fifth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Sixth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />
                </td>
              </tr>

              <tr>
                <td className="flex max-w-screen-md mb-4">
                  {/* First Input with Background Color */}
                  <input className="bg-gray-300 text-white p-2 mr-2" value=".0-75" />

                  {/* Second Input with White Background */}
                  <input className="bg-white p-2 " />

                  {/* Third Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fourth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fifth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Sixth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />
                </td>
              </tr>

              <tr>
                <td className="flex max-w-screen-md">
                  {/* First Input with Background Color */}
                  <input className="bg-gray-300 text-white p-2 " value=".0-75" />

                  {/* Second Input with White Background */}
                  <input className="bg-white p-2 mr-2" />

                  {/* Third Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fourth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Fifth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />

                  {/* Sixth Input with Margin from Both Sides */}
                  <input className="p-2 mx-2" />
                </td>
              </tr>

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
                <input className="w-full p-2" placeholder="Net Commission %" />
                <input type="checkbox" className="ml-2" />
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
    </Layout>

  )
}

export default AddComission;