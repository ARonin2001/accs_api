import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCourseDto } from 'src/dto/Course/CreateCourseDto';
import { Course } from 'src/entities/Course/Course.entity';
import { CourseService } from './../services/course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create a new course' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The course has been successfully created.',
    type: Course,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Teacher not found.',
  })
  async createCourse(@Body() course: CreateCourseDto) {
    return await this.courseService.create(course);
  }

  @Get('get-by-id/:id')
  @ApiOperation({ summary: 'Get a course by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a course.',
    type: [Course],
  })
  async getById(@Param('id') id: number) {
    return await this.courseService.getById(id);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all crouses',
    type: [Course],
  })
  async getAll() {
    return await this.courseService.getAll();
  }
}
