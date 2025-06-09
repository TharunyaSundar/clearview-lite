-- CreateTable
CREATE TABLE "Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loan_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "interest_rate" REAL NOT NULL,
    "term_months" INTEGER NOT NULL,
    "credit_score" INTEGER NOT NULL,
    "defaulted" BOOLEAN NOT NULL,
    "loan_type" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "issue_date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Loan_loan_id_key" ON "Loan"("loan_id");
