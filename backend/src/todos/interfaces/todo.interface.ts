import { Status } from '../enums/todo.status.enum';
import Todo from '@prisma/client';

export interface ITodo {
  id?: number;
  title: string;
  description?: string;
  scheduled: string;
  status?: Status;
}
