import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info'] });

/**
 * Root resolver object for GraphQL queries and mutations.
 * It contains the resolvers for the User, Session, Story, and Vote models.
 * The resolvers are used to interact with the Prisma client
 * and perform CRUD operations on the models.
 */
export const root = {
  // QUERIES
  Query: {
    users: async () => await prisma.user.findMany(),

    session: async ({ id }: { id: number }) => {
      return await prisma.session.findFirst({
        where: { id },
        include: { user: true },
      });
    },

    sessions: async () => {
      // const sessions = await prisma.session.findMany({ include: { user: true } });

      // sessions.map((session) => ({
      //   createdBy: session.user,
      // }));

      //console.log('sessions', sessions);

      const usersWithSessions = await prisma.user.findMany({
        include: { sessions: true },
      });

      return usersWithSessions;
    },

    stories: async ({ sessionId }: { sessionId: number }) =>
      await prisma.story.findMany({ where: { sessionId } }),
  },
  Mutation: {
    createUser: async ({ username }: { username: string }) => {
      return await prisma.user.create({
        data: { username },
      });
    },

    deleteUser: async ({ id }: { id: number }) => {
      return await prisma.user.delete({
        where: { id },
      });
    },

    createSession: async ({
      sessionName,
      createdBy,
    }: {
      sessionName: string;
      createdBy: number;
    }) => {
      return await prisma.session.create({
        data: { sessionName, createdBy },
      });
    },

    createStory: async ({
      sessionId,
      title,
      description,
    }: {
      sessionId: number;
      title: string;
      description?: string;
    }) => {
      return await prisma.story.create({
        data: { sessionId, title, description },
      });
    },

    createVote: async ({
      storyId,
      userId,
      voteValue,
    }: {
      storyId: number;
      userId: number;
      voteValue: number;
    }) => {
      return await prisma.vote.create({
        data: { storyId, userId, voteValue },
      });
    },
  },
};
