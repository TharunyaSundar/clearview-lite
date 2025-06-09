import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalLoans = await prisma.loan.count();
    const totalAmount = await prisma.loan.aggregate({ _sum: { amount: true } });
    const avgRate = await prisma.loan.aggregate({ _avg: { interest_rate: true } });
    const defaults = await prisma.loan.count({ where: { defaulted: true } });

    return Response.json({
      total_loans: totalLoans,
      total_amount: totalAmount._sum.amount || 0,
      average_interest_rate: avgRate._avg.interest_rate?.toFixed(2) || "0.00",
      default_rate: totalLoans === 0 ? "0.00%" : ((defaults / totalLoans) * 100).toFixed(2) + '%'
    });

  } catch (err) {
    console.error("SUMMARY API ERROR:", err);
    return Response.json({ error: 'Failed to load summary' }, { status: 500 });
  }
}
