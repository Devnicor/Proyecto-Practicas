/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DistanceC } from './distance';

@Module({
  imports: [DistanceC],
})
export class DistanceModule {}
