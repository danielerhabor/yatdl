import React from 'react';

import { Task } from '../types/types';

const TaskItem: React.FC<{ task: Task }> = (props) => {
  const { task } = props;

  return (
    <li>
      {task.id} {task.description} {task.created_at.toDateString()}
    </li>
  );
};

export default TaskItem;
