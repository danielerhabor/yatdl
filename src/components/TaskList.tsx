import React from 'react';

import { Status, Task } from '../types/types';

import TaskItem from './TaskItem';
import styles from './TaskList.module.css'

const TaskList: React.FC<{ tasks: Task[] }> = (props) => {
  return (
    <ul className={styles.tasklist}>
      {props.tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
