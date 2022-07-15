import React from 'react';

import TaskItem from './TaskItem';

import { Task } from '../../types/types';

import styles from './TaskList.module.css';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useGetTasksPerDate } from '../../util/hooks';
import NewTaskItem from './NewTaskItem';
dayjs.extend(isoWeek);

const TaskList: React.FC<{ dayNo: number }> = ({ dayNo }) => {
  const date: dayjs.Dayjs = dayjs().isoWeekday(dayNo);

  const { isLoading, isError, error, data } = useGetTasksPerDate(
    date.format('YYYY-MM-DD')
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{`An error occurred - (${error})...`}</div>;
  }
  let tasks: Task[] = [];
  if (data) {
    tasks = data;
  }

  return (
    <div className={styles.taskList}>
      <h2>{date.format('dddd')}</h2>
      <ul>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <NewTaskItem date={date.format('YYYY-MM-DD')} />
      </ul>
    </div>
  );
};

export default TaskList;
