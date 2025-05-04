import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntities/BaseEntity.entity';
import { Course } from '../Course/Course.entity';

@Entity()
export class Lesson extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  body?: string;

  @Column()
  status: number;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;
}
