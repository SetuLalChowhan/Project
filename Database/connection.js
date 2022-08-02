const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017/Project";
const Connection = mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => console.log("Database Connected"))
    .catch((err) => console.log(err));

module.exports = { Connection };
