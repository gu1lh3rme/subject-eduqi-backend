import { Module } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { SubtopicsController } from './subtopics.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SubtopicsController],
  providers: [SubtopicsService, PrismaService],
})
export class SubtopicsModule {}
