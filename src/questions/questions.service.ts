import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: createQuestionDto.subjectId },
    });

    if (!subject) {
      throw new BadRequestException('Assunto não encontrado');
    }

    const alternatives = [
      createQuestionDto.alternativeA,
      createQuestionDto.alternativeB,
      createQuestionDto.alternativeC,
      createQuestionDto.alternativeD,
      createQuestionDto.alternativeE,
    ];

    const uniqueAlternatives = new Set(alternatives);
    if (uniqueAlternatives.size !== alternatives.length) {
      throw new BadRequestException('As alternativas não podem ser iguais entre si');
    }

    return this.prisma.question.create({
      data: createQuestionDto,
      include: {
        subject: true,
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany({
      include: {
        subject: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        subject: true,
      },
    });

    if (!question) {
      throw new NotFoundException(`Questão com ID ${id} não encontrada`);
    }

    return question;
  }

  async findBySubject(subjectId: string) {
    return this.prisma.question.findMany({
      where: { subjectId },
      include: {
        subject: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.findOne(id);

    if (updateQuestionDto.subjectId) {
      const subject = await this.prisma.subject.findUnique({
        where: { id: updateQuestionDto.subjectId },
      });

      if (!subject) {
        throw new BadRequestException('Assunto não encontrado');
      }
    }

    if (updateQuestionDto.alternativeA || updateQuestionDto.alternativeB || 
        updateQuestionDto.alternativeC || updateQuestionDto.alternativeD || 
        updateQuestionDto.alternativeE) {
      
      const currentQuestion = await this.prisma.question.findUnique({
        where: { id },
      });

      if (!currentQuestion) {
        throw new NotFoundException(`Questão com ID ${id} não encontrada`);
      }

      const alternatives = [
        updateQuestionDto.alternativeA || currentQuestion.alternativeA,
        updateQuestionDto.alternativeB || currentQuestion.alternativeB,
        updateQuestionDto.alternativeC || currentQuestion.alternativeC,
        updateQuestionDto.alternativeD || currentQuestion.alternativeD,
        updateQuestionDto.alternativeE || currentQuestion.alternativeE,
      ];

      const uniqueAlternatives = new Set(alternatives);
      if (uniqueAlternatives.size !== alternatives.length) {
        throw new BadRequestException('As alternativas não podem ser iguais entre si');
      }
    }

    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
      include: {
        subject: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.question.delete({
      where: { id },
    });
  }
}