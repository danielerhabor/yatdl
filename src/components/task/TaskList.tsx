import React from 'react';

import TaskItem from './TaskItem';

import { Task } from '../../types/types';

import { useAppDispatch } from '../../app/hooks';
import { openModal } from '../../features/modalSlice';

import styles from './TaskList.module.css';

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.taskList}>
      <h2>DAY_OF_WEEK</h2>
      <ul>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <button onClick={() => dispatch(openModal())}>ADD_TASK</button>
    </div>
  );
};

export default TaskList;
