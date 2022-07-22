// import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Status } from '../types/types';
import { PomodoroDB } from './Pomodoro';

@Entity()
export class TodoDB {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column({
    default: '',
  })
  description?: string;

  @Column()
  scheduled!: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TODO,
  })
  status?: Status;

  @Column('text', {nullable: true})
  @OneToMany((type) => PomodoroDB, (pomodoro) => pomodoro.todo)
  pomodoros!: PomodoroDB[];
}
