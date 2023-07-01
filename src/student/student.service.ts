import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IStudent } from './student.interface';
import { Student } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<IStudent>,
  ) {}

  async createStudent(student: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(student);
    return newStudent.save();
  }

  async updateStudent(
    studentId: string,
    student: UpdateStudentDto,
  ): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      student,
      { new: true },
    );

    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }

    return existingStudent;
  }

  async getAllStudents(searchTerm: string | undefined): Promise<IStudent[]> {
    const regex = new RegExp(`^${searchTerm ?? ''}`, 'i');
    const studentData = await this.studentModel.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { middleName: { $regex: regex } },
      ],
    });
    if (!studentData) {
      throw new NotFoundException('Students data not found!');
    }
    return studentData;
  }

  async getStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId).exec();
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  async deleteStudent(studentId: string): Promise<IStudent> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return deletedStudent;
  }
}
