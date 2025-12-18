import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ 
    description: 'The name of the subject',
    example: 'Mathematics'
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
