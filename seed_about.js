const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const correctAbout = {
  introText1: "Tadasha Mishra is a 1994 batch Indian Police Service officer serving as the Director General of Police, Jharkhand, and the first woman to lead the state police.",
  introText2: "Her professional identity blends operational leadership, investigative discipline, and institutional reform across more than three decades of service.",
  biographyHeading: "A 1994 batch Indian Police Service officer, Tadasha Mishra has built a distinguished career spanning field operations, district leadership, and senior command roles across Bihar and Jharkhand.",
  biographyText: "She has held key positions including Additional Director General of Police and Special Director General of Police, CID.",
  biographyMore1: "With deep experience in investigations, intelligence coordination, and operational command.",
  biographyMore2: "As Director General of Police, Jharkhand, she focuses on investigation quality, accountability, and strong coordination across units.",
  biographyMore3: "Her leadership reflects a belief in combining operational discipline with institutional collaboration.",
  approach: "Focus on investigative integrity, procedural discipline, and inter-agency coordination with evidence-based policing.",
  vision: "Build a policing system defined by accountability, investigative excellence, and public trust.",
};

async function main() {
  // Overwrite the about settings completely with the correct schema
  await prisma.siteSetting.upsert({
    where: { key: 'about' },
    update: { value: JSON.stringify(correctAbout) },
    create: { key: 'about', value: JSON.stringify(correctAbout) }
  });
  console.log('About settings fully reset to correct defaults.');
  
  // Verify
  const result = await prisma.siteSetting.findUnique({ where: { key: 'about' } });
  console.log('Verified:', JSON.parse(result.value));
}

main().finally(() => prisma.$disconnect());
