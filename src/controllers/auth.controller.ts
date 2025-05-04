import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
// import { StudentRegisterDto } from 'src/dto/Auth/StudentRegisterDto';
import { Student } from 'src/entities/Student/Student.entity';
import { AuthService } from 'src/services/auth.service';

import { ApiProperty } from '@nestjs/swagger';

export class StudentRegisterDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  secondName?: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  groupId: number;
}

export class StudentLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: StudentLoginDto,
  })
  async login(@Body() loginData: StudentLoginDto) {
    return this.authService.login(loginData);
  }

  @Post('register')
  @ApiBody({
    type: StudentRegisterDto,
  })
  async register(@Body() user: StudentRegisterDto): Promise<Student> {
    return this.authService.register(user);
  }
}
