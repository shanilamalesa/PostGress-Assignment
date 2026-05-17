const express = require("express");
const router = express.Router();
const { listLeads }= require("../services/leadsService");

router.get("/", async (req, res) => {
    const { q, status, limit, offset } = req.query;
    const leads = await listLeads({ q, status, limit, offset });
    res.json(leads);
})

module.exports = router;