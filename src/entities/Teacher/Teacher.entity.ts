import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntities/BaseEntity.entity';
import { Course } from '../Course/Course.entity';
import { Group } from '../Group/Group.entity';

@Entity()
export class Teacher extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  address: string;

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @ManyToMany(() => Group, (group) => group.teachers)
  @JoinTable()
  groups: Group[];
}
