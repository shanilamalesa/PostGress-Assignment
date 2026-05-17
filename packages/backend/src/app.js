require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const leadsRouter = require("./routes/leads");
app.use("/api/leads", leadsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;