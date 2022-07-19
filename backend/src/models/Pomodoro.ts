import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Status } from '../types/types';
import { Todo } from './Todo';

@Entity()
export class Pomodoro {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('timestamptz')
  start!: Date;

  @Column()
  description!: string;

  @Column('timestamptz')
  end!: Date;

  @Column()
  status!: Status;

  @Column()
  @ManyToOne((type) => Todo, (todo) => todo.pomodoros)
  todo!: Todo;
}
