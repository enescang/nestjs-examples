import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from 'src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appService = moduleFixture.get<AppService>(AppService);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/access (GET) Unauthorized', async() => {
    const response = await request(app.getHttpServer()).get("/access");
    const error = new UnauthorizedException();
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", error.message);
    expect(response.body).toHaveProperty("statusCode", error.getStatus());
  });

  it('/access (GET) Authorized', async() => {
    const response = await request(app.getHttpServer()).get("/access").set("Authorization", "Bearer secret");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: appService.secretMessage(),
        user: expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String)
        }),
      })
    )
  });
});
