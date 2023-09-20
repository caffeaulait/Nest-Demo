import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('handles a sign up request', async () => {
    const reqEmail = 'asdf@123.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: reqEmail, password: 'asdf' })
      .expect(201);
    const { id, email } = res.body;
    expect(id).toBeDefined();
    expect(email).toEqual(reqEmail);
  });

  it('sign up as a new user then get the currently user', async () => {
    const email = 'asdf@asdf.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: email, password: 'asdf' })
      .expect(201);
    const cookie = res.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookie)
      .expect(200);
    expect(body.email).toEqual(email);
  });
});
