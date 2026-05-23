# AI Audit - Week 12 Day 1

## AI Assisted
- Path error fix (forward vs backslash)
- conversations and messages tables + indexes

## Done Manually
- leads table (typed by hand)
- All schema-notes.md answers 
Task 5: Auth manual-only proof in the audit

## Auth Manual-Only Proof

src/routes/auth.js - Handles signup and login, hashes passwords, issues JWT 
src/middleware/requireAuth.js - Verifies JWT token on protected routes 
src/middleware/requireRole.js -  Checks user role, rejects non-admin users with 403 |

### Did AI touch any of these files?
No. Every line was hand-written by me.
AI was only used to help debug errors during API testing 
(e.g. missing table permissions, wrong database name in .env, 
missing auth router in app.js).

