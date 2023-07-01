import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { GroupService } from 'src/group/group.service';
import { CreateRepositoryDto } from 'src/repository/dto/create-repository.dto';
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

    const createdGroups = await this.groupService.createGroupsList(groups);
    const createdRepositories =
      await this.repositoryService.createRepositoriesList(repositories);

    const newProject = {
      ...project,
      groups: createdGroups.map((group) => group._id),
      repositories: createdRepositories.map((repository) => repository._id),
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

  async deleteProject(projectId: string): Promise<IProject> {
    const deletedProject = await this.projectModel.findByIdAndDelete(projectId);
    if (!deletedProject) {
      throw new NotFoundException(`Project #${deletedProject} not found`);
    }
    return deletedProject;
  }

  async createGroup(
    projectId: string,
    group: CreateGroupDto,
  ): Promise<IProject> {
    const existingProject = await this.projectModel.findById(projectId);
    if (!existingProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }

    const createdGroup = await this.groupService.createGroup(group);
    existingProject.groups.push(createdGroup._id);
    return existingProject.save();
  }

  async deleteGroup(projectId: string, groupId: string): Promise<IProject> {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      {
        $pull: { groups: groupId },
      },
      {
        new: true,
      },
    );
  }

  async createRepository(
    projectId: string,
    repository: CreateRepositoryDto,
  ): Promise<IProject> {
    const existingProject = await this.projectModel.findById(projectId);
    if (!existingProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }

    const createdRepository = await this.repositoryService.createRepository(
      repository,
    );
    existingProject.repositories.push(createdRepository._id);
    return existingProject.save();
  }

  async deleteRepository(
    projectId: string,
    repositoryId: string,
  ): Promise<IProject> {
    return await this.projectModel.findByIdAndUpdate(
      projectId,
      {
        $pull: { repositories: repositoryId },
      },
      {
        new: true,
      },
    );
  }
}
