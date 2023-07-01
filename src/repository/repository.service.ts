import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { IRepository } from './repository.interface';
import { Repository } from './repository.schema';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectModel(Repository.name) private repositoryModel: Model<IRepository>,
  ) {}

  async createRepository(
    repository: CreateRepositoryDto,
  ): Promise<IRepository> {
    const newRepository = await new this.repositoryModel(repository);
    return newRepository.save();
  }

  async createRepositoriesList(
    repositories: CreateRepositoryDto[],
  ): Promise<IRepository[]> {
    return await this.repositoryModel.insertMany(repositories);
  }

  async getRepository(repositoryId: string): Promise<IRepository> {
    const existingRepository = await this.repositoryModel
      .findById(repositoryId)
      .exec();
    if (!existingRepository) {
      throw new NotFoundException(`Repository #${repositoryId} not found`);
    }
    return existingRepository;
  }
}
