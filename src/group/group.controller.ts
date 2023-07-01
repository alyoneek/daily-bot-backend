import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';

@UseGuards(AuthGuard('jwt'))
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(@Res() response, @Body() createGroupDto: CreateGroupDto) {
    try {
      const newGroup = await this.groupService.createGroup(createGroupDto);
      return response.status(HttpStatus.CREATED).json(newGroup);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getGroup(@Res() response, @Param('id') groupId: string) {
    try {
      const existingGroup = await this.groupService.getGroup(groupId);
      return response.status(HttpStatus.OK).json(existingGroup);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
