import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonDto } from 'src/dto/Lesson/CreateLessonDto';
import { Course } from 'src/entities/Course/Course.entity';
import { Lesson } from 'src/entities/Lesson/Lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(lessonDto: CreateLessonDto): Promise<Lesson> {
    const course = await this.courseRepository.findOne({
      where: {
        id: lessonDto.courseId,
      },
    });

    if (!course)
      throw new NotFoundException(
        `Course with ID ${lessonDto.courseId} not found`,
      );

    const lesson = this.lessonRepository.create({
      ...lessonDto,
      course,
    });

    return await this.lessonRepository.save(lesson);
  }

  async getById(id: number): Promise<Lesson | null> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);
    return lesson;
  }

  async getAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find({ relations: ['course'] });
  }

  async getAllByCourseId(courseId: number): Promise<Lesson[]> {
    return await this.lessonRepository.find({
      where: { course: { id: courseId } },
    });
  }
}
