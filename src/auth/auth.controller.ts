import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Endpoint temporário para resetar senha
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password (temporary endpoint)' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  async resetPassword(@Body() resetDto: { email: string; newPassword: string }) {
    return this.usersService.resetPassword(resetDto.email, resetDto.newPassword);
  }

  // Endpoint de teste para verificar hash
  @Post('test-hash')
  @ApiOperation({ summary: 'Test password hash (temporary endpoint)' })
  async testHash(@Body() testDto: { password: string }) {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash(testDto.password, 10);
    const testCompare = await bcrypt.compare(testDto.password, hash);
    
    return {
      originalPassword: testDto.password,
      generatedHash: hash,
      compareResult: testCompare
    };
  }
}