import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ minLength: 1 })
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  logo?: string;

  @ApiProperty()
  teacher_id: number;

  @ApiProperty({ required: false })
  status?: number;
}
