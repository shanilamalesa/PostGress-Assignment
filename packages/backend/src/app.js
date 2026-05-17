require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const leadsRouter = require("./routes/leads");
app.use("/api/leads", leadsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;