import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';

@UseGuards(AuthGuard('jwt'))
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/:id')
  async getGroup(@Res() response, @Param('id') groupId: string) {
    try {
      const existingGroup = await this.groupService.getGroup(groupId);
      return response.status(HttpStatus.OK).json(existingGroup);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateGroup(
    @Res() response,
    @Param('id') groupId: string,
    @Body() group: UpdateGroupDto,
  ) {
    try {
      const updatedGroup = await this.groupService.updateGroup(groupId, group);
      return response.status(HttpStatus.OK).json(updatedGroup);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
