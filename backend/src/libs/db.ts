import { Repository } from 'typeorm';
import { TodoDB } from '../models/Todo';
import { TodoUI } from '../types/types';
import dayjs from 'dayjs';

export const createTodo = async (
  todo: TodoUI,
  todoRepo: Repository<TodoDB>
) => {
  try {
    const newTodo = new TodoDB();
    newTodo.name = todo.name;
    newTodo.scheduled = dayjs(todo.scheduled).toDate();
    await todoRepo.save(newTodo);
  } catch (error) {
    console.error(error);
  }
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
  key: number,
  todo: TodoUI,
  todoRepo: Repository<TodoDB>
) => {
  try {
    const foundTodo = await todoRepo.findOneBy({
      id: key,
    });
    if (foundTodo) {
      foundTodo.name = todo.name;
      foundTodo.description = todo.description;
      foundTodo.scheduled = dayjs(todo.scheduled).toDate();
      foundTodo.status = todo.status;
      await todoRepo.save(foundTodo);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (key: number, todoRepo: Repository<TodoDB>) => {
  const todo = await todoRepo.findOneBy({ id: key });
  if (todo == null) {
    return false;
  }
  todoRepo.remove(todo);
};
