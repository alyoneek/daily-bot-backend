import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RepositoryService } from './repository.service';

@UseGuards(AuthGuard('jwt'))
@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get('/:id')
  async getRepository(@Res() response, @Param('id') repositoryId: string) {
    try {
      const existingRepository = await this.repositoryService.getRepository(
        repositoryId,
      );
      return response.status(HttpStatus.OK).json(existingRepository);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
