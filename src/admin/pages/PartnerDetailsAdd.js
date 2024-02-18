import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { TabsIcon } from "../../shared/Assets";
import { validateAdhar, validateEmail, validateMobile, validateName, validatePan } from "../../utils/Validation";
import axios from "axios";
import Cookies from "js-cookie";

const PartnerDetailsAdd = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    branch_name: '',
    image: '',
    partner_status: '',
    pan_no: '',
    aadhaar_no: '',
    licence_no: '',
    license_expiry_date: '',
    address: '',
    country: '',
    state: '',
    district: '',
    city: '',
    postal_code: '',
    alt_mobile: '',
    alt_email: '',
    bank_account_no: '',
    bank_account_name: '',
    bank_name: '',
    bank_ifsc: '',
    pan_file: '',
    aadhaar_file: '',
    licence_file: '',
    bank_passbook_file: '',
    comments: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    branch_name: '',
    image: '',
    partner_status: '',
    pan_no: '',
    aadhaar_no: '',
    licence_no: '',
    license_expiry_date: '',
    address: '',
    country: '',
    state: '',
    district: '',
    city: '',
    postal_code: '',
    alt_mobile: '',
    alt_email: '',
    bank_account_no: '',
    bank_account_name: '',
    bank_name: '',
    bank_ifsc: '',
    pan_file: '',
    aadhaar_file: '',
    licence_file: '',
    bank_passbook_file: '',
    comments: ''
  })





  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);

  }


  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        errorMessage = validateName(value);
        break;
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'mobile':
        errorMessage = validateMobile(value);
        break;
      case 'aadhaar_no':
      errorMessage = validateAdhar(value);

      case 'pan_no':
        errorMessage = validatePan(value);

      case 'alt_email':
        errorMessage = validateEmail(value);

      case 'alt_mobile':
         errorMessage = validateMobile(value);
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };


  const validateForm = () => {
    let valid = true;
    for (const fields of requiredFieldsByTab) {
      for (const key of fields) {
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
            [key]: 'This field is required.',
          }));
        }
      }
    }
    return valid;
  };



  const requiredFieldsByTab = [
    ['name', 'email', 'mobile'],
    ['address'],
    ['bank_account_no', 'bank_account_name', 'branch_name', 'bank_ifsc']
  ];

  // const handleSaveAndNext = () => {
  //   console.log("Form Data", formData);
  //   const isFormValid = validateForm();
  //   const isLastTab = selectedTabIndex === 4;

  //   if (!isFormValid) {
  //     console.error("Form validation failed. Please fill in all required fields correctly.");
  //     return;
  //   }

  //   if (!isLastTab) {
  //     const requiredFields = requiredFieldsByTab[selectedTabIndex];
  //     const areRequiredFieldsFilled = requiredFields.every(
  //       (key) => !!formData[key]
  //     );

  //     if (!areRequiredFieldsFilled) {
  //       console.error("Please fill in all required fields in the current tab.");
  //       return;
  //     }

  //     setSelectedTabIndex((prev) => prev + 1);
  //   }
  // };


  const handleSaveAndNext = () => {
    setSelectedTabIndex((prev) => prev+1);
  }


  const submitFormData = (e) => {
    e.preventDefault();
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const apiUrl = 'https://premium.treatweb.com/public/api/admin/partner/add'
    console.log("FormData", formData);

    axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': csrfToken,
      },

    }).then((res) => {
      console.log(res);
      const{sucess, message} = res.data;
    }).catch((error) => {
      console.error("Error submitting form:", error);
      setErrors(error);
    })
  }

  function generateBreadcrumbData(selectedTabIndex, rightContent = null) {
    let middleContent;
    let isSaveDisabled = true;

    switch (selectedTabIndex) {
      case 0:
        middleContent = "Personal Details";
        break;
      case 1:
        middleContent = "Address";
        break;
      case 2:
        middleContent = "Bank Details";
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
      rightItems: ""
    };
  }

  return (
    <Layout title="Partner Details" breadcrumbData={generateBreadcrumbData(selectedTabIndex)}>
      <Card bgColor="gray-100">
        <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)}>
          <TabList style={{ display: "flex", margin: 0, padding: 0 }}>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner1} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner2} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner4} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner3} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner5} alt="" /></span></Tab>
          </TabList>

          <TabPanel>
            <div className="container my-4">
              <div className="flex justify-between">
                {/* DROPDOWN CONTAINER START HERE */}
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex-1 mr-2">
                      <label htmlFor="name">Partner Name*</label>
                      <input name="name" value={formData.name} onChange={handleInputChange} id="name" className="w-full p-2 border-2" placeholder="" required />
                      {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="email">Email*</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} id="email" className="w-full p-2" placeholder="Email*" required />
                      {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="mobile">Mobile*</label>
                      <input name="mobile" value={formData.mobile} onChange={handleInputChange} id="mobile" className="w-full p-2" placeholder="Mobile*" required />
                      {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="pan_no">PAN No</label>
                      <input name="pan_no" value={formData.pan_no} onChange={handleInputChange} id="pan_no" className="w-full p-2" placeholder="" />
                      {errors.pan_no && <span className="text-red-500">{errors.pan_no}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="aadhaar_no">Aadhaar No</label>
                      <input name="aadhaar_no" value={formData.aadhaar_no} onChange={handleInputChange} id="aadhaar_no" className="w-full p-2" placeholder="" />
                      {errors.aadhaar_no && <span className="text-red-500">{errors.aadhaar_no}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="licence_no">License No</label>
                      <input name="licence_no" value={formData.licence_no} onChange={handleInputChange} id="licence_no" className="w-full p-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Licence Expiry Date</label>
                      <input type="date" className="w-full p-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Status</label>
                      <select name="partner_status" value={formData.partner_status} onChange={handleInputChange} id="" className="w-full p-2" >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="in_active">In Active</option>
                      </select>
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Partner Type</label>
                      <select name="" id="" className="w-full p-2" >
                        <option value="">Select Partner Type</option>
                        <option value="sales_person">Sales Person</option>
                        <option value="self">Self Person</option>
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
                      <label htmlFor="alt_mobile">Alternate Number</label>
                      <input name="alt_mobile" value={formData.alt_mobile} onChange={handleInputChange} id="alt_mobile" className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="alt_email">Alternate Email</label>
                      <input name="alt_email" value={formData.alt_email} onChange={handleInputChange} id="alt_email" className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="postal_code">Area/Pin Code</label>
                      <input name="postal_code" value={formData.postal_code} onChange={handleInputChange} id="postal_code" className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="state">State</label>
                      <select name="state" value={formData.state} onChange={handleInputChange} id="state" className="w-full p-2 border-2" >
                        <option value="">Select State</option>
                      </select>
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">City/District</label>
                      <select name="city" value={formData.city} onChange={handleInputChange} id="city" className="w-full p-2 border-2" >
                        <option value="">Select City/District</option>
                      </select>
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Address Type</label>
                      <select name="address" value={formData.address} onChange={handleInputChange} id="address" className="w-full p-2 border-2" >
                        <option value="">Select Address Type</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
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
                      <label htmlFor="bank_account_no">Account No</label>
                      <input name="bank_account_no" value={formData.bank_account_no} onChange={handleInputChange} id="bank_account_no" className="w-full p-2 border-2" placeholder="" />
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Bank Name</label>
                      <select name="bank_account_name" value={formData.bank_account_name} onChange={handleInputChange} className="w-full p-2 border-2" >
                        <option value="">Select</option>
                      </select>
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Branch Name</label>
                      <input name="branch_name" value={formData.branch_name} onChange={handleInputChange} className="w-full p-2 border-2" placeholder="" />
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="bank_ifsc">IFSC Code</label>
                      <input name="bank_ifsc" value={formData.bank_ifsc} onChange={handleInputChange} className="w-full p-2 border-2" placeholder="" />
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
                      <input type="file" name="pan_file" value={formData.pan_file} onChange={handleInputChange} id="currentpolicy" className="w-full p-2 custom-file-input" title="s e " />
                    </div>


                    <div className="flex-1 mr-2">
                      <input type="file" name="aadhaar_file" value={formData.aadhaar_file} onChange={handleInputChange} id="inscopy" className="w-full p-2 custom-file-input" title="s e " />
                    </div>

                    <div className="flex-1 mr-2">
                      <input type="file" name="licence_file" value={formData.licence_file} onChange={handleInputChange} id="rccopy" className="w-full p-2 custom-file-input" title="s e " />
                    </div>

                    <div className="flex-1 mr-2">
                      <input type="file" name="bank_passbook_file" value={formData.bank_passbook_file} onChange={handleInputChange} id="vehiclephoto" className="w-full p-2 custom-file-input" title="s e " />
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
                      <textarea name="comments" value={formData.comments} onChange={handleInputChange} className="w-full p-2 custom-file-input w-full" placeholder="" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </TabPanel>
          {selectedTabIndex != 4 && (
            <div className="flex justify-center">
              <button onClick={handleSaveAndNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 save">
                Save & Next
              </button>
            </div>
          )}

          {selectedTabIndex == 4 && (
            <div className="flex justify-center">
              <button onClick={submitFormData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 save">
                Save
              </button>
            </div>
          )}
        </Tabs>
      </Card>
    </Layout>
  );
};

export default PartnerDetailsAdd;
