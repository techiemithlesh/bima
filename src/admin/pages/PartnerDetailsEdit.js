import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Icons, TabsIcon } from "../../shared/Assets";
import { validateAdhar, validateDocument, validateEmail, validateMobile, validateName, validatePan, validatePartnerStatus } from "../../utils/Validation";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const PartnerDetailsEdit = () => {
  const { id } = useParams();
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
    imagePreviewUrl: '',
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
    partner_type: '',
    pan_no: '',
    aadhaar_no: '',
    licence_no: '',
    license_expiry_date: '',
    address_type: '',
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


  const validateField = (name, value) => {
    let errorMessage = '';

    if (!value) {
      return null;
    }

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
        break;
      case 'pan_no':
        errorMessage = validatePan(value);
        break;
      case 'partner_status':
        errorMessage = validatePartnerStatus(value);
        break;
      case 'alt_email':
        errorMessage = validateEmail(value);
        break;
      case 'alt_mobile':
        errorMessage = validateMobile(value);
        break;
      case 'pan_file':
      case 'aadhaar_file':
      case 'licence_file':
      case 'bank_passbook_file':
        errorMessage = validateDocument(value.name);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
      const file = files[0];

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));


      const reader = new FileReader();
      reader.onload = (e) => {

        setFormData((prevData) => ({
          ...prevData,
          imagePreviewUrl: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    validateField(name, files && files.length > 0 ? files[0] : value);

    const errorMessage = validateField(name, files && files.length > 0 ? files[0] : value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

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
          [key]: 'This field is required.',
        }));
      }
    }
    return valid;
  };


  const requiredFieldsByTab = [
    ['name', 'email', 'mobile', 'partner_status'],
    ['address'],
    [],
    []
  ];

  const handleSaveAndNext = () => {
    console.log("Validate Form", validateForm());
    if (validateForm()) {
      setSelectedTabIndex((prev) => prev + 1);
    } else {
     
    }
  };

  useEffect(() => {
    const apiUrl = `https://premium.treatweb.com/public/api/admin/partner/view/${id}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Edit Data", data);

        const partnerData = data.partner || {};

        const mappedData = {
          name: partnerData.name || '',
          email: partnerData.email || '',
          mobile: partnerData.mobile || '',
          partner_branch: partnerData.partner_branch || '',
          partner_status: partnerData.partner_status || '',
          partner_type: partnerData.partner_type || '',
          pan_no: partnerData.pan_no || '',
          aadhaar_no: partnerData.aadhaar_no || '',
          licence_no: partnerData.licence_no || '',
          license_expiry_date: partnerData.license_expiry_date || '',
          imagePreviewUrl: partnerData.partner_info.profile_image || '',
          address_type: partnerData.partner_info.address_type || '',
          address: partnerData.partner_info.address || '',
          country: partnerData.partner_info.country || '',
          state: partnerData.partner_info.state || '',
          district: partnerData.partner_info.district || '',
          city: partnerData.partner_info.city || '',
          postal_code: partnerData.partner_info.pin_code || '',
          alt_mobile: partnerData.partner_info.alt_mobile || '',
          alt_email: partnerData.partner_info.alt_email || '',
          bank_account_no: partnerData.bank_account_no || '',
          bank_account_name: partnerData.bank_account_name || '',
          bank_name: partnerData.bank_name || '',
          bank_ifsc: partnerData.bank_ifsc || '',

        };
        setFormData(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching partner data:", error);
      });
  }, [id]);


  const submitFormData = async () => {
    console.log("FormData", formData);

    try {
      const apiUrl = `https://premium.treatweb.com/public/api/admin/partner/update/${id}`;
      const response = await axios.post(apiUrl, formData);
      console.log("Form submitted successfully", response.data);
      toast.success(response.data.messages, {
        position: 'top-right',
      });
      setErrors({});

    } catch (error) {
      if (error.response && error.response.data && error.response.data.messages) {
        toast.error(error.response.data.messages, {
          position: 'top-right',
        });
        setErrors({});
      } else {
        toast.error("Failed to submit form. Please try again later.", {
          position: 'top-right',
        });
        setErrors({});
      }
    }

  }


  return (
    <Layout title="Partner Details" breadcrumbData={generateBreadcrumbData(selectedTabIndex)}>
      <Card bgColor="gray-100">
        <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)} className="partnertab">
          <TabList style={{ display: "flex", margin: 0, padding: 0 }} className="policytab" >
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner1} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner2} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner4} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner3} alt="" /></span></Tab>
            <Tab style={{ flex: 1, textAlign: "center", padding: "10px" }}><span className="tabicon"><img src={TabsIcon.Partner5} alt="" /></span></Tab>
          </TabList>

          <TabPanel className="policytabone">
            <div className="container my-4">
              <div className="flex justify-between partner">
                {/* DROPDOWN CONTAINER START HERE */}
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-8 pb-1">
                    <div className="flex-1 mr-2">
                      <label htmlFor="name">Partner Name*</label>
                      <input name="name" value={formData.name} onChange={handleInputChange} id="name" className="w-full p-2 border-2" placeholder="" required />
                      {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="email">Email*</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} id="email" className="w-full p-2" required placeholder="" />
                      {(errors.email !== "undefined") ?
                        <span className="error text-red-400">{errors.email}</span>
                        : ""}
                    </div>


                    <div className="flex-1 mr-2">
                      <label htmlFor="image" className="file-input-container absolute" style={{ padding: "1px 40px" }}>
                        {formData.imagePreviewUrl ? (
                          <img src={formData.imagePreviewUrl} width={250} alt="Uploaded" className="file-input-icon hover:cursor-pointer profile" />
                        ) : (
                          <img src={Icons.UserAdd} alt="Profile Icon" className="file-input-icon hover:cursor-pointer" />
                        )}
                        <input name="image" type="file" onChange={handleInputChange} id="image" className="hidden" accept=".jpg, .png, .jpeg" />
                      </label>
                      {errors.image && <span className="text-red-500">{errors.image}</span>}
                    </div>


                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pb-2">

                    <div className="flex-1 mr-2">
                      <label htmlFor="mobile">Mobile*</label>
                      <input name="mobile" value={formData.mobile} onChange={handleInputChange} id="mobile" className="w-full p-2" required placeholder="" />
                      {(errors.mobile !== "undefined") ?
                        <span className="error text-red-400">{errors.mobile}</span>
                        : ""}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="mobile">Branch Name</label>
                      <input name="partner_branch" value={formData.partner_branch} onChange={handleInputChange} id="partner_branch" className="w-full p-2" required placeholder="" />
                      {errors.partner_branch && <span className="text-red-500">{errors.partner_branch}</span>}
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-9 gap-y-1  pb-2">
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
                      {errors.licence_no && <span className="text-red-500">{errors.licence_no}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Licence Expiry Date</label>
                      <input type="date" name="license_expiry_date" onChange={handleInputChange} className="w-full p-2" placeholder="" />
                      {errors.license_expiry_date && <span className="text-red-500">{errors.license_expiry_date}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Status</label>
                      <select name="partner_status" value={formData.partner_status} onChange={handleInputChange} id="" required className="w-full p-2" >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="in_active">In Active</option>
                      </select>
                      {(errors.partner_status !== "undefined") ?
                        <span className="error text-red-400">{errors.partner_status}</span>
                        : ""}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Partner Type</label>
                      <select name="partner_type" value={formData.partner_type} onChange={handleInputChange} className="w-full p-2" >
                        <option value="">Select Partner Type</option>
                        <option value="Sales Person">Sales Person</option>
                        <option value="partner">Partner</option>
                      </select>
                      {(errors.partner_type !== "undefined") ?
                        <span className="error text-red-400">{errors.partner_type}</span>
                        : ""}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </TabPanel>
          <TabPanel className="policytabtwo">
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-1 gap-x-5">
                    <div className="flex-1 mr-2">
                      <label htmlFor="alt_mobile">Alternate Number</label>
                      <input name="alt_mobile" value={formData.alt_mobile} onChange={handleInputChange} id="alt_mobile" className="w-full p-2 border-2" placeholder="" />
                      {errors.alt_mobile && <span className="error text-red-400">{errors.alt_mobile}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="alt_email">Alternate Email</label>
                      <input name="alt_email" value={formData.alt_email} onChange={handleInputChange} id="alt_email" className="w-full p-2 border-2" placeholder="" />
                      {errors.alt_email && <span className="error text-red-400">{errors.alt_email}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="postal_code">Area/Pin Code</label>
                      <input name="postal_code" value={formData.postal_code} onChange={handleInputChange} id="postal_code" className="w-full p-2 border-2" placeholder="" />
                      {errors.postal_code && <span className="error text-red-400">{errors.postal_code}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="state">State</label>
                      <input name="state" value={formData.state} onChange={handleInputChange} id="state" className="w-full p-2 border-2" placeholder="" />
                      {errors.state && <span className="text-red-400">{errors.state}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">City/District</label>
                      <input name="city" value={formData.city} onChange={handleInputChange} id="city" className="w-full p-2 border-2" placeholder="" />
                      {errors.city && <span className="text-red-400">{errors.city}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Address Type</label>
                      <select name="address_type" value={formData.address_type} onChange={handleInputChange} id="address_type" className="w-full p-2 border-2" >
                        <option value="">Select Address Type</option>
                        <option value="Residential">Residential</option>
                        <option value="Correspondence">Permanent</option>
                      </select>
                      {errors.address_type && <span className="full text-red-400">{errors.address_type}</span>}
                    </div>

                    <div className="flex-1">
                      <label htmlFor="">Full Address</label>
                      <textarea name="address" value={formData.address} onChange={handleInputChange} className="w-full p-2 border-2"></textarea>
                      {errors.address && <span className="error text-red-400">{errors.address}</span>}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="policytabtwo">
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-2">
                    <div className="flex-1 mr-2">
                      <label htmlFor="bank_account_no">Account No</label>
                      <input name="bank_account_no" value={formData.bank_account_no} onChange={handleInputChange} id="bank_account_no" className="w-full p-2 border-2" placeholder="" />
                      {errors.bank_account_no && <span className="text-red-500">{errors.bank_account_no}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <label htmlFor="">Bank Name</label>
                      <input name="bank_account_name" value={formData.bank_account_name} onChange={handleInputChange} id="bank_account_name" className="w-full p-2 border-2" placeholder="" />
                      {errors.bank_account_name && <span className="text-red-500">{errors.bank_account_name}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="">Branch Name</label>
                      <input name="branch_name" value={formData.branch_name} onChange={handleInputChange} className="w-full p-2 border-2" placeholder="" />
                      {errors.branch_name && <span className="text-red-500">{errors.branch_name}</span>}
                    </div>
                    <div className="flex-1 mr-2">
                      <label htmlFor="bank_ifsc">IFSC Code</label>
                      <input name="bank_ifsc" value={formData.bank_ifsc} onChange={handleInputChange} className="w-full p-2 border-2" placeholder="" />
                      {errors.bank_ifsc && <span className="text-red-500">{errors.bank_ifsc}</span>}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel className="policytabtwo">
            <div className="container my-4">
              <div className="flex justify-between">
                <div className="input_container w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form Element 1 */}

                    <div className="flex-1 mr-2">
                      {/*<label for="currentpolicy">Current Policy</label>*/}
                      <input type="file" name="aadhaar_file" onChange={handleInputChange} id="adharcard" className="w-full p-2 custom-file-input" title="s e "
                        accept=".pdf, .jpg, .png, .jpeg" />
                      {errors.pan_file && <span className="text-red-500">{errors.pan_file}</span>}
                    </div>


                    <div className="flex-1 mr-2">
                      <input type="file" name="pan_file" onChange={handleInputChange} id="pan_file" className="w-full p-2 custom-file-input" title="s e "
                        accept=".pdf, .jpg, .png, .jpeg" />
                      {errors.aadhaar_file && <span className="text-red-500">{errors.aadhaar_file}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <input type="file" name="licence_file" onChange={handleInputChange} id="licence_file" className="w-full p-2 custom-file-input" title="licence file"
                        accept=".pdf, .jpg, .png, .jpeg" />
                      {errors.licence_file && <span className="text-red-500">{errors.licence_file}</span>}
                    </div>

                    <div className="flex-1 mr-2">
                      <input type="file" name="bank_passbook_file" onChange={handleInputChange} id="bank_passbook_file" className="w-full p-2 custom-file-input"
                        title="s e " accept=".pdf, .jpg, .png, .jpeg" />
                      {errors.bank_passbook_file && <span className="text-red-500">{errors.bank_passbook_file}</span>}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </TabPanel>
          <TabPanel className="policytabtwo">
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
                Update & Next
              </button>
            </div>
          )}

          {selectedTabIndex === 4 && (
            <div className="flex justify-center">
              <button onClick={submitFormData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 save">
                Save
              </button>
            </div>
          )}
        </Tabs>


      </Card>
    </Layout>
  )
}


function generateBreadcrumbData(selectedTabIndex, rightContent = null) {
  let middleContent;
  let isSaveDisabled = true;

  switch (selectedTabIndex) {
    case 0:
      middleContent = "Update Personal Details";
      break;
    case 1:
      middleContent = "Update Communication Details";
      break;
    case 2:
      middleContent = "Update Bank Details";
      isSaveDisabled = false;
      break;
    case 3:
      middleContent = "Update Documents";
      isSaveDisabled = false;
      break;
    case 4:
      middleContent = "Update Comment or Remark";
      isSaveDisabled = false;
      break;
    default:
      middleContent = "";
      break;
  }

  return {
    leftItems: [
      { label: "", link: "/" },
      { label: "Partners", link: "/admin/partners" },
    ],
    middleContent: middleContent,
    rightItems: ""
  };
}


export default PartnerDetailsEdit;