import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupService } from 'src/group/group.service';
import { RepositoryService } from 'src/repository/repository.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { IProject } from './project.interface';
import { Project } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<IProject>,
    private groupService: GroupService,
    private repositoryService: RepositoryService,
  ) {}

  async createProject(project: CreateProjectDto): Promise<IProject> {
    const { groups, repositories } = project;

    const addedGroups = await this.groupService.createGroupsList(groups);
    const addedRepositories =
      await this.repositoryService.createRepositoriesList(repositories);

    const newProject = {
      ...project,
      groups: addedGroups.map((group) => group._id),
      repositories: addedRepositories.map((repository) => repository._id),
    };

    return this.projectModel.create(newProject);
  }

  async getProject(projectId: string): Promise<IProject> {
    const existingProject = await this.projectModel
      .findById(projectId)
      .populate({ path: 'users', select: '_id firstName lastName  middleName' })
      .populate({ path: 'repositories', select: '_id name' })
      .populate({ path: 'groups', select: '_id name' })
      .exec();
    if (!existingProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }
    return existingProject;
  }

  async getAllProjects(searchTerm: string | undefined): Promise<IProject[]> {
    const regex = new RegExp(`^${searchTerm ?? ''}`, 'i');
    console.log(searchTerm);
    const projects = await this.projectModel
      .find({
        name: { $regex: regex },
      })
      .select('_id name');
    if (!projects) {
      throw new NotFoundException('Projects data not found!');
    }
    return projects;
  }
}
