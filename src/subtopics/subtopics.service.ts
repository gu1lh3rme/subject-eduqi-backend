import { Injectable, NotFoundException } from '@nestjs/common';
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

  private async getSubtopicsWithChildren(where: any): Promise<any[]> {
    const subtopics = await this.prisma.subtopic.findMany({
      where,
      include: {
        subject: true,
        parent: true,
      },
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
    return this.getSubtopicsWithChildren({});
  }

  async findOne(id: string) {
    const subtopic = await this.prisma.subtopic.findUnique({
      where: { id },
      include: {
        subject: true,
        parent: true,
      },
    });

    if (!subtopic) {
      throw new NotFoundException(`Subtopic with ID ${id} not found`);
    }

    const children = await this.getSubtopicsWithChildren({
      parentId: subtopic.id,
    });

    return {
      ...subtopic,
      subtopics: children,
    };
  }

  async findBySubject(subjectId: string) {
    return this.getSubtopicsWithChildren({
      subjectId,
      parentId: null, // Apenas subtópicos raiz
    });
  }

  async findSubjectHierarchy(subjectId: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    const subtopics = await this.getSubtopicsWithChildren({
      subjectId,
      parentId: null, // Apenas subtópicos raiz
    });

    return {
      id: subject.id,
      name: subject.name,
      subtopics,
    };
  }

  async update(id: string, updateSubtopicDto: UpdateSubtopicDto) {
    await this.findOne(id); 

    return this.prisma.subtopic.update({
      where: { id },
      data: updateSubtopicDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); 

    return this.prisma.subtopic.delete({
      where: { id },
    });
  }
}
