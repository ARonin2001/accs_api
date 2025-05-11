import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateLessonDto } from 'src/dto/Lesson/CreateLessonDto';
import { Lesson } from 'src/entities/Lesson/Lesson.entity';
import { LessonService } from './../services/lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create a new lesson' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The lesson has been successfully created.',
    type: Lesson,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Teacher not found.',
  })
  async createCourse(@Body() lesson: CreateLessonDto) {
    return await this.lessonService.create(lesson);
  }

  @Get('get-by-id/:id')
  @ApiOperation({ summary: 'Get a lesson by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a lesson.',
    type: [Lesson],
  })
  async getById(@Param('id') id: number) {
    return await this.lessonService.getById(id);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all lessons',
    type: [Lesson],
  })
  async getAll() {
    return await this.lessonService.getAll();
  }

  @Get('get-by-course-id/:courseid')
  @ApiOperation({ summary: 'Get lessons by course id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all lessons by course id',
    type: [Lesson],
  })
  async getAllByCourseId(
    @Param('courseid') courseId: number,
  ): Promise<Lesson[]> {
    return await this.lessonService.getAllByCourseId(courseId);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete lessons by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lesson was been deleted',
    type: [Lesson],
  })
  async deleteById(@Param('id') id: number) {
    return await this.lessonService.deleteById(id);
  }
}
