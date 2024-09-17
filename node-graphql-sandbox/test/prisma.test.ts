import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { expect } from 'chai';
import { after, beforeEach } from 'mocha';

export const prisma = new PrismaClient();

// runs before each test in this block
beforeEach(async function () {
    //await prisma.user.deleteMany({});
});

// runs once after the last test in this block
after(async function () {
    await prisma.$disconnect();
});

// test cases
describe('Prisma', async function () {
    describe('user.create', async function () {
        it('should create a new valid user', async () => {
            const userData: Prisma.UserCreateArgs<DefaultArgs> = { data: { username: 'John' } };

            const user = await prisma.user.create(userData);

            expect(user.username).equal('John');

            expect(user.createdAt).to.be.a('Date').and.be.ok;
            expect(user.updatedAt).to.be.a('Date').and.be.ok;
            expect(user.id).to.be.a('number').and.be.ok;
        });
    });
});