/* eslint-disable prettier/prettier */
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // adjust path if needed

describe('API Tests', () => {
  let app: INestApplication;
  let authToken = '';
  let createdItemId: string | null = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Test POST /login - Positive & Negative
  describe('POST /login', () => {
    it('should login with valid credentials and return token', async () => {
      const res = await request(app.getHttpServer())
        .post('/login')
        .send({ username: 'admin', password: '123456' })
        .expect(201);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(res.body.access_token).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      authToken = res.body.access_token;
    });

    it('should fail login with invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/login')
        .send({ username: 'admin', password: 'wrongpass' })
        .expect(401);
    });
  });

  // Test GET /items
  describe('GET /items', () => {
    it('should get list of items', async () => {
      const res = await request(app.getHttpServer())
        .get('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // Test POST /items
  describe('POST /items', () => {
    it('should create a new item', async () => {
      const res = await request(app.getHttpServer())
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'New Item', description: 'Test item' })
        .expect(201);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(res.body.id).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      createdItemId = res.body.id;
    });

    it('should fail to create with missing fields', async () => {
      await request(app.getHttpServer())
        .post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({}) // empty payload
        .expect(400);
    });
  });

  // Test PUT /items/:id
  describe('PUT /items/:id', () => {
    it('should update an existing item', async () => {
      const res = await request(app.getHttpServer())
        .put(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Item' })
        .expect(200);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(res.body.name).toBe('Updated Item');
    });

    it('should return 404 for invalid id', async () => {
      await request(app.getHttpServer())
        .put('/items/invalidid')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Name' })
        .expect(404);
    });
  });

  // Test DELETE /items/:id
  describe('DELETE /items/:id', () => {
    it('should delete an existing item', async () => {
      await request(app.getHttpServer())
        .delete(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should return 404 when deleting non-existent item', async () => {
      await request(app.getHttpServer())
        .delete('/items/nonexistentid')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
