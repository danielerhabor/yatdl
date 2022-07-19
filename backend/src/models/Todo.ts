import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Status } from "../types/types"
import { Pomodoro } from "./Pomodoro"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    scheduled!: Date

    @Column({
      type: "enum",
      enum: Status,
      default: Status.TODO,
  })
    status!: Status

    @Column()
    @OneToMany(type => Pomodoro, pomodoro => pomodoro.todo)
    pomodoros!: Pomodoro[]

}