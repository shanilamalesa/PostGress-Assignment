const express = require("express");
const router = express.Router();
const { listLeads, getLead, changeStatus, getStats } = require("../services/leadsService");
const requireRole = require('../middleware/requireRole');

// GET /api/leads
router.get("/",  async (req, res, next) => {
  
  try {
    const { q, status, limit, offset } = req.query;
    const leads = await listLeads({ q, status, limit, offset }, req.user);
    res.json({ leads });
  } catch (err) {
    next(err);
  }
});

// GET /api/leads/stats
router.get("/stats", async (req, res, next) => {
  try {
    const data = await getStats();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/leads/:id
router.get("/:id", async (req, res, next) => {
  try {
    const lead = await getLead(req.params.id);
    res.json({ lead });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/leads/:id
router.patch("/:id", async (req, res, next) => {
  try {
    const lead = await changeStatus(req.params.id, req.body.status);
    res.json({ lead });
  } catch (err) {
    next(err);
  }
});



module.exports = router;