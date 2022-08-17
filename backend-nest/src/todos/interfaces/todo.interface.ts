import { Status } from '../enums/todo.status.enum';

export interface ITodo {
  keyOrId?: number;
  title: string;
  description?: string;
  scheduled: string;
  status?: Status;
}
