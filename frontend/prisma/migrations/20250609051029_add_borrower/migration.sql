/*
  Warnings:

  - Added the required column `borrower` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loan_id" TEXT NOT NULL,
    "borrower" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "interest_rate" REAL NOT NULL,
    "term_months" INTEGER NOT NULL,
    "credit_score" INTEGER NOT NULL,
    "defaulted" BOOLEAN NOT NULL,
    "loan_type" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "issue_date" DATETIME NOT NULL
);
INSERT INTO "new_Loan" ("amount", "credit_score", "defaulted", "id", "interest_rate", "issue_date", "loan_id", "loan_type", "state", "term_months") SELECT "amount", "credit_score", "defaulted", "id", "interest_rate", "issue_date", "loan_id", "loan_type", "state", "term_months" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE UNIQUE INDEX "Loan_loan_id_key" ON "Loan"("loan_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
