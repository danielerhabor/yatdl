import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { Status } from '../enums/todo.status.enum';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  title: string;
  description: string;
  scheduled: string;
  status: Status;
}
