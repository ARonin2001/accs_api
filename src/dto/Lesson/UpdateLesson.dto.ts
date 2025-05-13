import { ApiProperty } from '@nestjs/swagger';

export class UpdateLessonDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description?: string;

  @ApiProperty({ required: false, nullable: true })
  logo?: string;

  @ApiProperty({ required: false })
  status?: number;

  @ApiProperty({ required: false, nullable: true })
  body?: string;
}
