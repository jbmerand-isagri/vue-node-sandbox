# Nodejs app with graphql & prisma

## Installation

`nvm use 18.20.4`

`npm i`

### Previously performed installations

`npm init`

`npm i graphql`

`npm i -D typescript`

`npm i -D ts-node`

`npm i -D @types/node`

`npm i express graphql-http graphql`

`npm i ruru`

`npm i -D prisma`

`npm i @prisma/client`

#### Tests

`npm i -D chai mocha sinon`

`npm i -D @types/chai @types/mocha @types/sinon`

#### Linter

`npm i -D eslint`

`npx eslint --init`

## Definition

- Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- GraphQL: A query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.

- GraphQL Schema: A blueprint that defines the structure of your GraphQL API, including types, queries, mutations, and their relationships.

- Query: In GraphQL, a query is a read-only operation that requests data from the server, specifying exactly what data is needed.

- Mutation: In GraphQL, a mutation is an operation that allows clients to modify server-side data, such as creating, updating, or deleting records.

- Prisma ORM: An open-source database toolkit that simplifies database access with an auto-generated and type-safe query builder for TypeScript and Node.js.

- Prisma Schema: A declarative configuration file used to define database models and relationships in Prisma.

- Prisma Migrations: A system for managing and applying changes to database schema over time, ensuring consistency and version control.

- Resolver: A function in GraphQL that resolves a value for a type or field in the schema, handling the logic for fetching or computing the data requested by a query or mutation.

## Use Postgresql with docker

`docker pull postgres:16.4-alpine3.20`

`docker run ...`

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

`npx prisma generate` : Reads the prisma schema and setting it up

`npx prisma migrate dev --name tags-model` : Create and apply migration on database

`npx prisma migrate dev --create-only` : Only create the sql migration file

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

`ESLint` is a tool for identifying and fixing problems in JavaScript code, ensuring code quality and consistency.
