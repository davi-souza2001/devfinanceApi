/*
  Warnings:

  - Added the required column `date` to the `transference` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "recurrent" BOOLEAN NOT NULL,
    "emailUser" TEXT NOT NULL,
    "expense" BOOLEAN NOT NULL,
    "date" REAL NOT NULL
);
INSERT INTO "new_transference" ("emailUser", "expense", "id", "name", "recurrent", "value") SELECT "emailUser", "expense", "id", "name", "recurrent", "value" FROM "transference";
DROP TABLE "transference";
ALTER TABLE "new_transference" RENAME TO "transference";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
