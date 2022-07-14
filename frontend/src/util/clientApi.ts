import axios from 'axios';
import { Task } from '../types/types';

const taskApiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const getAllTasks = async () => {
  const response = await taskApiClient.get<Task[]>('/tasks');
  return response.data;
};

export const getTasksPerDate = async (date: string) => {
  const response = await taskApiClient.get<Task[]>(`/tasks/${date}`);
  return response.data;
};

export const createTask = async (task: Task) => {
  return await taskApiClient.post<Task>('/tasks', task);
};

export const updateTask = async (task: Task) => {
  return await taskApiClient.patch<Task>(`/tasks/${task.id}`, task);
};

export const deleteTask = async (task: Task) => {
  return await taskApiClient.delete<Task>(`/tasks/${task.id}`);
};
