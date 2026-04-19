import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if user already exists
  const existingUser = await prisma.user.findFirst();
  
  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: 'Oluwole Adigun',
        email: 'techbaseusertest@gmail.com',
        phoneNumber: '8054975150',
        address: '95, Oba Iseri Hamar Street, Off Afon Adewale Street, VI Island, Lagos',
        accountType: 'Individual',
        profileImage: null,
      },
    });
    console.log('Seed user created successfully');
  } else {
    console.log('User already exists, skipping seed');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
