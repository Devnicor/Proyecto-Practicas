import { PrismaClient } from '@prisma/client';
import console from 'console';

const prismaClient = new PrismaClient();

async function main() {
  const track = await prismaClient.tracking.create({
    data: {
      user_id: '3dget456gy',
      car_id: 'RFDG43GT',
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date(),
      latitude: -63.6344,
      longitude: -40.7635,
    },
  });
  console.log(track);
}
