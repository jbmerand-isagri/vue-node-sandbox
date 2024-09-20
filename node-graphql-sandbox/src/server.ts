import { ApolloServer } from '@apollo/server';
import { schema } from './graphql/schema.js';
import { rootResolvers } from './resolvers.js';

import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
  schema: schema,
  rootValue: rootResolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
