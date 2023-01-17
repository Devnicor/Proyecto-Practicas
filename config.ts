import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: 'miaguila',
    database: {
      name: process.env.DATABASE_URL,
    },
    apikey: process.env.API_KEY,
    url_gate: 'http://localhost:3044',
    fulfillmentApi: 'https://driver-logs.miaguila.com/api/v1/gps_tracking',
  };
});
