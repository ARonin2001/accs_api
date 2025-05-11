import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'title', required: false, description: 'title of course' })
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all crouses',
    type: [Course],
  })
  async getAll(@Query('title') title?: string) {
    return await this.courseService.getAll({
      title,
    });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a course by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return course',
    type: [Course],
  })
  async deleteById(@Param('id') id: number) {
    return await this.courseService.deleteById(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a course by id' })
  @ApiBody({
    type: Course,
    required: false,
    description: 'Partial update of course fields',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The course has been successfully updated.',
    type: Course,
  })
  async updateById(@Param('id') id: number, @Body() course: Partial<Course>) {
    return await this.courseService.updateById(id, course);
  }

  @Get('get-by-title/:title')
  @ApiOperation({ summary: 'Get courses by title' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return courses by title',
    type: [Course],
  })
  async getBytitle(@Param('title') title: string) {
    return await this.courseService.getByTitle(title);
  }
}
