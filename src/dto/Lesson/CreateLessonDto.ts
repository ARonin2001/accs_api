import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  logo?: string;

  @ApiProperty()
  status: number;

  @ApiProperty({ required: false, nullable: true })
  body: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the course this lesson belongs to',
    nullable: false,
    required: true,
  })
  courseId: number;
}
