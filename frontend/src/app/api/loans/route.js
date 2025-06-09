import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const loans = await prisma.loan.findMany();
    return Response.json(loans);
  } catch (err) {
    console.error('LOANS API ERROR:', err);
    return Response.json({ error: 'Failed to load loans' }, { status: 500 });
  }
}
