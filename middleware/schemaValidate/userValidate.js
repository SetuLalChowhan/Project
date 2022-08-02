const handleError = (err) => {
    let errors = {
        username: "",
        email: "",  
        PhoneNumber: "",
        BankAcc: "",
        Address: "",
        password: "",
    };
    if (err && err.path === "username") {
        errors.username = err.errors[0];
        return errors;
    } else if (err && err.path === "email") {
        errors.email = err.errors[0];
        return errors;
    } else if (err && err.path === "PhoneNumber") {
        errors.PhoneNumber = err.errors[0];
        return errors;
    } else if (err && err.path === "BankAcc") {
        errors.BankAcc = err.errors[0];
        return errors;
    } else if (err && err.path === "Address") {
        errors.Address = err.errors[0];
        return errors;
    } else if (err && err.path === "password") {
        errors.password = err.errors[0];
        return errors;
    }
};

function uservalidation(schema) {
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
module.exports = { uservalidation };
