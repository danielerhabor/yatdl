import React from 'react';

import { Task } from '../types/types';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <li>
      {task.id} {task.description} {task.created_at.toDateString()} {task.status}
    </li>
  );
};

export default TaskItem;
