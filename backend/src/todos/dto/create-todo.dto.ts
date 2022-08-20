import { ITodo } from '../interfaces/todo.interface';

export class CreateTodoDto implements ITodo {
  title: string;
  scheduled: string;
}
