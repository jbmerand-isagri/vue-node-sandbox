# Nodejs app with graphql & prisma

## Installation

`nvm use 18.20.4`

`npm init`

`npm install graphql`

`npm i --save-dev typescript`

`npm i --save-dev @types/node`

`npm i express graphql-http graphql`

`npm i ruru`

`npm i --save-dev prisma`

`npm i @prisma/client`

`npm i --save-dev chai mocha sinon`

`npm i --save-dev @types/chai @types/mocha @types/sinon`

`npm i --save-dev ts-node`

## Definitions

- Server: Sets up a basic HTTP server that routes requests to the GraphQL handler.

- Resolvers: Implements the logic for fetching and manipulating data.

### Under graphql

- Schema: Defines the GraphQL types, queries, and mutations.

## Use Postgresql with docker

`docker pull postgres:16.4-alpine3.20`

`docker run --name postgres-vue-node-sandbox -e POSTGRES_PASSWORD=pwd -d postgres:16.4-alpine3.20`

## Use Prisma ORM

[Prisma Doc](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project)

`npx prisma init`

### Introspection

"Prisma introspects the database (i.e. it reads the database schema). It then translates the database schema from SQL into a data model in your Prisma schema."

`npx prisma db pull`

### Baseline

`npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql`

`npx prisma migrate resolve --applied 0_init`

## Use Prisma Client

Reads the prisma schema and setting it up

`npx prisma generate`

Create and apply migration on database

`npx prisma migrate dev --name tags-model`

Only create the sql migration file

`npx prisma migrate dev --create-only`

`npx prisma studio`

## Create database to try Prisma's baseline

```postgresql
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    game_date DATE NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participations (
    participation_id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players(player_id),
    game_id INT REFERENCES games(game_id),
    score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Start server

Use one of the following command.

`npm run start`

`node src/server.ts`

Then you can go to [http://localhost:4000/](http://localhost:4000/) to use the ruru UI to try graphql queries.

### Examples of queries

#### Get users and sessions

```graphql
{
  users {
    id
    username
    createdAt
  }
  sessions {
    id
    sessionName
    createdAt
  }
}
```

or

```graphql
query {
  users {
    id
    username
    createdAt
  }
  sessions {
    id
    sessionName
    createdAt
  }
}
```

#### Create a new user

```graphql
mutation CreateUser($username: String!) {
  createUser(username: $username) {
    username
  }
}
```

With the following variable:

```json
{
  "username": "Joe"
}
```

#### Delete one user

```graphql
mutation DeleteUser($userId: Int!) {
  deleteUser(id: $userId) {
    username
  }
}
```

With the following variable:

```json
{
  "userId": 1
}
```

## Tests

Mocha: Manages the execution of tests and provides a framework for organizing them.

Chai: Provides the assertions to verify the outcomes of the tests.

sinon : Used for mocking dependencies.

### Mocha

`.mocharc.json` is the configuration file of Mocha.

The following line indicates that Mocha should use ts-node with ECMAScript modules (ESM) support as the loader for running tests.

```json
"loader": "ts-node/esm",
```

## Libs

`ts-node` performs JIT transformations, converting TypeScript into JavaScript at runtime. This allows you to execute TypeScript directly in Node.js without the need for a separate compilation step

`ts-node/esm` is a loader provided by ts-node that enables to run TypeScript files directly in Node.js without precompiling them
