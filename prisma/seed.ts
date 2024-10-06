// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // First, create a user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
    },
  });

  // Then create projects for the user, linking them with `userId`
  const projectAlpha = await prisma.project.create({
    data: {
      title: 'Project Alpha',
      userId: user.id, // Linking project to the user
      tasks: {
        create: [
          {
            title: 'Task 1 for Project Alpha',
            done: false,
            dueDate: new Date('2024-10-20'),
            userId: user.id, // Linking task to the user
          },
          {
            title: 'Task 2 for Project Alpha',
            done: true,
            dueDate: new Date('2024-11-01'),
            userId: user.id, // Linking task to the user
          },
        ],
      },
    },
  });

  const projectBeta = await prisma.project.create({
    data: {
      title: 'Project Beta',
      userId: user.id, // Linking project to the user
      tasks: {
        create: [
          {
            title: 'Task 1 for Project Beta',
            done: false,
            dueDate: new Date('2024-12-15'),
            userId: user.id, // Linking task to the user
          },
        ],
      },
    },
  });

  console.log({ user, projectAlpha, projectBeta });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
