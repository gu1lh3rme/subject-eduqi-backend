import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubtopicDto {
  @ApiProperty({ 
    description: 'The name of the subtopic',
    example: 'Álgebra'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'The ID of the parent subject',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  subjectId: string;

  @ApiProperty({ 
    description: 'The ID of the parent subtopic (optional for root level)',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
