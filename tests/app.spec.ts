import { Server } from 'https';
import request from 'supertest';
import app from '../src/app';
const PORT = process.env.PORT || 4000;
// import { Application } from 'express';

// let server: Server;

beforeEach(async () => {
  const server = app.listen(PORT);
});

it('should be no users initially', async () => {
  const response = await request(app).get('/getlaunches/39');
  console.log(response.body);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    flight_number: 39,
    mission_name: 'NROL-76',
    rocket: {
      rocket_id: 'falcon9',
      rocket_name: 'Falcon 9',
      description:
        'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
      images: [
        'https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg',
        'https://farm4.staticflickr.com/3955/32915197674_eee74d81bb_b.jpg',
        'https://farm1.staticflickr.com/293/32312415025_6841e30bf1_b.jpg',
        'https://farm1.staticflickr.com/623/23660653516_5b6cb301d1_b.jpg',
        'https://farm6.staticflickr.com/5518/31579784413_d853331601_b.jpg',
        'https://farm1.staticflickr.com/745/32394687645_a9c54a34ef_b.jpg',
      ],
    },
    payloads: [
      {
        payload_id: 'NROL-76',
        manufacturer: 'Boeing',
        type: 'rocket',
      },
    ],
  });
});
