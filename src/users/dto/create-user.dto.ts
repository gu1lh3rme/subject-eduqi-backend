import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123'
  })
  password: string;

  @ApiProperty({
    description: 'User name (optional)',
    example: 'John Doe',
    required: false
  })
  name?: string;
}