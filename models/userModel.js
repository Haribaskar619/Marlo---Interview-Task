const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Creating the schema / Model of how the new users data to be stored in database

const userCreationSchema = mongoose.Schema(
  {
    firstname: { type: "String", required: true },
    lastname: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    phone: { type: "Number", unique: true, required: true },
    password: { type: "String", required: true },
  },
  { timestamps: true }
);

// MongoDB Middleware to hash the password before saving it to the database
userCreationSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userCreationSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//  Creating the collection in mongodb to store the datas by using the defined schema
const User = mongoose.model("User", userCreationSchema);

module.exports = User;
