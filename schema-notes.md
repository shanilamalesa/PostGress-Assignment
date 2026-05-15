Why UUID instead of auto-incrementing integers?

->Uuid is being prefererd as they generate independently without coordination and autoincrement the server might clash if are multiples server working at the same time,  db generates literally the same number or same id that will cause conflict.


Why TIMESTAMPTZ instead of TIMESTAMP?

-->TIMESTAMPTZ shows the exact time of a rigion. Timestamp dispays time without the timezone. You may not know what timezone the time was recorded in. So if the server moves or the users are in different countries, the data becomes ambiguous or misleading.

What does the CHECK (status IN (...)) constraint buy you over just a comment?

-->Unlike a comment which anyone can ignore, a CHECK constraint validates that the input matches one of the allowed values. If it doesn't, the database rejects it completely, throws an error, and the row is never saved.


Why ON DELETE CASCADE on conversations.lead_id and messages.lead_id?

-->when a lead is deleted, the messages and conversation on the database should be deleted to   since their lead does not exist. Without CASCADE, the rows would sit in the database with no lead attached to them.