import { useEffect, useState } from 'react';

import axios from 'axios';
import { Task } from '../types/types';

export const useGetAllTasks = (url: string) => {
  // console.log("useGetAllTasks starting...");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log("useEffect called...");
    setLoading(true);
    // console.log("setLoading in useEffect called...");
    axios
      .get(url)
      .then((res) => {
        setTasks(res.data);
        // console.log("setTasks in useEffect called...");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        // console.log("setLoading in useEffect finally called...");
      });
  }, [url]);
  // console.log("useGetAllTasks finishing...");
  return { tasks, loading };
};
