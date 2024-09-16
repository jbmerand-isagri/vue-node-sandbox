import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Root resolver object for GraphQL queries and mutations.
 * @typedef {Object} RootResolver
 * @property {Function} users - Retrieves all users.
 * @property {Function} sessions - Retrieves all sessions.
 * @property {Function} stories - Retrieves all stories for a given session.
 * @property {Function} createUser - Creates a new user.
 * @property {Function} createSession - Creates a new session.
 * @property {Function} createStory - Creates a new story.
 * @property {Function} createVote - Creates a new vote.
 */
export const root = {
    // QUERIES
    users: async () => await prisma.user.findMany(),
    sessions: async () => await prisma.session.findMany(),
    stories: async ({ sessionId }: { sessionId: number; }) => await prisma.story.findMany({ where: { sessionId } }),

    // MUTATIONS
    // users
    createUser: async ({ username }: { username: string; }) => {
        return await prisma.user.create({
            data: { username },
        });
    },
    deleteUser: async ({ id }: { id: number; }) => {
        return await prisma.user.delete({
            where: { id },
        });
    },

    createSession: async ({ sessionName, createdBy }: { sessionName: string, createdBy: number; }) => {
        return await prisma.session.create({
            data: { sessionName, createdBy },
        });
    },
    createStory: async ({ sessionId, title, description }: { sessionId: number, title: string, description?: string; }) => {
        return await prisma.story.create({
            data: { sessionId, title, description },
        });
    },
    createVote: async ({ storyId, userId, voteValue }: { storyId: number, userId: number, voteValue: number; }) => {
        return await prisma.vote.create({
            data: { storyId, userId, voteValue },
        });
    },
};