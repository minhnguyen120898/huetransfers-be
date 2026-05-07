import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123456', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@huetransfers.com' },
    update: {},
    create: {
      email: 'admin@huetransfers.com',
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
