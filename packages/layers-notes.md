## What is the rule for what each layer can know about?

For the router (leads.js), it receives the HTTP request, pulls out what the user sent, and passes it to the services. Then, when the results are ready, it sends the response back.

For the services, they validate the inputs, enforce the business logic, and call the repository to get the data.

For the repositories, they run the SQL queries and return the raw data.

## Why should repositories never format HTTP responses?

The repository should only return raw data, not format it as an HTTP response. This is because the same repository function can be used in different contexts for example, a REST API, a WhatsApp bot, or a CSV export. If the repository formatted the data as an HTTP response, it would only work for one context and would be useless everywhere else. By returning raw data, the layer above it (the service or route) can decide how to format and send it.

## Why should routes never write SQL directly?

Routes should never write SQL directly because if the same query is repeated across multiple route files, any change to that query would need to be made in every single place. This makes the code hard to maintain and easy to break. By keeping all SQL in the repository layer, you only need to change it in one place and all routes that use it will automatically get the update.