import { ApiProperty } from '@nestjs/swagger';

export class CreateSubtopicDto {
  @ApiProperty({ 
    description: 'The name of the subtopic',
    example: 'Algebra'
  })
  name: string;

  @ApiProperty({ 
    description: 'Optional description of the subtopic',
    example: 'Basic algebraic operations and equations',
    required: false
  })
  description?: string;

  @ApiProperty({ 
    description: 'The ID of the parent subject',
    example: 1
  })
  subjectId: number;
}
