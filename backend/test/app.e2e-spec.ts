import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Creates a Todo Item', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({
        title: 'Test Todo',
        scheduled: dayjs().toDate()
      })
      .expect(201);
  });

  afterEach(async () => {
    await app.close();
  });
});
