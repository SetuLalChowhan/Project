const express = require("express");

const app = express();

const mongoose = require("mongoose");

const ejs = require("ejs");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const { Connection } = require("./Database/connection");
const sellerRouter = require("./routes/seller");
const userRoute = require("./routes/user");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(sellerRouter);
app.use(userRoute);

function errHandler(err, req, res, next) {
    if (err) {
        if (err) {
            res.redirect("/");
        } else {
            res.status(500).send(err.message);
        }
    }
    console.log(err);
}
app.use(errHandler);

app.listen(PORT, () => {
    console.log(`app lisening on PORT ${PORT}`);
});
