const {string, number, array, object} = require("yup");

function EmailLengthValid(email) {
    if (!email) return false;

    const parts = email.split("@");
    const local = parts[0];
    return local.length <= 64;
}

const userDetails={
username: string()
.max(20,"Business Name must be at most 20 characters")
.min(6,"Business Name must be at least 6 characters")
.required("Business Name must be required"),

 email: string()
.email(" should be a valid email address")
.max(100, "Email must be at most 100 characters")
.required("Email must be required")
.test("is valid email length", "The part before @ of the email can be maximum 64 characters", (email) =>
    EmailLengthValid(email)
)
,
 PhoneNumber: string()
 .min(11,"Phone number must have 11 characters")
 .max(11,"Phone number must have 11 characters")
 .required("Phone Number must be required")
,
 BankAcc: string()
 .min(9,"Account Number  must be at least 9 characters")
 .max(18,"Phone number must be at most 18 characters")
 .required("Bank Account Number must be required")
,
 Address: string()
 .min(6,"Address must be at least 6 characters")
 .max(60,"Address must be at most 60 characters")
 .required("Address must be required")
,
password: string()
.min(8, "Password must be at least 8 characters")
.max(50, "Password must be at most 60 characters")
.required("Password must not be empty"),
}



const userSchema = object().shape({
    
    email: userDetails.email,
    username:userDetails.username,
    PhoneNumber:userDetails.PhoneNumber,
    BankAcc :userDetails.BankAcc,
    Address:userDetails.Address,
    password:userDetails.password

});



module.exports = {userSchema};