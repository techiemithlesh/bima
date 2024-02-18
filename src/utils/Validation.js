
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



