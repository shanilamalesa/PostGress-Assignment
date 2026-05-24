const leadsRepo = require("../repositories/leadsRepo");

const VALID_STATUSES = ["new", "contacted", "qualified", "converted", "lost"];
const VALID_TRANSITIONS = {
  new: ["contacted", "lost"],
  contacted: ["qualified", "lost"],
  qualified: ["converted", "lost"],
  converted: [],
  lost: [],
};

async function listLeads({ q, status, limit = 20, offset = 0 }, user) {
  return leadsRepo.list({ q, status, limit, offset }, user);
}

async function getLead(id) {
  const lead = await leadsRepo.findById(id);
  if (!lead) {
    const err = new Error("Lead not found");
    err.statusCode = 404;
    throw err;
  }
  return lead;
}

async function changeStatus(id, nextStatus) {
  if (!VALID_STATUSES.includes(nextStatus)) {
    const err = new Error(`Invalid status: ${nextStatus}`);
    err.statusCode = 400;
    throw err;
  }
  const lead = await getLead(id);
  const allowed = VALID_TRANSITIONS[lead.status];
  if (!allowed.includes(nextStatus)) {
    const err = new Error(`Cannot move from ${lead.status} to ${nextStatus}`);
    err.statusCode = 409;
    throw err;
  }
  return leadsRepo.updateStatus(id, nextStatus);
}

async function getStats() {
  const rows = await leadsRepo.statsByStatus();
  const total = rows.reduce((sum, r) => sum + r.total, 0);
  return { total, byStatus: rows };
}

module.exports = { listLeads, getLead, changeStatus, getStats };