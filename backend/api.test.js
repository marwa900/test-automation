const request = require('supertest');
// or for TS: import request from 'supertest';

// Import your app (Express/NestJS app instance)
const app = require('../src/app'); // Adjust the path to your main app export

describe('API Tests', () => {
  let authToken = '';

  // Test POST /login - Positive & Negative
  describe('POST /login', () => {
    it('should login with valid credentials and return token', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'admin', password: '123456' })
        .expect(201);

      expect(res.body.access_token).toBeDefined();
      authToken = res.body.access_token; // save token for authenticated routes
    });

    it('should fail login with invalid credentials', async () => {
      await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'wrongpass' })
        .expect(401);
    });
  });

  // Test GET /items
  describe('GET /items', () => {
    it('should get list of items', async () => {
      const res = await request(app)
        .get('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // Test POST /items
  let createdItemId = null;
  describe('POST /items', () => {
    it('should create a new item', async () => {
      const res = await request(app)
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'New Item', description: 'Test item' })
        .expect(201);

      expect(res.body.id).toBeDefined();
      createdItemId = res.body.id;
    });

    it('should fail to create with missing fields', async () => {
      await request(app)
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({}) // empty payload
        .expect(400);
    });
  });

  // Test PUT /items/:id
  describe('PUT /items/:id', () => {
    it('should update an existing item', async () => {
      const res = await request(app)
        .put(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Item' })
        .expect(200);

      expect(res.body.name).toBe('Updated Item');
    });

    it('should return 404 for invalid id', async () => {
      await request(app)
        .put('/items/invalidid')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Name' })
        .expect(404);
    });
  });

  // Test DELETE /items/:id
  describe('DELETE /items/:id', () => {
    it('should delete an existing item', async () => {
      await request(app)
        .delete(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should return 404 when deleting non-existent item', async () => {
      await request(app)
        .delete('/items/nonexistentid')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
