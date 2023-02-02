import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Faker } from '@faker-js/faker';

@Injectable()
export class Prisma {
  prismaClient = new PrismaClient();
  Test() {
    async function main(): Promise<void> {
      const track = await this.prismaClient.tracking.create({
        data: {
          user_id: '3dget456gy',
          car_id: 'RFDG43GT',
          createdAt: new Date(),
          updatedAt: new Date(),
          date: new Date(),
          latitude: -63.6344,
          longitude: -40.7635,
          ontrip: false,
        },
      });
      console.log(track.car_id);
    }

    main()
      .catch(async (e) => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {
        await this.prismaClient.$disconnect();
      });
  }
}
