const express = require("express");
const router = express.Router();
const {
  listLeads,
  getLead,
  changeStatus,
  getStats,
} = require("../services/leadsService");
const requireRole = require("../middleware/requireRole");

// GET /api/leads
router.get("/", async (req, res, next) => {
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

//Get/api/leads/stats/source
router.get("/stats/sources", async (req, res, next) => {
  try {
    const pool = require("../../db/pool");
    const { rows } = await pool.query(
      `SELECT source, COUNT(*)::int AS count FROM leads GROUP BY source`,
    );
    const result = { whatsapp: 0, ussd: 0, manual: 0 };
    rows.forEach((row) => {
      result[row.source] = row.count;
    });
    res.json(result);
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
