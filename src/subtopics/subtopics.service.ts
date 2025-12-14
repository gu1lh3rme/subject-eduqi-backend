import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';

@Injectable()
export class SubtopicsService {
  constructor(private prisma: PrismaService) {}

  async create(createSubtopicDto: CreateSubtopicDto) {
    return this.prisma.subtopic.create({
      data: createSubtopicDto,
    });
  }

  async findAll() {
    return this.prisma.subtopic.findMany({
      include: {
        subject: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.subtopic.findUnique({
      where: { id },
      include: {
        subject: true,
      },
    });
  }

  async findBySubject(subjectId: number) {
    return this.prisma.subtopic.findMany({
      where: { subjectId },
    });
  }

  async update(id: number, updateSubtopicDto: UpdateSubtopicDto) {
    return this.prisma.subtopic.update({
      where: { id },
      data: updateSubtopicDto,
    });
  }

  async remove(id: number) {
    return this.prisma.subtopic.delete({
      where: { id },
    });
  }
}
