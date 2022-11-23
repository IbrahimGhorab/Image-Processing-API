import supertest from 'supertest';
import server from '../../index';

const request = supertest(server);



describe('test api endpoint response', () => {
  it('should return 200 OK', async () => {
    await request.get('/').expect(200);
  });

  it('should return 404', async () => {
    await request.get('/image').expect(404);
  });

  it('should return 404', async () => {
    await request.get('/image?name=1').expect(404);
  });

  it('it should return 404', async () => {
    await request.get('/image?name=1&width=400').expect(404);
  });

  it('should return 200 OK', async () => {
    const response = await request.get(`/image?name=1&width=400&height=400`);
    expect(response.status).toBe(200);
  });
});
