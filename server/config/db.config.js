//const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/company-system")

// const mongoose = require("mongoose");

// const connectDb = async () => {
//   await mongoose.connect("mongodb://localhost:27017/company-system");
// };

// connectDb();