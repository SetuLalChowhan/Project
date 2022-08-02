const Seller = require("../Database/models/seller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { duplicateError } = require("../Error/seller/duplicateError");
const maxAge = 3 * 24 * 60 * 60;
function home(req, res) {
    res.render("home");
}

const createToken = (id) => {
    return jwt.sign({ id }, "setu", {
        expiresIn: maxAge,
    });
};

const loginAuth = (err) => {
    let errors = { email: "", password: "" };
    if (err.message === "incorrect email") {
        errors.email = "Login failed";
    } else if (err.message === "incorrect password") {
        errors.password = "login failed";
    }
    return errors;
};

function sellerGet(req, res) {
    res.render("sellerSignUp");
}

async function sellerPost(req, res) {
    
    try {
        const {
            email,
            BusinessName,
            PhoneNumber,
            NIDNumber,
            BankAcc,
            TinNumber,
            Address,
            PickUpAddress,
            password,
            confirmPassword,
        } = req.body;
        
        const image =req.file
        if (password === confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newSeller = new Seller({
                email,
                BusinessName,
                PhoneNumber,
                NIDNumber,
                BankAcc,
                TinNumber,
                Address,
                PickUpAddress,
                image: {
                    data: image.filename,

                    contentType: "image/jpg",
                },
                password: hashedPassword,
            });

            await newSeller.save();
            res.json({ seller: newSeller._id });
        } else {
            throw Error("Please check your password and confirm password");
        }
    } catch (err) {
        const errors = duplicateError(err);
        res.status(400).json({ errors });
        console.log(err);
    }
}

function sellerLoginGet(req, res) {
    res.render("sellerLogin");
}
async function sellerLoginPost(req, res) {
    const { email, password } = req.body;
    try {
        const seller = await Seller.login(email, password);
        const token = createToken(seller._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ seller: seller._id });
    } catch (err) {
        const errors = loginAuth(err);
        res.status(400).json({ errors });
        console.log(err);
    }
}

function sellerDashboard(req, res) {
    res.render("sellerDashboard");
}

function logOut(req, res) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
}

module.exports = { home, sellerGet, sellerPost, sellerLoginGet, sellerLoginPost, sellerDashboard, logOut };
