import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntities/BaseEntity.entity';
import { Lesson } from '../Lesson/Lesson.entity';
import { Teacher } from '../Teacher/Teacher.entity';

@Entity()
export class Course extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 1 })
  status: number;

  @Column({ nullable: true })
  logo?: string;

  @ManyToOne(() => Teacher, (teachers) => teachers.courses)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
}
