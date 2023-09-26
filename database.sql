CREATE TABLE "games" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INT REFERENCES "users",
    "resources" JSONB,
    "prices" JSONB,
    "pickerBots" JSONB,
    "planterBots" JSONB,
    "pickletBots" JSONB,
    "upgrades" JSONB,
    "cycle" INT,
    "gameSpeed" INT
);

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "hashed_password" VARCHAR(120),
    "role" VARCHAR(20)
);