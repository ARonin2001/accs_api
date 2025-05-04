import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import typeorm from './configs/typeorm';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { CourseController } from './controllers/course.controller';
import { LessonController } from './controllers/lessons.controller';
import { Course } from './entities/Course/Course.entity';
import { Lesson } from './entities/Lesson/Lesson.entity';
import { Student } from './entities/Student/Student.entity';
import { Teacher } from './entities/Teacher/Teacher.entity';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { CourseService } from './services/course.service';
import { LessonService } from './services/lesson.service';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleAsyncOptions> => {
        const config = configService.get('typeorm');

        if (!config) throw new Error('typeorm config not found');

        Logger.log(
          `Connecting to database: ${config.database}@${config.host}:${config.port}`,
          'TypeORM',
        );

        return config;
      },
    }),
    TypeOrmModule.forFeature([Student, Course, Teacher, Lesson]),
  ],
  controllers: [
    AppController,
    AuthController,
    CourseController,
    LessonController,
  ],
  providers: [
    AppService,
    AuthService,
    JwtService,
    StudentService,
    CourseService,
    LessonService,
  ],
})
export class AppModule {}
