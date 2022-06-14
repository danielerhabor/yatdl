import React from 'react';

import TaskItem from './TaskItem';

import { Task } from '../../types/types';

import { useAppDispatch } from '../../app/hooks';
import { setIsOpen } from '../../features/modalSlice';

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(setIsOpen(true));
  };

  return (
    <div>
      <h2>DAY_OF_WEEK</h2>
      <ul>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <button onClick={openModal}>ADD_TASK</button>
    </div>
  );
};

export default TaskList;
