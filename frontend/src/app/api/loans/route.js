import { prisma } from '@/lib/prisma';

export async function GET() {
  const loans = await prisma.loan.findMany();
  return Response.json(loans);
}
