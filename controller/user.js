const User = require("../Database/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { duplicateError } = require("../Error/user/duplicateError");

const UserPost =require('../Database/models/userPost')
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

function userGet(req, res) {
    res.render("userSignUp");
}

async function userPost(req, res) {
    try {
        const {
            username,
            email,
            PhoneNumber,
            BankAcc,   
            Address,
            password,
            confirmPassword,
        } = req.body;
        
        
        if (password === confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                PhoneNumber,
                BankAcc,
                Address,
                image: {
                    // data: req.file.filename,

                    contentType: "image/jpg",
                },
                password: hashedPassword,
            });

            await newUser.save();
            res.json({ user: newUser._id });
        } else {
            throw Error("Please check your password and confirm password");
        }
    } catch (err) {
        const errors = duplicateError(err);
        res.status(400).json({ errors });
        console.log(err);
    }
}

function userLoginGet(req, res) {
    res.render("userLogin");
}
async function userLoginPost(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = loginAuth(err);
        res.status(400).json({ errors });
        console.log(err);
    }
}

function userDashboard(req, res) {
    res.render("userDashboard");
}

function logOut(req, res) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
}


async function userPosttwo(req,res){
try{
    const {
        username,
        categories,
        description,
        address,
        imageName,
    }=req.body;
        const newUserPost = new UserPost({
            username,
            categories,
            description,
            address,
            image: {
                data: req.file.filename,
                contentType: "image/jpg",
            },
            imageName,
        });
        await newUserPost.save();
        res.json({ userPost: newUserPost });
    
} catch (err) {
    console.log(err);
}


}

async function newsFeed(req,res){

    const userPost = await UserPost.find()
    res.render('feed',{userPost:userPost});
   
}

module.exports = {home,userGet, userPost, userLoginGet, userLoginPost, userDashboard, logOut,userPosttwo ,newsFeed};
