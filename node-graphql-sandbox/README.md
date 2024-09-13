## Installation

`nvm use 18.20.4`

`npm init`

`npm install graphql`

`npm install typescript`

`npm install express graphql-http graphql`

`npm install ruru`

`npm install prisma --save-dev`

## Use Postgresql with docker

`docker pull postgres:16.4-alpine3.20`

`docker run --name postgres-vue-node-sandbox -e POSTGRES_PASSWORD=pwd -d postgres:16.4-alpine3.20`

## Use Prisma ORM

[Prisma Doc](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project)

`npx prisma init`

### Introspection

"Prisma introspects the database (i.e. it reads the database schema). It then translates the database schema from SQL into a data model in your Prisma schema."

`npx prisma db pull`

## Feed database

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

`node server.js`
