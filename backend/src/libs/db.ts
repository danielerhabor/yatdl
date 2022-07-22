import { DataSource } from 'typeorm';
import { connectToDB } from '../db';
import { Todo } from '../models/Todo';
import { TodoUI } from '../types/types';

let db: DataSource | undefined;

connectToDB().then((data) => {
  db = data;
});

if (db === null) {
  throw new Error('DB is not initialized');
}

const todoRepositoroy = db!.getRepository(Todo);

const createTodo = async (todo: TodoUI) => {
  const newTodo = new Todo();
  newTodo.name = todo.name;
  newTodo.description = todo.description;
  newTodo.scheduled = new Date(todo.scheduled);
  newTodo.status = todo.status;
  await todoRepositoroy.save(newTodo);
  return newTodo.id;
}

const getTodosPerDate = async (date: Date) => {
  let todos = await todoRepositoroy.find({
    where: {
      scheduled: date,
    },
  });

  // return todos.map((todo: Todo) => {{todo.description, todo.id, todo.name, todo.} as TodoUI };);
}


const updateTodo = async (todo: TodoUI) => {
  const newTodo = new Todo();
  newTodo.name = todo.name;
  newTodo.description = todo.description;
  newTodo.scheduled = new Date(todo.scheduled);
  newTodo.status = todo.status;

  await todoRepositoroy.save(newTodo);
  return newTodo.id;
}

const deleteTodo = async (id: number) => {
  const todo = await todoRepositoroy.findOneBy({id: id});
  if (todo == null) {
    return false
  }
  todoRepositoroy.remove(todo);
  
}






