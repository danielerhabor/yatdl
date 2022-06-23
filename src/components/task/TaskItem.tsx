import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { openModal, openModalWithTask } from '../../features/modalSlice';

import { Task } from '../../types/types';

import styles from './TaskItem.module.css';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openModal());

    // on click of the task, set the title and description
    // of the modal to the title and description of the task
    // and open the modal
    dispatch(openModalWithTask(task));
  };

  return (
    <li className={styles.taskItem} onClick={handleClick}>
      {task.id} {task.description} {task.created_at} {task.status}
    </li>
  );
};

export default TaskItem;
