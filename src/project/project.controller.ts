import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard('jwt'))
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Res() response, @Body() project: CreateProjectDto) {
    try {
      const newProject = await this.projectService.createProject(project);
      return response.status(HttpStatus.CREATED).json(newProject);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getProject(@Res() response, @Param('id') projectId: string) {
    try {
      const existingProject = await this.projectService.getProject(projectId);
      return response.status(HttpStatus.OK).json(existingProject);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/:id/group')
  async createGroup(
    @Res() response,
    @Param('id') projectId: string,
    @Body() group: CreateGroupDto,
  ) {
    try {
      const newProject = await this.projectService.createGroup(
        projectId,
        group,
      );
      return response.status(HttpStatus.OK).json(newProject);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:projectId/group/:groupId')
  async deleteGroup(
    @Res() response,
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
  ) {
    try {
      const newProject = await this.projectService.deleteGroup(
        projectId,
        groupId,
      );
      return response.status(HttpStatus.OK).json(newProject);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
