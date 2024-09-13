-- CreateTable
CREATE TABLE "games" (
    "game_id" SERIAL NOT NULL,
    "game_date" DATE NOT NULL,
    "location" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "participations" (
    "participation_id" SERIAL NOT NULL,
    "player_id" INTEGER,
    "game_id" INTEGER,
    "score" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participations_pkey" PRIMARY KEY ("participation_id")
);

-- CreateTable
CREATE TABLE "players" (
    "player_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "players_pkey" PRIMARY KEY ("player_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

