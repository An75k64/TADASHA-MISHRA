const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearGallery() {
  await prisma.galleryImage.deleteMany({});
  console.log("Cleared gallery images.");
}

clearGallery().catch(console.error).finally(() => prisma.$disconnect());
