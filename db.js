const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.timelineEntry.findMany().then(console.log).finally(() => prisma.$disconnect());
