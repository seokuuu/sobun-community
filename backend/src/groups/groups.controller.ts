import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupRequest, Group, ApiResponse } from '@sobun/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createGroupDto: CreateGroupRequest,
    @Request() req,
  ): Promise<ApiResponse<Group>> {
    const group = await this.groupsService.create(createGroupDto, req.user.id);
    return {
      data: group,
      message: '그룹이 생성되었습니다.',
      success: true,
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Group[]>> {
    const groups = await this.groupsService.findAll();
    return {
      data: groups,
      message: '그룹 목록을 가져왔습니다.',
      success: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Group>> {
    const group = await this.groupsService.findOne(id);
    return {
      data: group,
      message: '그룹 정보를 가져왔습니다.',
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  async joinGroup(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ApiResponse<null>> {
    await this.groupsService.joinGroup(id, req.user.id);
    return {
      data: null,
      message: '그룹에 가입했습니다.',
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/leave')
  async leaveGroup(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ApiResponse<null>> {
    await this.groupsService.leaveGroup(id, req.user.id);
    return {
      data: null,
      message: '그룹에서 탈퇴했습니다.',
      success: true,
    };
  }
}