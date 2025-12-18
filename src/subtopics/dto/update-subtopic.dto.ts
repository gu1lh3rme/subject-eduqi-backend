import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubtopicDto {
  @ApiProperty({ 
    description: 'The name of the subtopic',
    example: 'Álgebra',
    required: false
  })
  name?: string;

  @ApiProperty({ 
    description: 'Optional description of the subtopic',
    example: 'Basic algebraic operations and equations',
    required: false
  })
  description?: string;

  @ApiProperty({ 
    description: 'The ID of the parent subject',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  subjectId?: string;

  @ApiProperty({ 
    description: 'The ID of the parent subtopic (optional for root level)',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false
  })
  parentId?: string;
}
