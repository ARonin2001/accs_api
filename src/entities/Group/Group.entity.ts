import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntities/BaseEntity.entity';
import { Student } from '../Student/Student.entity';
import { Teacher } from '../Teacher/Teacher.entity';

@Entity()
export class Group extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: false })
  isClosed: boolean;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.groups)
  teachers: Teacher[];
}
