const {string, number, array, object} = require("yup");

function EmailLengthValid(email) {
    if (!email) return false;

    const parts = email.split("@");
    const local = parts[0];
    return local.length <= 64;
}

const sellerDetails={
 email: string()
.email(" should be a valid email address")
.max(100, "Email must be at most 100 characters")
.required("Email must be required")
.test("is valid email length", "The part before @ of the email can be maximum 64 characters", (email) =>
    EmailLengthValid(email)
),
 BusinessName: string()
 .max(20,"Business Name must be at most 20 characters")
 .min(6,"Business Name must be at least 6 characters")
 .required("Business Name must be required")
,
 PhoneNumber: string()
 .min(11,"Phone number must have 11 characters")
 .max(11,"Phone number must have 11 characters")
 .required("Phone Number must be required")
,
 NIDNumber: string()
 .min(10,"Nid Number must have 10 characters")
 .max(10,"Phone number must have 10 characters")
 .required("NID Number must be required")
,
 BankAcc: string()
 .min(9,"Account Number  must be at least 9 characters")
 .max(18,"Phone number must be at most 18 characters")
 .required("Bank Account Number must be required")
,
 TinNumber: string()
 .min(9,"Tin Number must have 9 characters")
 .max(9,"Tin number must have 9 characters")
 .required("Tin Number must be required")
,
 Address: string()
 .min(6,"Address must be at least 6 characters")
 .max(60,"Address must be at most 60 characters")
 .required("Address must be required")
,
 PickUpAddress: string()
 .min(6,"PickUpAddress must be at least 6 characters")
 .max(60,"PickUpAddress must be at most 60 characters")
 .required("PickUpAddress must be required")
,
password: string()
.min(8, "Password must be at least 8 characters")
.max(50, "Password must be at most 60 characters")
.required("Password must not be empty"),
}



const sellerSchema = object().shape({
    
    email: sellerDetails.email,
    BusinessName:sellerDetails.BusinessName,
    PhoneNumber:sellerDetails.PhoneNumber,
    NIDNumber : sellerDetails.NIDNumber,
    BankAcc :sellerDetails.BankAcc,
    TinNumber : sellerDetails.TinNumber,
    Address:sellerDetails.Address,
    PickUpAddress:sellerDetails.PickUpAddress,
    password:sellerDetails.password

});



module.exports = {sellerSchema};