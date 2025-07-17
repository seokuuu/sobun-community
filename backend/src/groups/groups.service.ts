import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateGroupRequest, Group, GroupStatus } from '@sobun/shared';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupRequest, userId: string): Promise<Group> {
    const group = await this.prisma.group.create({
      data: {
        ...createGroupDto,
        creatorId: userId,
      },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    // 그룹 생성자를 멤버로 추가
    await this.prisma.groupMember.create({
      data: {
        userId,
        groupId: group.id,
      },
    });

    return {
      ...group,
      memberCount: group._count.members + 1,
    };
  }

  async findAll(): Promise<Group[]> {
    const groups = await this.prisma.group.findMany({
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return groups.map(group => ({
      ...group,
      memberCount: group._count.members,
    }));
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        _count: {
          select: { members: true },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException('그룹을 찾을 수 없습니다.');
    }

    return {
      ...group,
      memberCount: group._count.members,
    };
  }

  async joinGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    if (!group) {
      throw new NotFoundException('그룹을 찾을 수 없습니다.');
    }

    if (group.status !== GroupStatus.RECRUITING) {
      throw new ForbiddenException('현재 모집 중인 그룹이 아닙니다.');
    }

    if (group._count.members >= group.maxMembers) {
      throw new ForbiddenException('그룹의 최대 인원을 초과했습니다.');
    }

    // 이미 가입한 사용자인지 확인
    const existingMember = await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    if (existingMember) {
      throw new ForbiddenException('이미 가입한 그룹입니다.');
    }

    await this.prisma.groupMember.create({
      data: {
        userId,
        groupId,
      },
    });
  }

  async leaveGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('그룹을 찾을 수 없습니다.');
    }

    if (group.creatorId === userId) {
      throw new ForbiddenException('그룹 생성자는 탈퇴할 수 없습니다.');
    }

    const member = await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    if (!member) {
      throw new NotFoundException('그룹에 가입하지 않은 사용자입니다.');
    }

    await this.prisma.groupMember.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  }
}