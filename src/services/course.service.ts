import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/dto/Course/CreateCourseDto';
import { Lesson } from 'src/entities/Lesson/Lesson.entity';
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
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
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
}
