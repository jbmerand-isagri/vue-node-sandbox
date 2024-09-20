/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';

/**
 * Create a new Prisma client
 * It will be used to interact with the database
 * and perform CRUD operations
 * on the User, Session, Story, and Vote models
 * defined in the Prisma schema
 */
const prisma = new PrismaClient({ log: ['query', 'info'] });

/**
 * Root resolver object for GraphQL queries and mutations.
 * It contains the resolvers for the User, Session, Story, and Vote models.
 * The resolvers are used to interact with the Prisma client
 * and perform CRUD operations on the models.
 * TODO: Add types to be sure resolvers' returned data suit the graphql schema
 */
export const rootResolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),

    session: async ({ id }: { id: number }) => {
      let graphqlSession = null;
      const prismaSession = await prisma.session.findFirst({
        where: { id },
        include: { user: true },
      });

      if (prismaSession != null) {
        graphqlSession = {
          id: prismaSession.id,
          sessionName: prismaSession.sessionName,
          createdBy: prismaSession.user,
          createdAt: prismaSession.createdAt,
          updatedAt: prismaSession.updatedAt,
        };
      }

      return graphqlSession;
    },

    // Return all sessions with their associated users
    // The include field specifies that the user field of the session model
    // should be included in the response
    sessions: async () => {
      const prismaSessions = await prisma.session.findMany({
        include: { user: true },
      });

      // It would be better to use an adapter here (type prisma -> type graphql)
      const graphqlSessions = prismaSessions.map((session) => ({
        id: session.id,
        sessionName: session.sessionName,
        createdBy: session.user,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      }));

      return graphqlSessions;
    },

    stories: async ({ sessionId }: { sessionId: number }) =>
      await prisma.story.findMany({ where: { sessionId } }),
  },
  Mutation: {
    /**
     * Create a new user with the given username.
     */
    createUser: async (_: any, args: { username: string }) => {
      const { username } = args;
      return await prisma.user.create({
        data: { username },
      });
    },

    /**
     * Delete a user with the given id.
     * If the user does not exist, return null.
     * If the user is successfully deleted, return the deleted user.
     */
    deleteUser: async (_: any, args: { id: number }) => {
      const { id } = args;
      return await prisma.user.delete({
        where: { id },
      });
    },

    /**
     * Create a new session with the given session name
     * and the author's username.
     * If the author does not exist, create a new user with the given username.
     */
    createSession: async (
      _: any,
      args: {
        sessionName: string;
        authorUsername: string;
      },
    ) => {
      const { sessionName, authorUsername } = args;
      console.log('sessionName', sessionName);
      console.log('authorUsername', authorUsername);
      let user = await prisma.user.findUnique({
        where: { username: authorUsername },
      });

      if (user == null) {
        user = await prisma.user.create({
          data: { username: authorUsername },
        });
      }

      const session = await prisma.session.create({
        data: {
          sessionName,
          createdBy: user.id,
        },
      });

      return {
        id: session.id,
        sessionName: session.sessionName,
        createdBy: user,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      };
    },

    // TODO: Fix the createStory mutation
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

    // TODO: Fix the createVote mutation
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
