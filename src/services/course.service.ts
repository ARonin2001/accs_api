import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSearchFilterDto } from 'src/dto/Course/CourseSearchFilter.dto';
import { CreateCourseDto } from 'src/dto/Course/CreateCourseDto';
import { Teacher } from 'src/entities/Teacher/Teacher.entity';
import { Like, Repository } from 'typeorm';
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

  async getAll({ title }: CourseSearchFilterDto): Promise<Course[]> {
    const qb = this.courseRepository.createQueryBuilder('course');

    if (title)
      qb.andWhere('course.title LIKE :title', {
        title: `%${title}%`,
      });

    return await qb.getMany();
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

  async getByTitle(title: string) {
    const course = await this.courseRepository.find({
      where: { title: Like(`%${title}%`) },
    });

    return course;
  }
}
