const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  test('POST /api/auth/register - should register a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  test('POST /api/auth/login - should login user', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - should reject invalid credentials', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(response.status).toBe(401);
  });
});
