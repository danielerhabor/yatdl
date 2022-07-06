// import react query

import { useQuery, useMutation, useQueryClient } from 'react-query';

import axios from 'axios';
import { Task } from '../types/types';

export const useGetAllTasks = (url: string) => {
  const res = useQuery('tasks', async () => axios.get<Task[]>(url));

  // console.log(res.data);

  return res.data;
};
