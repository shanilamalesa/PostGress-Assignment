const leadsRepo = require("../repositories/leadsRepo");

async function listLeads({ q, status, limit, offset }){
    limit = limit || 20
    offset = offset || 0

    return await leadsRepo.list({ q, status, limit, offset })
}

module.exports = { listLeads };