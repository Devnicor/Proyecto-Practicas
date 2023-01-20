import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class Prisma {
  Test() {
    async function main(): Promise<void> {
      const prismaClient = new PrismaClient();
      const track = await prismaClient.tracking.create({
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
      console.log(track);
    }

    main();
  }
}
