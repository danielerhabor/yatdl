// import 'reflect-metadata';
import { Repository } from 'typeorm';
import { TodoDB } from '../models/Todo';
import { TodoUI } from '../types/types';
import dayjs from 'dayjs';

export const createTodo = async (
  todo: TodoUI,
  todoRepo: Repository<TodoDB>
) => {
  const newTodo = new TodoDB();
  newTodo.name = todo.name;
  newTodo.scheduled = dayjs(todo.scheduled).toDate();
  await todoRepo.save(newTodo);

  return {
    key: newTodo.id,
    name: newTodo.name,
    description: newTodo.description,
    scheduled: newTodo.scheduled.toISOString(),
    status: newTodo.status,
  } as TodoUI;
};

export const getTodosPerDate = async (
  date: dayjs.Dayjs,
  todoRepo: Repository<TodoDB>
) => {
  let todos = await todoRepo.find({
    where: {
      scheduled: date.toDate(),
    },
  });
  let todosPerDate: TodoUI[] = [];
  todos.forEach((todo) => {
    todosPerDate.push({
      key: todo.id,
      name: todo.name,
      description: todo.description,
      scheduled: todo.scheduled.toISOString(),
      status: todo.status,
    });
  });
  return todosPerDate;
};

export const updateTodo = async (
  todo: TodoUI,
  todoRepo: Repository<TodoDB>
) => {
  const foundTodo = await todoRepo.findOneBy({
    id: todo.key,
  });
  const newTodo = new TodoDB();
  newTodo.name = todo.name;
  newTodo.description = todo.description;
  newTodo.scheduled = new dayjs.Dayjs(todo.scheduled).toDate();
  newTodo.status = todo.status;
  await todoRepo.save(newTodo);
  return newTodo.id;
};

export const deleteTodo = async (id: number, todoRepo: Repository<TodoDB>) => {
  const todo = await todoRepo.findOneBy({ id: id });
  if (todo == null) {
    return false;
  }
  todoRepo.remove(todo);
};
