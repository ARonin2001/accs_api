import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/dto/Course/CreateCourseDto';
import { Teacher } from 'src/entities/Teacher/Teacher.entity';
import { Repository } from 'typeorm';
import { Course } from './../entities/Course/Course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(courseDto: CreateCourseDto): Promise<Course> {
    const teacher = await this.teacherRepository.findOne({
      where: {
        id: courseDto.teacher_id,
      },
    });

    if (!teacher)
      throw new NotFoundException(
        `Teacher with ID ${courseDto.teacher_id} not found`,
      );

    const course = this.courseRepository.create({
      ...courseDto,
      teacher,
    });

    return await this.courseRepository.save(course);
  }

  async getById(id: number): Promise<Course | null> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });

    if (!course) throw new NotFoundException(`Course with ID ${id} not found`);
    return course;
  }

  async getAll(): Promise<Course[]> {
    return await this.courseRepository.find({
      relations: ['teacher', 'lessons'],
    });
  }

  async deleteById(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course)
      throw new NotFoundException(`Course with id ${id} not founded`);

    await this.courseRepository.update(id, { isDeleted: true });
    return await this.courseRepository.softRemove(course);
  }

  async updateById(id: number, options: Partial<Course>) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course)
      throw new NotFoundException(`Course with id ${id} not founded`);

    return await this.courseRepository.update(id, options);
  }
}
