import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Import the styles
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCreditCardAlt, faFileArrowUp, faLocationDot, faMessage } from "@fortawesome/free-solid-svg-icons";
import {TabsIcon} from "../../shared/Assets";

const PartnerDetails = () => {
  function generateBreadcrumbData(rightContent = null) {
    return {
      leftItems: [
        { label: "", link: "/" },
        { label: "Partners", link: "/admin/partners" },
      ],
      middleContent: "Add Personal Details",
      rightItems: rightContent,
    };
  }

  return (
    <Layout title="Partner Details" breadcrumbData={generateBreadcrumbData()}>
      <Card bgColor="gray-100">
        <Tabs>
          <TabList style={{ display: "flex", margin: 0, padding: 0 }}>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner1} alt=""/></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner2} alt=""/></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner4} alt=""/></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner3} alt=""/></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner5} alt=""/></span></Tab>
          </TabList>

          <TabPanel>
            <div className="container my-4">
              <div className="flex justify-between">
                {/* DROPDOWN CONTAINER START HERE */}
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Partner Name*</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Email*</label>
                      <input className="w-full p-2" placeholder="Email*" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Mobile*</label>
                      <input className="w-full p-2" placeholder="Mobile*" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Branch Name</label>
                      <input className="w-full p-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">PAN No</label>
                      <input className="w-full p-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Aadhaar No</label>
                      <input className="w-full p-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">License No</label>
                      <input className="w-full p-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Licence Expiry Date</label>
                      <input type="date" className="w-full p-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Status</label>
                      <select name="" id="" className="w-full p-2" >
                        <option value="">Select Status</option>
                      </select>
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Status</label>
                      <select name="" id="" className="w-full p-2" >
                        <option value="">Select Partner Type</option>
                      </select>
                    </div>

                    </div>


                  </div>
              </div>
            </div>

          </TabPanel>
          <TabPanel>
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Alternate Number</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Alternate Email</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Area/Pin Code</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">State</label>
                      <select className="w-full p-2 border-2" >
                        <option value="">Select State</option>
                      </select>
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">City/District</label>
                      <select className="w-full p-2 border-2" >
                        <option value="">Select City/District</option>
                      </select>
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Address Type</label>
                      <select className="w-full p-2 border-2" >
                        <option value="">Select Address Type</option>
                      </select>
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">PAN No</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Full Address</label>
                      <textarea name="" className="w-full p-2 border-2" id="" cols="30" rows="10"></textarea>
                    </div>

                  </div>


                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Account No</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Bank Name</label>
                      <select className="w-full p-2 border-2" >
                        <option value="">Select</option>
                      </select>
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Branch Name</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">IFSC Code</label>
                      <input className="w-full p-2 border-2" placeholder="" />
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form Element 1 */}

                    <div className="flex-1 mr-2">
                      {/*<label for="currentpolicy">Current Policy</label>*/}
                      <input type="file" id="currentpolicy" className="w-full p-2 custom-file-input" title="s e "/>
                    </div>


                    <div className="flex-1 mr-2">
                      <input type="file" id="inscopy" className="w-full p-2 custom-file-input" title="s e "/>
                    </div>

                    <div className="flex-1 mr-2">
                      <input type="file" id="rccopy" className="w-full p-2 custom-file-input" title="s e "/>
                    </div>

                    <div className="flex-1 mr-2">
                      <input type="file" id="vehiclephoto" className="w-full p-2 custom-file-input" title="s e "/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </TabPanel>
          <TabPanel>
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Any Comment or Remark ?</label>
                      <textarea className="w-full p-2 custom-file-input w-full" placeholder=""/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </TabPanel>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default PartnerDetails;
