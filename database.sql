CREATE TABLE "games" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INT REFERENCES "users",
    "resources" JSONB,
    "prices" JSONB,
    "pickerBots" JSONB,
    "planterBots" JSONB,
    "picklerBots" JSONB,
    "upgrades" JSONB,
    "cycle" INT,
    "gameSpeed" INT,
    "log" TEXT
);

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "hashed_password" VARCHAR(120),
    "role" VARCHAR(20)
);

-- Inserting JSON data into table:
INSERT INTO "games" ("resources", "prices", "pickerBots", 
    "planterBots", "picklerBots", "upgrades", "cycle", "gameSpeed", "log")
VALUES ('{"seeds": 5, "plants": 2, "cucumbers": 20}', 
    '{"seeds": 50, "bots": 100}', '{"qty": 5, "speed": 1}', 
    '{"qty": 2, "speed": 1}', '{"qty": 1, "speed": 1}', 
    '{"superspeed": 1}' , 563, 1000, 'log data');