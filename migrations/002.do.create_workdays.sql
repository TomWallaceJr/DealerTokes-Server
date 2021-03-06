CREATE TABLE "workdays" (
  "id" SERIAL PRIMARY KEY,
  "hours" FLOAT(2) NOT NULL,
  "downs" INT DEFAULT 0 NOT NULL,
  "tokes" INT DEFAULT 0 NOT NULL,
  "date" DATE NOT NULL,
  "notes" TEXT,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL,
  UNIQUE(date, user_id)
);
