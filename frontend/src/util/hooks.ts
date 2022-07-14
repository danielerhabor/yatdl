// import react query

import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTasksPerDate,
  updateTask,
} from './clientApi';

export const useRefresh = () => {
  const queryClient = useQueryClient();
  return (date: string) => queryClient.invalidateQueries(['transactions', date]);
};

export const useCreateTask = () => {
  return useMutation(createTask, {});
};

export const useGetAllTasks = () => {
  return useQuery('tasks', getAllTasks);
};

export const useGetTasksPerDate = (date: string) => {
  return useQuery(['transactions', date], () => getTasksPerDate(date));
};

export const useUpdateTask = () => {
  return useMutation(updateTask, {});
};

export const useDeleteTask = () => {
  return useMutation(deleteTask, {});
};
