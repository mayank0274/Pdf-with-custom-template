const mongoose = require("mongoose")

const connection = async ()=>{
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/admit_card",{});
    console.log("connect to db");
} catch (err) {
    console.log(err);
}

}

module.exports = connection