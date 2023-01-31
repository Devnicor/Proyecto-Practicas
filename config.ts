import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: 'miaguila',
    database: {
      name: process.env.DATABASE_URL,
    },
    apikey1: process.env.API_KEY_1,
    apikey2: process.env.API_KEY_2,
    url_gate: process.env.URL_GATE,
    fulfillmentApi: process.env.FULFILLMENT_API,
  };
});
