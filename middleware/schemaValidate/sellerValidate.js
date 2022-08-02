const handleError = (err) => {
    let errors = {
        email: "",
        BusinessName: "",
        PhoneNumber: "",
        NIDNumber: "",
        BankAcc: "",
        TinNumber: "",
        Address:"",
        PickUpAddress:"",
        password: "",
    };

    if (err && err.path === "email") {
        errors.email = err.errors[0];
        return errors;
    } else if (err && err.path === "BusinessName") {
        errors.BusinessName = err.errors[0];
        return errors;
    } else if (err && err.path === "PhoneNumber") {
        errors.PhoneNumber = err.errors[0];
        return errors;
    } else if (err && err.path === "NIDNumber") {
        errors.NIDNumber = err.errors[0];
        return errors;
    } else if (err && err.path === "BankAcc") {
        errors.BankAcc = err.errors[0];
        return errors;
    } else if (err && err.path === "TinNumber") {
        errors.TinNumber = err.errors[0];
        return errors;
    } else if (err && err.path === "Address") {
        errors.Address = err.errors[0];
        return errors;
    } else if (err && err.path === "PickUpAddress") {
        errors.PickUpAddress = err.errors[0];
        return errors;
    } else if (err && err.path === "password") {
        errors.password = err.errors[0];
        return errors;
    }
};

function sellervalidation(schema) {
    return async function (req, res, next) {
        try {
            await schema.validate(req.body);
            next();
        } catch (err) {
            const errors = handleError(err);
            res.status(400).json({ errors });
            console.log(err);
            
        }
    };
}
module.exports = { sellervalidation };
