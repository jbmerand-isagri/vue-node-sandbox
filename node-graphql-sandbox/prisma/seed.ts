import { PrismaClient, Prisma } from "@prisma/client";

// Create a new Prisma client
// It will be used to interact with the database
// and perform CRUD operations
// on the User, Session, Story, and Vote models
// defined in the Prisma schema
const prisma = new PrismaClient();

// The data will be used to create new User records
// in the database
const userData: Prisma.UserCreateInput[] = [
    {
        username: "Alice",
    },
    {
        username: "Bob",
    },
    {
        username: "Charlie",
    },
    {
        username: "David",
    },
    {
        username: "Eve",
    },
];

/**
 * Main function to seed the database
 * with initial data.
 */
async function main() {
    console.log(`Start seeding ...`);
    // await prisma.user.upsert({
    //     data: userData,
    // });
    // for each user in userData, upsert the user
    // data is the user data
    for (const user of userData) {
        await prisma.user.upsert({
            where: { username: user.username },
            update: {},
            create: user,
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
