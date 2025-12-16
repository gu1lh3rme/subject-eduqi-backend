import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ 
    description: 'The name of the subject',
    example: 'Mathematics'
  })
  name: string;

  @ApiProperty({ 
    description: 'Optional description of the subject',
    example: 'Advanced mathematics course covering algebra and calculus',
    required: false
  })
  description?: string;
}
