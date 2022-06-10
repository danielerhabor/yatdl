import React from 'react';

import { Task } from '../../types/types';

import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div className={styles.tasklist}>
      <h2> Monday </h2>
      <ul>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
