const Database = require("better-sqlite3");
const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const SQLITE_PATH = "C:/Users/shani/OneDrive/Desktop/full-stack marathon/WhatsAPP Cloud API/server/leads.db";

const pg = new Client({
  host: "localhost",
  port: 5432,
  database: "crm_dev",
  user: "crm_app",
  password: "crm_dev_password",
});

function isUUID(str) {
  return /^[0-9a-f-]{36}$/.test(str);
}

async function migrate() {
  await pg.connect();
  console.log("Connected to Postgres");

  const sqlite = new Database(SQLITE_PATH);
  const leadIdMap = {};

  const leads = sqlite.prepare("SELECT * FROM leads").all();
  console.log(`Migrating ${leads.length} leads...`);

  for (const lead of leads) {
    const newId = isUUID(lead.id) ? lead.id : uuidv4();
    leadIdMap[lead.id] = newId;
    await pg.query(
      `INSERT INTO leads (id, wa_phone, name, email, inquiry_type, status, notes, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING`,
      [newId, lead.wa_phone, lead.name, lead.email, lead.inquiry_type, ['new','contacted','qualified','closed'].includes(lead.status) ? lead.status : 'new',, lead.notes,
       lead.created_at || new Date().toISOString(), lead.updated_at || new Date().toISOString()]
    );
  }
  console.log(" Leads done");

  const convos = sqlite.prepare("SELECT * FROM conversations").all();
  console.log(`Migrating ${convos.length} conversations...`);

  for (const convo of convos) {
    const newId = isUUID(convo.id) ? convo.id : uuidv4();
    const newLeadId = leadIdMap[convo.lead_id];
    if (!newLeadId) continue;
    await pg.query(
      `INSERT INTO conversations (id, lead_id, state, updated_at)
       VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`,
      [newId, newLeadId, convo.state || "awaiting_name", convo.last_message_at || new Date().toISOString()]
    );
  }
  console.log(" Conversations done");

  const messages = sqlite.prepare("SELECT * FROM messages").all();
  console.log(`Migrating ${messages.length} messages...`);

  for (const msg of messages) {
    const newLeadId = leadIdMap[msg.lead_id];
    if (!newLeadId) continue;
    await pg.query(
      `INSERT INTO messages (id, lead_id, direction, body, created_at)
       VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING`,
      [uuidv4(), newLeadId, msg.direction, msg.body, msg.created_at || new Date().toISOString()]
    );
  }
  console.log(" Messages done");

  await pg.end();
  console.log("Migration complete!");
}

migrate().catch(console.error);