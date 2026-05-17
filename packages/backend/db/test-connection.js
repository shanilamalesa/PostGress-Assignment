require("dotenv").config()
const pool = require("./pool");

pool.query("SELECT 1")
    .then(() =>{
        console.log("Connected to postgress")
        pool.end();
    })
    .catch((err) =>{
        console.error("Connection failed:", err.message);
        pool.end();
    });