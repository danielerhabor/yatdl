import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setIsOpen } from '../../features/modalSlice';

import { Task } from '../../types/types';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsOpen(true));
  };

  return (
    <li onClick={handleClick}>
      {task.id} {task.description} {task.created_at.toDateString()}{' '}
      {task.status}
    </li>
  );
};

export default TaskItem;
