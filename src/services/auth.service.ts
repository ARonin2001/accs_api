import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentLoginDto } from 'src/controllers/auth.controller';
import { StudentRegisterDto } from 'src/dto/Auth/StudentRegisterDto';
import { StudentService } from './student.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateJWT(email: string) {
    return this.jwtService.sign({ email });
  }

  async register(authRegisterDto: StudentRegisterDto) {
    const student = await this.studentService.findByEmail(
      authRegisterDto.email,
    );

    if (student)
      throw new NotFoundException(
        'Пользователь с такой почтой и телефоном уже существует',
      );

    const hashedPassword = await bcrypt.hash(authRegisterDto.password, 10);
    const studentForCreate = {
      ...authRegisterDto,
      password: hashedPassword,
    };
    return this.studentService.create(studentForCreate);
  }

  async login(loginData: StudentLoginDto) {
    const student = await this.studentService.findByEmail(loginData.email);

    if (!student) {
      throw new NotFoundException('Неверный логин или пароль');
    }

    return student;
  }
}
