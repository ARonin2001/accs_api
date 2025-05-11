import { ApiProperty } from '@nestjs/swagger';

export class CourseSearchFilterDto {
  @ApiProperty({ required: false })
  title?: string;
}
