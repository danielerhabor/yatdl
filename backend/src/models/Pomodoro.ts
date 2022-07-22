// import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Status } from '../types/types';
import { TodoDB } from './Todo';

@Entity()
export class PomodoroDB {
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

  @Column('text')
  @ManyToOne((type) => TodoDB, (todo) => todo.pomodoros, )
  todo!: TodoDB;
}
