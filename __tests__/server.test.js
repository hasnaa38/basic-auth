'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/database/index');

// Creating a connection
beforeAll(async () => {
    await db.sync();
});

// Dropping the connection after finishing
afterAll(async () => {
    await db.drop();
});

describe('Basic Authentication Testing', () => {
    test('1- Signing-up a new user', async () => {
        const res = await mockRequest.post('/sign-up').send({
            username: "Rehab",
            password: "helloWorld"
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('user signed-up successfully');
    });
    test('2- Signing-in with an existing account', async () => {
        const res = await mockRequest.post('/sign-in').auth("Rehab", "helloWorld");
        expect(res.status).toBe(201);
    });
    test('3- Signing-in with the wrong password', async () => {
        const res = await mockRequest.post('/sign-in').auth("Rehab", "hello123");
        expect(res.status).toBe(403);
        expect(res.text).toBe('Invalid user login');
    });
    test('4- Signing-in with a non-existing account', async () => {
        const res = await mockRequest.post('/sign-in').auth("Taghreed", "helloWorld");
        expect(res.status).toBe(403);
        expect(res.text).toBe('User doesn\'t exist, sign-up before logging in');
    });
});
