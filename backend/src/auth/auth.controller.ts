import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, ApiResponse } from '@sobun/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const result = await this.authService.login(loginDto);
    return {
      data: result,
      message: '로그인이 완료되었습니다.',
      success: true,
    };
  }
}