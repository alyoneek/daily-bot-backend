import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@UseGuards(AuthGuard('jwt'))
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const newStudent = await this.studentService.createStudent(
        createStudentDto,
      );
      return response.status(HttpStatus.CREATED).json(newStudent);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );
      return response.status(HttpStatus.OK).json(existingStudent);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getStudents(
    @Res() response,
    @Query('search') searchTerm: string | undefined,
  ) {
    try {
      const studentData = await this.studentService.getAllStudents(searchTerm);
      return response.status(HttpStatus.OK).json(studentData);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const existingStudent = await this.studentService.getStudent(studentId);
      return response.status(HttpStatus.OK).json(existingStudent);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json(deletedStudent);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
