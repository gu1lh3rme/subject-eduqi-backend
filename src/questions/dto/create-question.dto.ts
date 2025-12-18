import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsIn, IsUUID, Validate } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'uniqueAlternatives', async: false })
export class UniqueAlternativesValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const alternatives = [
      object.alternativeA,
      object.alternativeB,
      object.alternativeC,
      object.alternativeD,
      object.alternativeE
    ].filter(Boolean);

    const uniqueAlternatives = new Set(alternatives);
    return uniqueAlternatives.size === alternatives.length;
  }

  defaultMessage(args: ValidationArguments) {
    return 'All alternatives must be unique';
  }
}

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The statement of the question',
    example: 'Qual o perímetro de um retângulo com lados de tamanho 5 por 10?',
    minLength: 20
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(20, { message: 'O enunciado deve ter no mínimo 20 caracteres' })
  statement: string;

  @ApiProperty({
    description: 'Alternative A',
    example: '34'
  })
  @IsNotEmpty()
  @IsString()
  alternativeA: string;

  @ApiProperty({
    description: 'Alternative B',
    example: '30'
  })
  @IsNotEmpty()
  @IsString()
  alternativeB: string;

  @ApiProperty({
    description: 'Alternative C',
    example: '23'
  })
  @IsNotEmpty()
  @IsString()
  alternativeC: string;

  @ApiProperty({
    description: 'Alternative D',
    example: '43'
  })
  @IsNotEmpty()
  @IsString()
  alternativeD: string;

  @ApiProperty({
    description: 'Alternative E',
    example: '54'
  })
  @IsNotEmpty()
  @IsString()
  alternativeE: string;

  @ApiProperty({
    description: 'The correct alternative',
    example: 'B',
    enum: ['A', 'B', 'C', 'D', 'E']
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['A', 'B', 'C', 'D', 'E'], { message: 'A alternativa correta deve ser A, B, C, D ou E' })
  correctAlternative: string;

  @ApiProperty({
    description: 'The subject ID',
    example: 'bdbac090-9239-4983-a898-29e2059ee52b'
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID(4, { message: 'O ID do assunto deve ser um UUID válido' })
  subjectId: string;

  @ApiProperty({
    description: 'The difficulty level',
    example: 'Fácil'
  })
  @IsNotEmpty()
  @IsString()
  difficulty: string;

  @ApiProperty({
    description: 'The status of the question',
    example: 'aprovado',
    enum: ['rascunho', 'aprovado', 'reprovado']
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['rascunho', 'aprovado', 'reprovado'], { message: 'O status deve ser rascunho, aprovado ou reprovado' })
  status: string;

  @Validate(UniqueAlternativesValidator)
  get uniqueAlternatives() {
    return this;
  }
}