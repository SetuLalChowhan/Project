const mongoose = require("mongoose");
const userPostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        
    },
   
    image:{
        data:Buffer,
        contentType:String

    },
    imageName:{
        type:String,
        required:true,
    }
});

const UserPost = mongoose.model("UserPost", userPostSchema);

module.exports =UserPost;