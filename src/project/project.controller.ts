import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @Get()
  async getProjects(
    @Res() response,
    @Query('search') searchTerm: string | undefined,
  ) {
    try {
      const projects = await this.projectService.getAllProjects(searchTerm);
      return response.status(HttpStatus.OK).json(projects);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
