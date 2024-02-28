
export const validateName = (name) => {
  if (!name.trim()) {
    return 'Partner Name is required';
  }
  return '';
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return 'Email is required';
  } else if (!emailPattern.test(email)) {
    return 'Invalid email format';
  }

  return '';
};


export const validateMobile = (mobile) => {

  const mobilePattern = /^\d{10}$/;

  if (!mobile.trim()) {
    return 'Mobile is required';
  } else if (!mobilePattern.test(mobile)) {
    return 'Invalid mobile number';
  }

  return '';
};



export const validateBankNo = (bank_account_no) => {

  const digitsOnly = /^\d+$/;
  if (!digitsOnly.test(bank_account_no)) {
    return 'Bank account number should contain digits only';
  }

  if (bank_account_no.length !== 10) {
    return 'Bank account number should be 10 digits long';
  }

  return '';
};


export const validateAdhar = (aadhaar_no) => {

  const adharRegex = /^\d{12}$/;

  if (adharRegex.test(aadhaar_no)) {

    return '';
  } else {

    return 'Please enter a valid Aadhaar number.';
  }
};

export const validatePan = (pan_no) => {

  const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (panRegex.test(pan_no)) {

    return '';
  } else {

    return 'Please enter a valid PAN number.';
  }
};

export const validatePartnerStatus = (partner_status) => {
  if(!partner_status.trim()){
    return "Partner Status is Required"
  }
  return '';
}

export const validateDocument = (fileName) => {
  if (!fileName || typeof fileName !== 'string') {
      return "Please select a file.";
  }

  const fileExtension = fileName.split('.').pop().toLowerCase();

  const allowedExtensions = ['pdf', 'jpg', 'png', 'jpeg'];

  if (allowedExtensions.includes(fileExtension)) {
      return true;
  } else {
      return "Invalid file format. Allowed formats are: pdf, jpg, png, jpeg";
  }
};



export const validateInsurer = (insurer) => {
  if (!insurer.trim()) {
    return 'Insurer is required';
  }
  return '';
};


export const validateCommission = (commission_type)=>{
  if(!commission_type.trim()){
    return 'Business Type is Required';
  }
  return '';
}

export const validateVehicleType = (vehicle_type) => {
  if(!vehicle_type.trim()){
    return 'Vehicle Type is Required';
  }
  return '';
}

export const validateVehicleSubType = (vehicle_subtype) => {
  if(!vehicle_subtype.trim()){
    return 'Vehicle Sub Type Is Required';
  }
  return '';
}

export const validateFuelType = (fuel_type) => {
  if(!fuel_type){
    return 'Fuel Type is Required';
  }
  return '';
}

export const validateAgeCapacity = (ageCapacity) => {
 
  const ageCapacityNumber = parseFloat(ageCapacity);

  if (isNaN(ageCapacityNumber) || ageCapacityNumber <= 0) {
    return 'Age capacity should be a positive number';
  }

  return '';
};


export const validateTpPrecent = (tp_percent) => {
  if (isNaN(tp_percent) || tp_percent <= 0) {
    return 'TP Precent should be a positive number';
  }
}

export const validateVehicleManufacture = (vehicle_manufacture) => {
  if (!vehicle_manufacture.trim()) {
    return 'Vehicle Make is required';
  }
  return '';
}

export const validateVehicleModel = (vehicle_model) =>{
  if(!vehicle_model.trim()){
    return 'Vehicle Model is required';
  }
  return '';
}


export const validateRegistrationNo = (registration_number) => {
  if (!registration_number.trim()) {
    return 'Vehicle Registration No. is required.';
  }

  const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
  if (!regex.test(registration_number)) {
    return 'Please enter a valid vehicle registration number.';
  }

  return '';
};


export const validateVehicleRegistrationDate = (vehicle_registration_date) => {
  if (!vehicle_registration_date.trim()) {
    return 'Vehicle Registration Date is required.';
  }

  // Check if the date is in the past 
  const currentDate = new Date();
  const registrationDate = new Date(vehicle_registration_date);
  if (registrationDate > currentDate) {
    return 'Vehicle Registration Date cannot be in the future.';
  }


  // vehicles cannot be registered more than 20 years ago:
  const maxRegistrationDate = new Date();
  maxRegistrationDate.setFullYear(currentDate.getFullYear() - 20);
  if (registrationDate < maxRegistrationDate) {
    return 'Vehicle Registration Date is too old.';
  }

  // If the date is valid and within the specified range, return an empty string
  return '';
};




