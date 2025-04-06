import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../BaseEntities/BaseEntity.entity';
import { Teacher } from '../Teacher/Teacher.entity';
import { Group } from '../Group/Group.entity';

@Entity()
export class Course extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  body: string;

  @ManyToOne(() => Teacher, (teachers) => teachers.courses)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
