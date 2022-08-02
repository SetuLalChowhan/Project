const duplicateError= (err,email) => {
    let errors = { email: '', BusinessName:'',PhoneNumber:'',NIDNumber:'',BankAcc:'',TinNumber:'', password: '',confirmPassword:'' };
  
    if (err.code === 11000 && err.keyPattern.email === 1) {
      errors.email = 'that email is already registered';
      return errors;
    }
    else if(err.code === 11000 && err.keyPattern.BusinessName === 1)
    {
        errors.BusinessName = 'that Business Name is already registered';
      return errors;
    }
    else if(err.code === 11000 && err.keyPattern.PhoneNumber === 1)
    {
        errors.PhoneNumber = 'that Phone Number is already registered';
      return errors;
    }
    else if(err.code === 11000 && err.keyPattern.NIDNumber=== 1)
    {
        errors.NIDNumber = 'that NIDNumber is already registered';
      return errors;
    }
    else if(err.code === 11000 && err.keyPattern.BankAcc=== 1)
    {
        errors.BankAcc = 'that Bank Account Number  is already registered';
      return errors;
    }
    else if(err.code === 11000 && err.keyPattern.TinNumber=== 1)
    {
        errors.TinNumber = 'that Tin Number  is already registered';
      return errors;
    }
    else if(err.message==='Please check your password and confirm password')
    {
        errors.confirmPassword = 'Please check your password and Confirm Password';
      return errors;
    }
  }


  module.exports = {duplicateError}