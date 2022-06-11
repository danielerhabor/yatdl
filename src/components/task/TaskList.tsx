import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from 'react';

import TaskItem from './TaskItem';

import { Task } from '../../types/types';

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {

  return (
    <div>
      <h2>DAY_OF_WEEK</h2>     
      <ul>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <button>
        ADD_TASK
      </button>
    </div>
  );
};

export default TaskList;
