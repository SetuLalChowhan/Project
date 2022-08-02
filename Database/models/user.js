const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    BankAcc: {
        type: Number,
        required: true,
        unique: true,
    },
    Address: {
        type: String,
        required: true,
        unique:false
        
    },
    image:{
        data:Buffer,
        contentType:String

    },
    password: {
        type: String,
        required: true,
    },
    role: { type: String, default: 'buyer' }
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    console.log(user)
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

const User = mongoose.model("User", userSchema);

module.exports = User;