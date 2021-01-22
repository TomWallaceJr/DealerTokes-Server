BEGIN;

TRUNCATE
  "workdays",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'JD123',
    'John Doe',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "workdays" ("id", "hours", "downs", "tokes", "date", "notes", "user_id")
VALUES
  (1, 8, 14, 321, 2020-11-01, "full shift 4 breaks", 1),
  (2, 2, 14, 60, 2020-11-04, "signed EO", 1),
  (3, 4, 14, 152, 2020-11-05, "tiger king", 1),
  (4, 4.5, 14, 150, 2020-11-09, "aliens attacked", 1),
  (5, 7, 14, 320, 2020-11-11, "full shift", 1),
  (6, 9, 14, 444, 2020-11-14, "it was cold", 1),
  (7, 2, 14, 41, 2020-11-15, "bomb scare", 1),
  (8, 1, 14, 21, 2020-11-18, "EO", 1),
  (10, 5, 14, 64, 2020-11-24, "meh", 1),
  (11, 5, 14, 101, 2020-12-01, "big tipper", 1),
  (12, 8, 14, 311, 2020-12-02, "full shift", 1),
  (13, 8, 14, 321, 2020-12-05, "full shift", 1),
  (14, 1, 14, 11, 2020-12-07, "EO", 1),
  (15, 1.5, 14, 42, 2020-12-15, "signed EO", 1),
  (16, 6, 14, 200, 2020-12-19, "it was cold", 1),
  (17, 3.5, 14, 77, 2020-12-24, "santa coming", 1),
  (18, 8, 14, 299, 2020-12-25, "merry christmas", 1);

COMMIT;
