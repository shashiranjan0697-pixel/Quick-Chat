const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
require("dotenv").config();

const connectDB = require("./config/database");

const app = express();

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
}); 
 