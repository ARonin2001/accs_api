import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRegisterDto } from 'src/dto/Auth/StudentRegisterDto';
import { Student } from 'src/entities/Student/Student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findByEmail(email: string): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { email } });
  }

  async create(student: StudentRegisterDto): Promise<Student> {
    return this.studentRepository.create(student);
  }
}
