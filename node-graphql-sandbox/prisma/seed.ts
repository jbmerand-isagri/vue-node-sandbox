import { Prisma, PrismaClient } from '@prisma/client';

/**
 * Create a new Prisma client
 * It will be used to interact with the database
 * and perform CRUD operations
 * on the User, Session, Story, and Vote models
 * defined in the Prisma schema
 */
const prisma = new PrismaClient();

/**
 * The data will be used to create new User records
 * in the database
 */
const userData: Prisma.UserCreateInput[] = [
  {
    username: 'Alice',
  },
  {
    username: 'Bob',
  },
  {
    username: 'Charlie',
  },
  {
    username: 'David',
  },
  {
    username: 'Eve',
  },
];

/**
 * The data will be used to create new Session records
 * in the database
 * Each session is associated with a user
 * The user is connected to the session using the `connect` field
 * which specifies the username of the user
 * The username must match an existing user in the database
 */
const sessionData: Prisma.SessionCreateInput[] = [
  {
    sessionName: 'Team Rero - Sprint 2',
    createdAt: new Date(2024, 8, 18),
    updatedAt: new Date(2024, 9, 11),

    user: {
      connect: { username: 'Alice' },
    },
  },
  {
    sessionName: 'PI14 - Sprint 1',
    createdAt: new Date(2024, 7, 23),
    updatedAt: new Date(2024, 9, 17),
    user: {
      connect: { username: 'David' },
    },
  },
  {
    sessionName: 'Equipe Failover',
    createdAt: new Date(2024, 6, 2),
    updatedAt: new Date(2024, 7, 1),
    user: {
      connect: { username: 'Charlie' },
    },
  },
];

/**
 * Main function to seed the database
 * with initial data.
 */
async function main() {
  console.log(`Start seeding ...`);

  // for each user in userData, upsert the user
  for (const user of userData) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
  }

  // for each session in sessionData, create a new session
  for (const session of sessionData) {
    await prisma.session.create({
      data: session,
    });
  }

  console.log(`Seeding finished.`);
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
