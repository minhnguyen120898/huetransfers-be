import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123456', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'Huetransfers@gmail.com' },
    update: {},
    create: {
      email: 'Huetransfers@gmail.com',
      passwordHash,
      fullName: 'System Admin',
      role: 'admin',
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('Seed complete. Admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
