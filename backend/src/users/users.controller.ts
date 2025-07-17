import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, User, ApiResponse } from '@sobun/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserRequest): Promise<ApiResponse<User>> {
    const user = await this.usersService.create(createUserDto);
    return {
      data: user,
      message: '회원가입이 완료되었습니다.',
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<ApiResponse<User>> {
    const user = await this.usersService.findById(req.user.id);
    return {
      data: user,
      message: '사용자 정보를 가져왔습니다.',
      success: true,
    };
  }
}