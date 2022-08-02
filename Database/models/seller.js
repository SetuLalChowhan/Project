const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    BusinessName: {
        type: String,
        required: true,
        unique: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    NIDNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    BankAcc: {
        type: Number,
        required: true,
        unique: true,
    },
    TinNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    Address: {
        type: String,
        required: true,
        unique:false
        
    },
    PickUpAddress: {
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
    role: { type: String, default: 'seller' }
});

sellerSchema.statics.login = async function(email, password) {
    const seller = await this.findOne({ email });
    console.log(seller)
    if (seller) {
      const auth = await bcrypt.compare(password, seller.password);
      if (auth) {
        return seller;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
