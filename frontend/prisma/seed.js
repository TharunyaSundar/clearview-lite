const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const csv = require('csv-parser');

async function main() {
  const loans = [];

  fs.createReadStream('sample_loans.csv')
    .pipe(csv())
    .on('data', (row) => {
      loans.push({
        loan_id: row.loan_id,
        borrower: row.borrower,
        amount: parseInt(row.amount),
        interest_rate: parseFloat(row.interest_rate),
        term_months: parseInt(row.term_months),
        credit_score: parseInt(row.credit_score),
        defaulted: row.defaulted.toLowerCase() === 'true',
        loan_type: row.loan_type,
        state: row.state,
        issue_date: new Date(row.issue_date),
      });
    })
    .on('end', async () => {
      await prisma.loan.deleteMany();
      await prisma.loan.createMany({ data: loans });
      console.log('Database seeded!');
      await prisma.$disconnect();
    });
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
