// src/repositories/leadsRepo.js
const pool = require("../../db/pool");

async function list({ limit, offset, q, status }) {
  const params = [];
  const conditions = [];

  if (q) {
    params.push(`%${q}%`);
    conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length})`);
  }
  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  params.push(limit, offset);

  const sql = `
    SELECT * FROM leads
    ${where}
    ORDER BY created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `;

  const { rows } = await pool.query(sql, params);
  return rows;
}

module.exports = { list };