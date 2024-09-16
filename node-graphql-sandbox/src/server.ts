import { schema } from "./graphql/schema";
import { root } from "./resolvers";

import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

const { ruruHTML } = require("ruru/server");

const app = express();

// Create and use the GraphQL handler
// It will use the schema and root resolver object
// to handle incoming GraphQL queries and mutations
// The handler will be available at the /graphql endpoint
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE
// It provides a nice interface to test the GraphQL API
app.get("/", (_req: any, res: any) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
