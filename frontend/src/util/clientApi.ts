import axios from 'axios';
import { TodoUI } from '../types/types';

const todoApiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export const getTodosPerDate = async (date: string) => {
  const response = await todoApiClient.get<TodoUI[]>(`/todos/${date}`);
  return response.data;
};

export const createTodo = async (todo: TodoUI) => {
  return await todoApiClient.post<TodoUI>('/todos', todo);
};

export const updateTodo = async (todo: TodoUI) => {
  return await todoApiClient.patch<TodoUI>(`/todos/${todo.id}`, todo);
};

export const deleteTodo = async (todo: TodoUI) => {
  return await todoApiClient.delete<TodoUI>(`/todos/${todo.id}`);
};
