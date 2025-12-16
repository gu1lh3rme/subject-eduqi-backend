import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDto {
  @ApiProperty({ 
    description: 'The name of the subject',
    example: 'Mathematics',
    required: false
  })
  name?: string;

  @ApiProperty({ 
    description: 'Optional description of the subject',
    example: 'Advanced mathematics course covering algebra and calculus',
    required: false
  })
  description?: string;
}
