import React from 'react';

import { useDispatch } from 'react-redux';
import { open } from '../features/modal/modalSlice';

import { Task } from '../types/types';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    /*This should open the modal*/
    dispatch(open());
  };

  return (
    <li onClick={clickHandler}>
      {task.id} {task.description} {task.created_at.toDateString()}{' '}
      {task.status}
    </li>
  );
};

export default TaskItem;
