import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TreeLevelColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  emai: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
  })
  fullName: string;

  @Column({
    type: 'bool',
  })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];
}
