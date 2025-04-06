import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntities/BaseEntity.entity';
import { Group } from '../Group/Group.entity';

@Entity()
export class Student extends BaseEntity {
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
  dateOfBirth: Date;

  @Column()
  address: string;

  @Column()
  dateReceipt: Date;

  @Column({ nullable: true })
  dateTransfer: Date;

  @Column({ nullable: true })
  dateDeduction: Date;

  @Column({ nullable: true })
  reasonDeduction: string;

  @ManyToOne(() => Group, (group) => group.students)
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
