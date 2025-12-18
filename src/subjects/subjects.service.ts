import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: createSubjectDto,
    });
  }

  private async getSubtopicsWithChildren(where: any): Promise<any[]> {
    const subtopics = await this.prisma.subtopic.findMany({
      where,
    });

    const subtopicsWithChildren = await Promise.all(
      subtopics.map(async (subtopic) => {
        const children = await this.getSubtopicsWithChildren({
          parentId: subtopic.id,
        });
        return {
          ...subtopic,
          subtopics: children,
        };
      })
    );

    return subtopicsWithChildren;
  }

  async findAll() {
    const subjects = await this.prisma.subject.findMany();
    
    const subjectsWithSubtopics = await Promise.all(
      subjects.map(async (subject) => {
        const subtopics = await this.getSubtopicsWithChildren({
          subjectId: subject.id,
          parentId: null,
        });
        return {
          ...subject,
          subtopics,
        };
      })
    );

    return subjectsWithSubtopics;
  }

  async findOne(id: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    const subtopics = await this.getSubtopicsWithChildren({
      subjectId: subject.id,
      parentId: null,
    });

    return {
      ...subject,
      subtopics,
    };
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id); 

    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
