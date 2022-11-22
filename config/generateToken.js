const jwt = require("jsonwebtoken");

// Function for generating the Json webtoken using the id of the user created in the database //
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
