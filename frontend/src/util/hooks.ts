import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  createTodo,
  deleteTodo,
  getTodosPerDate,
  updateTodo,
} from './clientApi';

export const useRefresh = () => {
  const queryClient = useQueryClient();
  return (date: string) => queryClient.invalidateQueries(['todos', date]);
};

export const useCreateTodo = () => {
  return useMutation(createTodo, {});
};

export const useGetTodosPerDate = (date: string) => {
  return useQuery(['todos', date], () => getTodosPerDate(date));
};

export const useUpdateTodo = () => {
  return useMutation(updateTodo, {});
};

export const useDeleteTodo = () => {
  return useMutation(deleteTodo, {});
};
