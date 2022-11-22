const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");

// Create new user functionality //
const userCreation = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;

  // Checking all the input fields filled , else will throw error to a user mentioned fill all the fields. //
  if (!firstname || !lastname || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const userExists = await User.findOne({ email });

  // Checking for user already registered or not //
  if (userExists) {
    res.status(400);
    throw new Error(
      "User already exists , Enter different mail id to register"
    );
  }

  // if user mail id not exsisted , proceed to create a new user with the following details //
  const userDatas = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
  });

  if (userDatas) {
    res.status(201).json("User created Successfully");
  } else {
    res.status(400);
    throw new Error("Unable to create user, Please enter a valid credentials");
  }
});


// Login Functionality //
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Searching the entered email id //
    const user = await User.findOne({ email });
    // If the email exixts , executes password comparison and generate the jwt token and return the response //
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.send(error); // error catching if any //
  }
});

// Get user Functionality //
const getUserData = asyncHandler(async (req, res) => {
  try {
    // Searching for the id entered using findbyid query //
    const userData = await User.findById(req.params.id);
    //   if the id exists then it will sendn the particular id as a response //
    if (userData) {
      res.json(userData);
    }
  } catch (error) {
    res.json("Something went wrong"); // error catching if any //
  }
});


// deleting user Functionality //
const deleteUser = asyncHandler(async (req, res) => {
  try {
    // Searching for the id entered using findbyidand delete query , it delets the particular id's user details //
    await User.findByIdAndDelete(req.params.id);
    res.json("Successfully deleted from Database");
  } catch (error) {
    res.json("Something went wrong"); // error catching if any //
  }
});


// Edit user details Functionality //
const updateUser = asyncHandler(async (req, res) => {
  try {
    // Searching for the id entered using findbyidandupdate query , it fetch the particular id's user details  and update the changes//
    const updateDetail = await User.findByIdAndUpdate(req.params.id, req.body);
    if (updateDetail) {
      res.json("Updated Successfully");
    }
  } catch (error) {
    console.log(error);
    res.json("Something went wrong"); // error catching if any //
  }
});

module.exports = {
  userCreation,
  getUserData,
  loginUser,
  deleteUser,
  updateUser,
};
