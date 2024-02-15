
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
  

  