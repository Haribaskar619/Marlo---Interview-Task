const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const dotenv = require("dotenv").config();
const router = require("./routes/routes");




// Database Connection establishment //
connectDB();

// Body Parser //
app.use(express.json());

// Cors //
app.use(cors());

// Defining the Port //
const PORT = process.env.PORT || 5000;

// Router in which the api end points created //
app.use('/',router);


// listening to the mentioned port //
app.listen(
    PORT , 
    console.log(`server is running on PORT ${PORT}`)
);
