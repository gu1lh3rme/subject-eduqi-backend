import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    required: false
  })
  email?: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    required: false
  })
  password?: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    required: false
  })
  name?: string;
}