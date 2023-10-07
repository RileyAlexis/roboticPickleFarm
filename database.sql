CREATE TABLE "games" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "plants" JSONB,
    "resources" JSONB,
    "stats" JSONB,
    "robots" JSONB,
    "plantSettings" JSONB,
    "prices" JSONB,
    "buildings" JSONB,
    "upgrades" JSONB,
    "log" VARCHAR(120) ARRAY
);

CREATE TABLE "resources" (
    "id" SERIAL PRIMARY KEY,
    "seeds" INT,
    "cucumbers" INT,
    "pickles" INT,
    "pickleJars" INT,
    "placeHolder01" INT,
    "placeHolder02" INT,
    "placeHolder03" INT,
    "placeHolder04" INT,
    "placeHolder05" INT
);

CREATE TABLE "stats" (
    "id" SERIAL PRIMARY KEY,
    "totalProduction" BIGINT,
    "pickleProduction" INTEGER ARRAY,
    "cucumberProduction" INTEGER ARRAY,
    "seedProduction" INTEGER ARRAY,
    "timeframe" INT,
    "cycles" BIGINT
);

CREATE TABLE "robots" (
    "id" SERIAL PRIMARY KEY,
    "pickerBots" INT,
    "planterBots" INT,
    "picklerBots" INT,
    "pickerSpeed" INT,
    "planterSpeed" INT,
    "picklerSpeed" INT
);

CREATE TABLE "plants" (
    "id" SERIAL PRIMARY KEY,
    "plants" JSONB
)

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "hashed_password" VARCHAR(1000),
    "role" VARCHAR(20)
);

-- Inserting JSON data into table:
INSERT INTO "games" ("resources", "prices", "pickerBots", 
    "planterBots", "picklerBots", "upgrades", "cycle", "gameSpeed", "log")
VALUES ('{"seeds": 5, "plants": 2, "cucumbers": 20}', 
    '{"seeds": 50, "bots": 100}', '{"qty": 5, "speed": 1}', 
    '{"qty": 2, "speed": 1}', '{"qty": 1, "speed": 1}', 
    '{"superspeed": 1}' , 563, 1000, 'log data');