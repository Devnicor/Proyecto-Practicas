import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.tracking.create({
      data: {
        user_id: faker.database.mongodbObjectId(),
        car_id: faker.database.mongodbObjectId(),
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
        date: faker.datatype.datetime(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        ontrip: faker.datatype.boolean(),
      },
    });
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
