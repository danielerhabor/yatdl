import { useEffect, useState } from 'react';

import axios from 'axios';
import { Task } from '../types/types';

export const useGetAllTasks = (url: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { tasks, loading };
};
