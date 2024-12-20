import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';
  console.log(query);

  const normalizedQuery = query.normalize('NFC').toLowerCase();

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: normalizedQuery,
        mode: 'insensitive',
      },
    },
    take: 5,
  });

  checkDatabaseSettings();

  return NextResponse.json({ products });
}

async function checkDatabaseSettings() {
  const collation = await prisma.$queryRaw`
  SELECT datcollate FROM pg_database WHERE datname = current_database();
`;
  console.log(collation);
  //  const version = await prisma.$queryRaw`SELECT version()`;
  //  console.log(version);
  //  const collation = await prisma.$queryRaw`SHOW LC_COLLATE`;
  //  const ctype = await prisma.$queryRaw`SHOW LC_CTYPE`;
  //  const encoding = await prisma.$queryRaw`SHOW SERVER_ENCODING`;

  //  console.log('LC_COLLATE:', collation);
  //  console.log('LC_CTYPE:', ctype);
  //  console.log('SERVER_ENCODING:', encoding);
}
